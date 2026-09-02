import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsTouchOrSmall } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

interface AuroraProps {
  className?: string;
  /** `hero` is the full-strength treatment; `ambient` is a dimmer accent wash. */
  intensity?: 'hero' | 'ambient';
  /** Let pointer movement nudge the blobs. Ignored on touch / reduced motion. */
  interactive?: boolean;
}

interface Blob {
  color: string;
  /** Position and size as viewport-relative percentages. */
  top: string;
  left: string;
  size: string;
  /** Parallax factor applied to pointer movement. */
  depth: number;
  duration: number;
  delay: number;
  drift: [number, number];
}

const BLOBS: Blob[] = [
  { color: '#ff5fa2', top: '-14%', left: '4%', size: '52vw', depth: 1, duration: 22, delay: 0, drift: [6, -8] },
  { color: '#c74bff', top: '-4%', left: '34%', size: '46vw', depth: 1.6, duration: 27, delay: 1.5, drift: [-7, 6] },
  { color: '#7b5cff', top: '18%', left: '58%', size: '44vw', depth: 1.2, duration: 25, delay: 3, drift: [5, 7] },
  { color: '#3d8bff', top: '38%', left: '18%', size: '40vw', depth: 2.1, duration: 30, delay: 0.8, drift: [-6, -5] },
  { color: '#ffc8a2', top: '-8%', left: '68%', size: '34vw', depth: 0.7, duration: 24, delay: 2.2, drift: [8, 5] },
  { color: '#8ef0c0', top: '46%', left: '72%', size: '30vw', depth: 1.8, duration: 32, delay: 4, drift: [-5, 8] },
];

/**
 * The abstract gradient field behind the hero and the final CTA.
 *
 * Implementation notes: each blob is a radial gradient on its own compositor
 * layer, animated only via `transform` and `opacity`, with the blur applied to
 * a static parent so the (expensive) filter is rasterised once instead of on
 * every frame. Pointer influence runs through motion values and springs so no
 * React render happens while the cursor moves.
 */
export function Aurora({ className, intensity = 'hero', interactive = true }: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const small = useIsTouchOrSmall();
  const pointerEnabled = interactive && !reduced && !small;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 22, mass: 0.9 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 22, mass: 0.9 });

  useEffect(() => {
    if (!pointerEnabled) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Normalised to [-1, 1] around the centre of the field.
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [pointerEnabled, pointerX, pointerY]);

  const isHero = intensity === 'hero';

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      {/* The filter applies to this subtree's rendered output, so while the blobs
          animate inside it the blur is recomputed every frame over an area 140% of
          the hero — it cannot be cached. That is affordable on a desktop GPU and
          is not on a phone, which is why the drift stops below `lg` (see the
          `animated` prop) and the radius drops here. */}
      <div
        className="absolute inset-[-20%]"
        style={{
          filter: `blur(${small ? 55 : isHero ? 90 : 110}px)`,
          opacity: isHero ? 0.85 : 0.42,
        }}
      >
        {BLOBS.map((blob, index) => (
          <AuroraBlob
            key={blob.color + index}
            blob={blob}
            animated={!reduced && !small}
            pointerX={pointerEnabled ? springX : null}
            pointerY={pointerEnabled ? springY : null}
          />
        ))}
      </div>

      {/* Grounding wash: keeps type legible over the brightest part of the field. */}
      <div
        className="absolute inset-0"
        style={{
          background: isHero
            ? 'radial-gradient(120% 90% at 50% 0%, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.55) 45%, #050505 88%)'
            : 'radial-gradient(120% 100% at 50% 50%, rgba(5,5,5,0.25) 0%, #050505 80%)',
        }}
      />
      <div className="grain absolute inset-0 hidden lg:block" />
    </div>
  );
}

function AuroraBlob({
  blob,
  animated,
  pointerX,
  pointerY,
}: {
  blob: Blob;
  animated: boolean;
  pointerX: ReturnType<typeof useSpring> | null;
  pointerY: ReturnType<typeof useSpring> | null;
}) {
  const range = 26 * blob.depth;
  // Hooks must run unconditionally; the transforms are simply unused when
  // pointer interaction is off.
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const x = useTransform(pointerX ?? fallbackX, [-1, 1], [-range, range]);
  const y = useTransform(pointerY ?? fallbackY, [-1, 1], [-range * 0.7, range * 0.7]);

  return (
    // Outer layer carries pointer parallax, inner layer carries the ambient
    // drift — keeping them separate avoids two animations fighting over the
    // same transform channel.
    <motion.div
      className="absolute will-change-transform"
      style={{
        top: blob.top,
        left: blob.left,
        width: blob.size,
        height: blob.size,
        x,
        y,
      }}
    >
      <motion.div
        className="h-full w-full rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, ${blob.color}cc 32%, transparent 70%)`,
        }}
        animate={
          animated
            ? {
                scale: [1, 1.16, 0.94, 1],
                x: ['0%', `${blob.drift[0]}%`, `${blob.drift[0] * -0.6}%`, '0%'],
                y: ['0%', `${blob.drift[1]}%`, `${blob.drift[1] * -0.6}%`, '0%'],
                opacity: [0.75, 1, 0.8, 0.75],
              }
            : undefined
        }
        transition={{
          duration: blob.duration,
          delay: blob.delay,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
