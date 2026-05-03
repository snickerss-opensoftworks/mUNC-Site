import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { functionCategories, totalFunctions } from '../data/functions';

gsap.registerPlugin(ScrollTrigger);

export default function FunctionLibrary() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.func-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
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
      id="functions"
      style={{ backgroundColor: '#0a0a0a', padding: '120px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <p
          className="font-mono text-xs uppercase mb-12"
          style={{ color: '#c0fa50', letterSpacing: '0.2em' }}
        >
          // FUNCTIONS
        </p>

        <h2
          className="font-pixel font-bold mb-4"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#ffffff',
          }}
        >
          Complete Function Library
        </h2>

        <p
          className="font-geist text-base font-normal mb-16"
          style={{ color: '#888888' }}
        >
          {totalFunctions} functions tested by mUNC, organized by category.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {functionCategories.map((cat) => (
            <div
              key={cat.name}
              className="func-card p-7 rounded-xl"
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '2px solid #c0fa50',
              }}
            >
              <h3
                className="font-geist text-base font-semibold mb-2"
                style={{ color: '#ffffff' }}
              >
                {cat.name}
              </h3>
              <p
                className="font-mono text-[13px] mb-4"
                style={{ color: '#555555' }}
              >
                {cat.functions.length} functions
              </p>
              <div
                className="font-mono text-xs leading-7 overflow-hidden"
                style={{
                  color: '#888888',
                  maxHeight: '160px',
                  lineHeight: 1.8,
                }}
              >
                {cat.functions.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
