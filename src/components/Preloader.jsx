import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks';

const STEPS = ['3', '2', '1'];

export default function Preloader({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 720),
      setTimeout(() => setStep(2), 1440),
      setTimeout(() => setStep(3), 2160),
      setTimeout(() => setLeaving(true), 3000),
      setTimeout(() => onDone(), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="preloader"
      initial={false}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden={leaving}
    >
      <div className="preloader-top">
        <span className="mono">AK — THE BUILD</span>
        <span className="mono">A SHORT FILM ABOUT SHIPPING</span>
      </div>

      <div className="preloader-center">
        <div className="leader">
          <svg viewBox="0 0 200 200" className="leader-ring">
            <circle cx="100" cy="100" r="86" className="leader-track" />
            <motion.circle
              cx="100"
              cy="100"
              r="86"
              className="leader-sweep"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: step >= 3 ? 1 : step + 1 / 3 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 100px' }}
            />
            <line x1="100" y1="8" x2="100" y2="192" className="leader-cross" />
            <line x1="8" y1="100" x2="192" y2="100" className="leader-cross" />
          </svg>
          <div className="leader-number">
            {step < 3 ? (
              <motion.span
                key={STEPS[step]}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {STEPS[step]}
              </motion.span>
            ) : (
              <motion.span
                className="leader-roll"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                ROLL
                <small>CAMERA</small>
              </motion.span>
            )}
          </div>
        </div>
      </div>

      <div className="preloader-bottom">
        <span className="mono">ASHUTOSH KUMAR · FULL-STACK DEVELOPER</span>
        <div className="preloader-bottom-right">
          <span className="mono">2026</span>
          <button
            className="preloader-skip mono"
            onClick={() => {
              setLeaving(true);
              setTimeout(onDone, 900);
            }}
          >
            SKIP INTRO →
          </button>
        </div>
      </div>

      <div className="preloader-progress">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
