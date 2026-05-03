import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Shield, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Terminal,
    title: 'Comprehensive Testing',
    body: 'Over 80 individual function tests across 13 categories including closures, debug, filesystem, instances, metatable, and more.',
  },
  {
    icon: Shield,
    title: 'Anti-Spoof Protection',
    body: 'Tests run inside a controlled Roblox environment with encrypted server communication. Results are cryptographically signed and tamper-proof.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Results',
    body: 'Get a shareable link with complete breakdown of every test. See exactly which functions pass, fail, or return partial results with full transparency.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.feature-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{ backgroundColor: '#050505', padding: '120px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <p
          className="font-mono text-xs uppercase mb-12"
          style={{ color: '#c0fa50', letterSpacing: '0.2em' }}
        >
          // PLATFORM
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card p-10 rounded-2xl"
              style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <feature.icon
                size={24}
                style={{ color: '#c0fa50', marginBottom: '24px' }}
              />
              <h3
                className="font-geist text-lg font-semibold mb-3"
                style={{ color: '#ffffff' }}
              >
                {feature.title}
              </h3>
              <p
                className="font-geist text-[15px] font-light leading-relaxed"
                style={{ color: '#888888', lineHeight: 1.6 }}
              >
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
