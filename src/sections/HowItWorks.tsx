import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Join the Game',
    body: 'Execute the mUNC test script inside our official Roblox experience. The script runs in a controlled environment with full server validation.',
  },
  {
    number: '02',
    title: 'Run the Tests',
    body: 'Over 80 automated function tests execute in sequence, validating behavior rather than just presence. Each test checks real functionality to prevent spoofing.',
  },
  {
    number: '03',
    title: 'Get Your Link',
    body: 'Results are encrypted and sent to our server, generating a unique shareable link. View complete breakdowns with pass/fail/partial status for every function.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const stepEls = section.querySelectorAll('.step-item');
      gsap.fromTo(
        stepEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
      id="how-it-works"
      style={{ backgroundColor: '#0a0a0a', padding: '120px 0' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <p
          className="font-mono text-xs uppercase mb-12 text-center"
          style={{ color: '#c0fa50', letterSpacing: '0.2em' }}
        >
          // PROCESS
        </p>

        <h2
          className="font-pixel font-bold text-center mb-16"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#ffffff',
          }}
        >
          How mUNC Works
        </h2>

        <div className="flex flex-col items-center">
          {steps.map((step, i) => (
            <div key={i} className="w-full">
              <div className="step-item flex flex-col md:flex-row items-start md:items-center gap-8">
                <span
                  className="font-pixel text-7xl font-bold shrink-0"
                  style={{ color: 'rgba(192,250,80,0.15)' }}
                >
                  {step.number}
                </span>
                <div>
                  <h3
                    className="font-geist text-[22px] font-semibold mb-2"
                    style={{ color: '#ffffff' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-geist text-[15px] font-light leading-relaxed"
                    style={{ color: '#888888', lineHeight: 1.6 }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="w-px h-[60px] mx-auto my-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
