"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RECENT_PLATFORMS } from "@/content/recent-platforms";
import styles from "./platform-orbit.module.css";

type Item = { name: string; image?: string; stack: string; href?: string; logo?: string };
const platforms: Item[] = [
  ...RECENT_PLATFORMS.map((p) => ({ name: p.name, image: p.image, stack: p.stack, href: p.url ?? `#project-${p.slug}` })),
  { name: "ElectraCore", image: "/showcase/electracore-feature.webp", stack: "Next.js · TypeScript · SVG", href: "https://electracore.vercel.app" },
  { name: "ApprenticeLog", image: "/showcase/apprenticelog-feature.webp", stack: "Next.js · TypeScript · Local storage", href: "https://apprentice-log-xi.vercel.app" },
  { name: "DigiLearn", image: "/showcase/digilearn-desktop.webp", stack: "Next.js · TypeScript", href: "https://digilearn-five.vercel.app" },
  { name: "TrailDesk", image: "/showcase/traildesk-desktop.webp", stack: "Next.js · Offline planning · Mapping", href: "https://traildesk.vercel.app" },
  { name: "SafeSignal", image: "/showcase/safesignal-desktop.webp", stack: "Next.js · TypeScript · Geolocation", href: "https://safesignal-beta.vercel.app" },
  { name: "PURE Entertainment", image: "/showcase/pure-entertainment-desktop.webp", stack: "JavaScript · Node.js", href: "https://entertainment-lac.vercel.app" },
];
const technologies: Item[] = [
  { name: "TypeScript", logo: "/logos/typescript.svg", stack: "Language · Typed application code" },
  { name: "JavaScript", logo: "/logos/javascript.svg", stack: "Language · Browser and server behaviour" },
  { name: "Rust", logo: "/logos/rust.svg", stack: "Language · School Results backend" },
  { name: "React", logo: "/logos/react.svg", stack: "UI library · Interactive interfaces" },
  { name: "Next.js", logo: "/logos/nextjs.svg", stack: "Framework · Websites and web applications" },
  { name: "Node.js", logo: "/logos/nodejs.svg", stack: "Runtime · Server-side JavaScript" },
  { name: "SQLite", logo: "/logos/sqlite.svg", stack: "Database · Structured application records" },
  { name: "IndexedDB", stack: "Browser storage · Local-first writing" },
  { name: "Cloudflare D1", logo: "/logos/cloudflare.svg", stack: "Database · Innera application data" },
  { name: "SVG", logo: "/logos/svg.svg", stack: "Graphics · ElectraCore circuit diagrams" },
];
// Equal-area points distributed across a sphere, rather than a flat carousel.
function point(index: number, count: number) {
  const y = 1 - 2 * (index + .5) / count;
  const radius = Math.sqrt(1 - y * y);
  const longitude = index * Math.PI * (3 - Math.sqrt(5));
  return { x: Math.sin(longitude) * radius, y, z: Math.cos(longitude) * radius };
}
function facing(index: number, count: number) {
  const p = point(index, count);
  return { yaw: -Math.atan2(p.x, p.z), pitch: Math.atan2(p.y, Math.hypot(p.x, p.z)) };
}
export default function PlatformOrbit() {
  const [mode, setMode] = useState<"work" | "tech">("work");
  const [rotation, setRotation] = useState(() => facing(0, platforms.length));
  const [playing, setPlaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number; id: number; sensitivity: number } | null>(null);
  const items = mode === "work" ? platforms : technologies;
  const positions = items.map((_, index) => {
    const p = point(index, items.length);
    const x = p.x * Math.cos(rotation.yaw) + p.z * Math.sin(rotation.yaw);
    const z = -p.x * Math.sin(rotation.yaw) + p.z * Math.cos(rotation.yaw);
    return { x, y: p.y * Math.cos(rotation.pitch) - z * Math.sin(rotation.pitch), z: p.y * Math.sin(rotation.pitch) + z * Math.cos(rotation.pitch) };
  });
  const selected = positions.reduce((best, p, index) => p.z > positions[best].z ? index : best, 0);
  const project = items[selected];
  useEffect(() => {
    if (!playing) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setRotation((r) => ({ yaw: r.yaw + .035, pitch: r.pitch + .009 }));
    }, 50);
    const stop = () => { if (motion.matches) setPlaying(false); };
    motion.addEventListener("change", stop);
    return () => { window.clearInterval(timer); motion.removeEventListener("change", stop); };
  }, [playing]);
  function choose(index: number) { setPlaying(false); setRotation(facing((index + items.length) % items.length, items.length)); }
  function start(event: PointerEvent<HTMLDivElement>) {
    if (drag.current || (event.pointerType === "mouse" && event.button !== 0)) return;
    setPlaying(false);
    moved.current = false;
    // Capture on the touched element so a stationary tap still activates its link.
    // Capture also keeps the gesture connected when a finger leaves the sphere.
    (event.target as Element).setPointerCapture(event.pointerId);
    setDragging(true);
    drag.current = {
      x: event.clientX, y: event.clientY, ...rotation, id: event.pointerId,
      sensitivity: Math.PI * 2 / Math.max(event.currentTarget.clientWidth, 280),
    };
  }
  function finish(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current?.id) return;
    drag.current = null; setDragging(false);
  }
  return <div className={styles.orbit} role="region" aria-label="Interactive platform explorer">
    <div className={styles.modes} aria-label="Explorer view">
      <button type="button" aria-pressed={mode === "work"} onClick={() => { setMode("work"); choose(0); }}>Platforms <span>{platforms.length}</span></button>
      <button type="button" aria-pressed={mode === "tech"} onClick={() => { setMode("tech"); choose(0); }}>Languages & tools <span>{technologies.length}</span></button>
    </div>
    <div className={styles.stage} tabIndex={0} role="group" aria-label="Rotate the sphere: drag in any direction or use all four arrow keys. Home resets the view." data-dragging={dragging}
      onKeyDown={(event) => {
        if (event.key.startsWith("Arrow")) {
          event.preventDefault(); setPlaying(false);
          setRotation((r) => ({ yaw: r.yaw + (event.key === "ArrowLeft" ? -.25 : event.key === "ArrowRight" ? .25 : 0), pitch: r.pitch + (event.key === "ArrowUp" ? .25 : event.key === "ArrowDown" ? -.25 : 0) }));
        }
        if (event.key === "Home") { event.preventDefault(); choose(0); }
      }} onDragStart={(event) => event.preventDefault()} onClickCapture={(event) => {
        if (moved.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); }
      }} onPointerDown={start} onPointerMove={(event) => {
        const d = drag.current;
        if (!d || d.id !== event.pointerId) return;
        if (!moved.current && Math.hypot(event.clientX - d.x, event.clientY - d.y) < 4) return;
        moved.current = true;
        setDragging(true);
        // Keep capture on the persistent stage once this is a drag: the
        // preview link can disappear when it rotates to the back hemisphere.
        event.currentTarget.setPointerCapture(event.pointerId);
        setRotation({ yaw: d.yaw + (event.clientX - d.x) * d.sensitivity, pitch: d.pitch - (event.clientY - d.y) * d.sensitivity });
      }} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={(event) => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) finish(event); }}>
      <div className={styles.sphere} aria-hidden="true" style={{ transform: `rotateX(${rotation.pitch}rad) rotateY(${rotation.yaw}rad)` }}><div /><div /><div /></div>
      <div className={styles.ring} aria-hidden="true" /><div className={styles.ringInner} aria-hidden="true" />
      {items.map((item, index) => {
        const p = positions[index];
        return <div key={`${mode}-${item.name}`} className={`${styles.card} ${!item.image ? styles.techCard : ""}`} aria-hidden={!item.href || p.z < 0 ? true : undefined} data-active={index === selected} style={{
          "--x": `${(p.x * 33).toFixed(4)}cqw`, "--y": `${(p.y * 30).toFixed(4)}cqw`, "--scale": (.5 + (p.z + 1) * .25).toFixed(4),
          opacity: Number((.3 + (p.z + 1) * .35).toFixed(4)), zIndex: Math.round((p.z + 1) * 100) + 2,
        } as CSSProperties}>
          <div className={styles.cardTitle}><i />{item.name}<span>{String(index + 1).padStart(2, "0")}</span></div>
          {item.image ? <div className={styles.capture}><Image src={item.image} alt="" fill sizes="(max-width: 900px) 40vw, 260px" draggable={false} preload={index === 0} /></div> : <div className={styles.symbol}>{item.logo ? <Image className={styles.techLogo} data-monochrome={item.name === "Rust"} src={item.logo} alt={item.name === "SVG" ? "W3C SVG Logo" : `${item.name === "Cloudflare D1" ? "Cloudflare" : item.name} logo`} width={64} height={64} draggable={false} unoptimized /> : <svg className={styles.storageIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><ellipse cx="24" cy="11" rx="15" ry="6" /><path d="M9 11v26c0 8 30 8 30 0V11M9 24c0 8 30 8 30 0" /></svg>}<span>{item.stack.split(" · ")[0]}</span></div>}
          {item.href && p.z >= 0 && <a className={styles.cardLink} href={item.href} aria-label={`Open ${item.name}`} draggable={false} onFocus={() => setPlaying(false)} />}
        </div>;
      })}
      <span className={styles.dragHint} aria-hidden="true">{mode === "work" ? "SWIPE TO ROTATE · TAP A PREVIEW TO OPEN" : "SWIPE TO ROTATE · EXPLORE THE STACK"}</span>
    </div>
    <div className={styles.details}>
      <div aria-live={playing || dragging ? "off" : "polite"} aria-atomic="true"><p className={styles.number}>{String(selected + 1).padStart(2, "0")} / {items.length}</p>{project.href ? <a href={project.href} className={styles.project}>{project.name}<span aria-hidden="true">↗</span></a> : <p className={styles.project}>{project.name}</p>}<p className={styles.stack}>{project.stack}</p></div>
      <div className={styles.controls}><button type="button" aria-label="Previous item" onClick={() => choose(selected - 1)}>←</button><button type="button" className={styles.play} aria-label={playing ? "Pause rotation" : "Play rotation"} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ" : "▷"}</button><button type="button" aria-label="Next item" onClick={() => choose(selected + 1)}>→</button></div>
    </div>
    <div className={styles.index} aria-label={mode === "work" ? "Choose a platform" : "Choose a technology"}>{items.map((item, i) => <button key={item.name} type="button" aria-pressed={selected === i} onClick={() => choose(i)}>{item.name}</button>)}</div>
  </div>;
}
