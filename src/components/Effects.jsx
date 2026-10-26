import { useEffect, useRef } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks';

export function FilmGrain() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="letterbox letterbox--top" aria-hidden="true" />
      <div className="letterbox letterbox--bottom" aria-hidden="true" />
    </>
  );
}

const SEGMENTS = 24;
const SEGMENT_LEN = 6.5;

export function Cursor() {
  const fine = useMediaQuery('(pointer: fine)');
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    const label = labelRef.current;
    if (!canvas || !label) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    document.body.classList.add('has-cursor');

    const target = { x: width / 2, y: height / 2 };
    const head = { x: target.x, y: target.y };
    const dir = { x: 1, y: 0 };
    const chain = Array.from({ length: SEGMENTS }, (_, i) => ({
      x: target.x - i * SEGMENT_LEN,
      y: target.y,
    }));

    let speed = 0;
    let phase = 0;
    let hot = false;
    let pressed = false;
    let visible = false;
    let labelOn = false;

    const setLabel = (on) => {
      if (on === labelOn) return;
      labelOn = on;
      label.textContent = on ? 'VIEW' : '';
      label.classList.toggle('is-on', on);
    };

    const readTarget = (event) => {
      const el = event.target instanceof Element ? event.target : null;
      setLabel(Boolean(el?.closest('[data-cursor="view"]')));
      hot = Boolean(el?.closest('a, button, [data-cursor]'));
    };

    const point = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        canvas.classList.add('is-on');
        head.x = target.x;
        head.y = target.y;
        chain.forEach((node, i) => {
          node.x = target.x - dir.x * i * SEGMENT_LEN;
          node.y = target.y - dir.y * i * SEGMENT_LEN;
        });
      }
      readTarget(event);
    };

    const over = (event) => readTarget(event);
    const down = () => {
      pressed = true;
    };
    const up = () => {
      pressed = false;
    };
    const leave = (event) => {
      if (event.relatedTarget) return;
      visible = false;
      hot = false;
      pressed = false;
      setLabel(false);
      canvas.classList.remove('is-on');
    };
    const blur = () => {
      visible = false;
      hot = false;
      pressed = false;
      setLabel(false);
      canvas.classList.remove('is-on');
    };

    window.addEventListener('pointermove', point, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    window.addEventListener('blur', blur);
    window.addEventListener('resize', resize);

    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dx = target.x - head.x;
      const dy = target.y - head.y;
      const easing = pressed ? 0.5 : 0.42;
      const stepX = dx * easing;
      const stepY = dy * easing;
      head.x += stepX;
      head.y += stepY;

      const moved = Math.hypot(stepX, stepY);
      speed = speed * 0.82 + moved * 0.18;

      if (moved > 0.25) {
        const len = Math.hypot(dx, dy) || 1;
        dir.x += (dx / len - dir.x) * 0.35;
        dir.y += (dy / len - dir.y) * 0.35;
        const dirLen = Math.hypot(dir.x, dir.y) || 1;
        dir.x /= dirLen;
        dir.y /= dirLen;
      }

      chain[0].x = head.x;
      chain[0].y = head.y;
      for (let i = 1; i < SEGMENTS; i += 1) {
        const prev = chain[i - 1];
        const node = chain[i];
        const ddx = prev.x - node.x;
        const ddy = prev.y - node.y;
        const distance = Math.hypot(ddx, ddy);
        if (distance > SEGMENT_LEN) {
          const pull = (distance - SEGMENT_LEN) / distance;
          node.x += ddx * pull;
          node.y += ddy * pull;
        }
      }

      phase += 0.075 + Math.min(speed, 26) * 0.014;
      const amp = 1.1 + Math.min(speed, 24) * 0.42;
      const hotScale = hot ? 1.12 : 1;
      const pressScale = pressed ? 0.86 : 1;

      const pts = [];
      for (let i = 0; i < SEGMENTS; i += 1) {
        const node = chain[i];
        const prev = chain[Math.max(0, i - 1)];
        const next = chain[Math.min(SEGMENTS - 1, i + 1)];
        const tx = prev.x - next.x;
        const ty = prev.y - next.y;
        const tl = Math.hypot(tx, ty) || 1;
        const env = Math.sin((i / (SEGMENTS - 1)) * Math.PI);
        const wave = Math.sin(phase - i * 0.58) * amp * env;
        pts.push({ x: node.x - (ty / tl) * wave, y: node.y + (tx / tl) * wave });
      }

      const widths = pts.map((_, i) => {
        const t = i / (SEGMENTS - 1);
        return (8.4 - 5.6 * Math.pow(t, 0.9)) * hotScale * pressScale;
      });

      const angle = Math.atan2(dir.y, dir.x);
      const headRX = 10 * hotScale * pressScale;
      const headRY = 7 * hotScale * pressScale;

      const left = [];
      const right = [];
      for (let i = 0; i < pts.length; i += 1) {
        const p = pts[i];
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(pts.length - 1, i + 1)];
        const tx = next.x - prev.x;
        const ty = next.y - prev.y;
        const tl = Math.hypot(tx, ty) || 1;
        const nx = -ty / tl;
        const ny = tx / tl;
        left.push({ x: p.x + nx * widths[i], y: p.y + ny * widths[i] });
        right.push({ x: p.x - nx * widths[i], y: p.y - ny * widths[i] });
      }

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      for (let i = 1; i < left.length; i += 1) ctx.lineTo(left[i].x, left[i].y);
      for (let i = right.length - 1; i >= 0; i -= 1) ctx.lineTo(right[i].x, right[i].y);
      ctx.closePath();

      ctx.save();
      ctx.strokeStyle = 'rgba(7, 7, 10, 0.5)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowColor = hot ? 'rgba(255, 190, 120, 0.75)' : 'rgba(255, 90, 54, 0.55)';
      ctx.shadowBlur = hot ? 26 : 14;
      const bodyGradient = ctx.createLinearGradient(
        pts[0].x,
        pts[0].y,
        pts[pts.length - 1].x,
        pts[pts.length - 1].y
      );
      bodyGradient.addColorStop(0, hot ? '#ffe6b8' : '#ffd39a');
      bodyGradient.addColorStop(0.35, '#ff8a4d');
      bodyGradient.addColorStop(0.8, '#ff5a36');
      bodyGradient.addColorStop(1, '#a82c14');
      ctx.fillStyle = bodyGradient;
      ctx.fill();
      ctx.restore();

      const spine = ctx.createLinearGradient(
        pts[0].x,
        pts[0].y,
        pts[pts.length - 1].x,
        pts[pts.length - 1].y
      );
      spine.addColorStop(0, 'rgba(255, 243, 214, 0.85)');
      spine.addColorStop(0.35, 'rgba(255, 200, 140, 0.3)');
      spine.addColorStop(1, 'rgba(255, 200, 140, 0)');
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = spine;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(pts[0].x, pts[0].y);
      ctx.rotate(angle);
      ctx.fillStyle = '#ff7a4d';
      ctx.strokeStyle = 'rgba(7, 7, 10, 0.72)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, headRX, headRY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#07070a';
      ctx.beginPath();
      ctx.arc(headRX * 0.32, -headRY * 0.48, 1.7, 0, Math.PI * 2);
      ctx.arc(headRX * 0.32, headRY * 0.48, 1.7, 0, Math.PI * 2);
      ctx.fill();

      const cycle = ((performance.now() / 1000) % 3.2) / 3.2;
      const flick =
        cycle > 0.86 ? Math.sin(((cycle - 0.86) / 0.14) * Math.PI) * 6.5 : 0;
      if (flick > 0.2) {
        const snout = headRX * 0.8;
        ctx.strokeStyle = hot ? '#ffe6b8' : '#ff5a36';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(snout, 0);
        ctx.lineTo(snout + flick, 0);
        ctx.moveTo(snout + flick, 0);
        ctx.lineTo(snout + flick + 2.4, -2.2);
        ctx.moveTo(snout + flick, 0);
        ctx.lineTo(snout + flick + 2.4, 2.2);
        ctx.stroke();
      }
      ctx.restore();

      if (labelOn) {
        label.style.transform = `translate3d(${Math.min(width - 64, pts[0].x + 18)}px, ${Math.min(
          height - 30,
          pts[0].y + 18
        )}px, 0)`;
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', point);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
      window.removeEventListener('blur', blur);
      window.removeEventListener('resize', resize);
      document.body.classList.remove('has-cursor');
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <canvas ref={canvasRef} className="snake-cursor" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label mono" aria-hidden="true" />
    </>
  );
}
