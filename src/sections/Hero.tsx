import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onScrollTo?: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const video = videoRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!wrapper || !content || !video || !canvasWrap) return;

    const ctx = gsap.context(() => {
      // Pin the hero
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: true,
      });

      // Content exit animation
      gsap.to(content, {
        y: -150,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Video scale
      gsap.to(video, {
        scale: 1.15,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Canvas fade
      gsap.to(canvasWrap, {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapper,
          start: '40% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.05,
          }
        );
      }

      // Subtitle + CTA entrance
      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const titleText = 'mUNC';

  return (
    <div ref={wrapperRef} className="hero-wrapper relative w-full" style={{ height: '100vh' }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, willChange: 'transform' }}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.8) 100%)',
        }}
      />

      {/* Particle Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
      >
        <ParticleCanvas />
      </div>

      {/* Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.08) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Radial gradient for text readability */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 4,
          background:
            'radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 70%, rgba(5,5,5,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative flex flex-col items-center justify-center h-full px-6"
        style={{ zIndex: 5 }}
      >
        {/* Pre-title */}
        <p
          className="font-mono text-xs uppercase mb-6"
          style={{
            color: '#888888',
            letterSpacing: '0.25em',
          }}
        >
          Monkey Unified Naming Convention
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-pixel font-bold text-center leading-none"
          style={{
            fontSize: 'clamp(80px, 15vw, 200px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            textShadow: '0 0 80px rgba(192, 250, 80, 0.15)',
          }}
        >
          {titleText.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle font-geist text-center mt-6 max-w-[520px]"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: '#888888',
            lineHeight: 1.6,
            textShadow: '0 2px 30px rgba(0,0,0,0.8)',
          }}
        >
          The next-generation executor environment test. Validate your implementation with
          confidence through automated, in-game testing.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-cta flex flex-col sm:flex-row gap-4 mt-10"
          style={{ textShadow: '0 0 60px rgba(0,0,0,0.6)' }}
        >
          <button
            onClick={() => onScrollTo?.('test-result')}
            className="font-geist text-sm font-semibold px-9 py-3.5 rounded-full transition-all duration-300 hover:bg-white"
            style={{
              backgroundColor: '#c0fa50',
              color: '#050505',
            }}
          >
            Start Testing
          </button>
          <button
            onClick={() => onScrollTo?.('functions')}
            className="font-geist text-sm font-normal px-9 py-3.5 rounded-full transition-all duration-300 hover:border-white/30"
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            View Functions
          </button>
        </div>
      </div>
    </div>
  );
}
