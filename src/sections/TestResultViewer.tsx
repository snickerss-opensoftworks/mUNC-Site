import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  functionCategories,
  getCategoryStats,
  type TestResultData,
  type TestResult,
} from '../data/functions';

gsap.registerPlugin(ScrollTrigger);

interface TestResultViewerProps {
  data?: TestResultData;
  isDemo?: boolean;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'supported') {
    return (
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block rounded-full"
          style={{ width: 8, height: 8, backgroundColor: '#c0fa50' }}
        />
        <span className="font-mono text-[11px] uppercase" style={{ color: '#c0fa50' }}>
          PASS
        </span>
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block rounded-full"
          style={{ width: 8, height: 8, backgroundColor: '#f5a623' }}
        />
        <span className="font-mono text-[11px] uppercase" style={{ color: '#f5a623' }}>
          PARTIAL
        </span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block rounded-full"
        style={{ width: 8, height: 8, backgroundColor: '#ff4444' }}
      />
      <span className="font-mono text-[11px] uppercase" style={{ color: '#ff4444' }}>
        FAIL
      </span>
    </span>
  );
}

function CategoryBreakdown({
  categoryName,
  results,
}: {
  categoryName: string;
  results: TestResult[];
}) {
  const [expanded, setExpanded] = useState(false);
  const stats = getCategoryStats(results, categoryName);

  return (
    <div
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-4 px-0 transition-colors duration-200 hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-3">
          <span className="font-geist text-[15px] font-medium" style={{ color: '#ffffff' }}>
            {categoryName}
          </span>
          <span className="font-mono text-[11px]" style={{ color: '#555555' }}>
            {stats.supported}/{stats.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {stats.supported > 0 && (
              <span className="font-mono text-[11px]" style={{ color: '#c0fa50' }}>
                {stats.supported} PASS
              </span>
            )}
            {stats.partial > 0 && (
              <span className="font-mono text-[11px]" style={{ color: '#f5a623' }}>
                {stats.partial} WARN
              </span>
            )}
            {stats.unsupported > 0 && (
              <span className="font-mono text-[11px]" style={{ color: '#ff4444' }}>
                {stats.unsupported} FAIL
              </span>
            )}
          </div>
          {expanded ? (
            <ChevronUp size={16} style={{ color: '#888888' }} />
          ) : (
            <ChevronDown size={16} style={{ color: '#888888' }} />
          )}
        </div>
      </button>

      {expanded && (
        <div className="pb-4 pl-2">
          {results.map((r) => (
            <div
              key={r.functionName}
              className="flex items-center justify-between py-1.5"
            >
              <span className="font-mono text-[13px]" style={{ color: '#aaaaaa' }}>
                {r.functionName}
              </span>
              <StatusIcon status={r.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TestResultViewer({ data, isDemo = true }: TestResultViewerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const resultData = data;

  const total = resultData
    ? resultData.totalSupported + resultData.totalPartial + resultData.totalUnsupported
    : 82;
  const supportedPct = resultData ? Math.round((resultData.totalSupported / total) * 100) : 88;

  useEffect(() => {
    if (isDemo) {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.result-card',
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, section);

      return () => ctx.revert();
    }
  }, [isDemo]);

  function handleCopy() {
    if (!resultData) return;
    const url = `${window.location.origin}/result/${resultData.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!resultData && !isDemo) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
        <div className="text-center">
          <p className="font-geist text-lg" style={{ color: '#888888' }}>
            Loading test result...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="test-result"
      style={{ backgroundColor: '#050505', padding: '120px 0' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <p
          className="font-mono text-xs uppercase mb-12"
          style={{ color: '#c0fa50', letterSpacing: '0.2em' }}
        >
          // TEST RESULT
        </p>

        <div
          className="result-card p-8 md:p-12 rounded-[20px]"
          style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h3
              className="font-geist text-2xl font-bold"
              style={{ color: '#ffffff' }}
            >
              {resultData?.executorName || 'mUNC Test'}
            </h3>
            <span
              className="font-mono text-[11px] uppercase px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(192,250,80,0.1)',
                color: '#c0fa50',
              }}
            >
              COMPLETED
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mb-8">
            <div>
              <p
                className="font-pixel text-4xl"
                style={{ color: '#c0fa50' }}
              >
                {resultData?.totalSupported ?? 72}
              </p>
              <p className="font-mono text-[11px] mt-1" style={{ color: '#888888' }}>
                Supported
              </p>
            </div>
            <div>
              <p
                className="font-pixel text-4xl"
                style={{ color: '#f5a623' }}
              >
                {resultData?.totalPartial ?? 6}
              </p>
              <p className="font-mono text-[11px] mt-1" style={{ color: '#888888' }}>
                Partial
              </p>
            </div>
            <div>
              <p
                className="font-pixel text-4xl"
                style={{ color: '#ff4444' }}
              >
                {resultData?.totalUnsupported ?? 4}
              </p>
              <p className="font-mono text-[11px] mt-1" style={{ color: '#888888' }}>
                Unsupported
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-10"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${supportedPct}%`,
                background: 'linear-gradient(90deg, #c0fa50, #a0e030)',
              }}
            />
          </div>

          {/* Category Breakdown */}
          <div className="mb-10">
            {functionCategories.map((cat) => {
              const catResults = resultData
                ? resultData.results.filter((r) => r.category === cat.name)
                : [];
              return (
                <CategoryBreakdown
                  key={cat.name}
                  categoryName={cat.name}
                  results={catResults.length > 0 ? catResults : cat.functions.map((fn) => ({
                    functionName: fn,
                    category: cat.name,
                    status: 'supported' as const,
                  }))}
                />
              );
            })}
          </div>

          {/* Share Link */}
          <div
            className="pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p
              className="font-geist text-sm font-normal mb-3"
              style={{ color: '#888888' }}
            >
              Share this result
            </p>
            <div className="flex gap-3">
              <div
                className="flex-1 font-mono text-[13px] px-5 py-3.5 rounded-[10px] truncate"
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#c0fa50',
                }}
              >
                {resultData
                  ? `${window.location.origin}/result/${resultData.id}`
                  : 'https://munc.dev/result/demo-12345'}
              </div>
              <button
                onClick={handleCopy}
                className="font-geist text-sm font-medium px-5 py-3 rounded-[10px] transition-colors duration-200 shrink-0"
                style={{
                  backgroundColor: copied ? 'rgba(192,250,80,0.15)' : '#111111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: copied ? '#c0fa50' : '#ffffff',
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
