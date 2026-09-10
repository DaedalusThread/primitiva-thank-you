"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { anniversary, type Chapter } from "@/data/anniversary";

const transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };

function Brand() {
  return (
    <div className="brand" aria-label={anniversary.brand.name}>
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>{anniversary.brand.name}</span>
    </div>
  );
}

function Reveal({ active, children, className = "", delay = 0 }: { active: boolean; children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 }}
      transition={{ ...transition, delay: active ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function CityDiagram({ chapter, active }: { chapter: Extract<Chapter, { id: "three-cities" }>; active: boolean }) {
  const reduced = useReducedMotion();
  const flightD = "M 12 58 C 24 38, 33 32, 42 32 C 55 32, 72 42, 87 60";

  return (
    <div className="city-map" aria-label="Three connected team locations">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {/* Continuous dashed flight route */}
        <motion.path
          id="flight-route"
          className="flight-path"
          d={flightD}
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ ...transition, duration: 0.9, delay: 0.2 }}
        />

        {/* Flying airplane along the route */}
        {!reduced && (
          <g className="flight-airplane">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#flight-route" />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0; 1; 1; 1; 0; 0"
              keyTimes="0; 0.08; 0.5; 0.92; 0.98; 1"
              dur="8s"
              repeatCount="indefinite"
            />
            {/* Minimalist editorial paper airplane */}
            <g transform="scale(0.85)">
              <polygon points="6,0 -4.5,-3.5 -2,0" fill="#181817" />
              <polygon points="6,0 -2,0 -4.5,3.5" fill="#4A4641" />
              <line x1="6" y1="0" x2="-2" y2="0" stroke="#FAF8F5" strokeWidth="0.5" strokeLinecap="round" />
            </g>
          </g>
        )}
      </svg>
      {chapter.cities.map((city, index) => {
        const isFeatured = "featured" in city && city.featured;
        const yOffset = isFeatured ? "-6px" : "-4px";
        return (
          <motion.div
            key={city.name}
            className={`city-point ${isFeatured ? "featured" : ""}`}
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
            initial={false}
            animate={
              active
                ? { opacity: 1, scale: 1, x: "-50%", y: yOffset }
                : { opacity: 0, scale: 0.7, x: "-50%", y: yOffset }
            }
            transition={{ ...transition, delay: 0.35 + index * 0.14 }}
          >
            <i />
            <strong>{city.name}</strong>
            <span>{city.detail}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function PhotoCard({ photo, index, active, kind = "team" }: { photo: { readonly src: string; readonly alt: string; readonly caption: string }; index: number; active: boolean; kind?: "team" | "cat" }) {
  const reduced = useReducedMotion();
  return (
    <motion.figure className={`photo-card photo-${index + 1} ${kind}`} initial={false} animate={active ? { opacity: 1, y: 0, rotate: reduced ? 0 : index === 0 ? -2 : index === 1 ? 1.5 : 2.5 } : { opacity: 0, y: 28, rotate: 0 }} transition={{ ...transition, delay: .18 + index * .12 }}>
      <div className="photo-window">
        {photo.src ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 42vw, 24vw" /> : <span className="photo-placeholder" aria-label="Replaceable photo slot">＋</span>}
      </div>
      <figcaption>{photo.caption}</figcaption>
    </motion.figure>
  );
}

function ChapterView({ chapter, index, active }: { chapter: Chapter; index: number; active: boolean }) {
  if (chapter.id === "hero") {
    return (
      <section className="chapter hero" aria-labelledby="hero-title" data-index={index}>
        <div className="hero-copy">
          <Reveal active={active}><Label>{chapter.label}</Label></Reveal>
          <Reveal active={active} delay={.08}><h1 id="hero-title">{chapter.title}</h1></Reveal>
          <Reveal active={active} delay={.18} className="hero-body">{chapter.lines.map((line) => <span key={line}>{line}</span>)}</Reveal>
          <Reveal active={active} delay={.42}><p className="hand-note">{chapter.note}</p></Reveal>
        </div>
        <motion.figure className="hero-visual" initial={false} animate={active ? { opacity: 1, scale: 1 } : { opacity: .6, scale: 1.015 }} transition={{ ...transition, duration: 1.05 }}>
          <Image src={chapter.image} alt="Kabu, the team’s long-haired cream cat, sitting in warm afternoon light" fill priority sizes="(max-width: 800px) 100vw, 62vw" />
          <figcaption>One small family, three cities</figcaption>
        </motion.figure>
      </section>
    );
  }

  if (chapter.id === "you-joined") {
    return (
      <section className="chapter quiet-section" aria-labelledby="joined-title" data-index={index}>
        <div className="chapter-grid">
          <Reveal active={active} className="chapter-intro"><Label>{chapter.label}</Label><h2 id="joined-title">{chapter.title}</h2></Reveal>
          <div className="joined-copy">
            {chapter.paragraphs.map((p, i) => <Reveal active={active} delay={.14 + i * .12} key={p}><p>{p}</p></Reveal>)}
            <Reveal active={active} delay={.42}><p className="closing">{chapter.closing}</p></Reveal>
          </div>
          <Reveal active={active} delay={.28} className="year-mark"><span>365</span><small>days of questions,<br />conversations & becoming</small></Reveal>
        </div>
      </section>
    );
  }

  if (chapter.id === "three-cities") {
    return (
      <section className="chapter cities-section" aria-labelledby="cities-title" data-index={index}>
        <Reveal active={active} className="cities-copy"><Label>{chapter.label}</Label><h2 id="cities-title">{chapter.title}</h2><p className="city-statement">{chapter.statement}</p><p className="hand-note">{chapter.note}</p></Reveal>
        <CityDiagram chapter={chapter} active={active} />
      </section>
    );
  }

  if (chapter.id === "investor") {
    return (
      <section className="chapter profile-section" aria-labelledby="investor-title" data-index={index}>
        <Reveal active={active}><Label>{chapter.label}</Label></Reveal>
        <Reveal active={active} delay={.08}><h2 id="investor-title" className="profile-lead">{chapter.title}</h2></Reveal>
        <Reveal active={active} delay={.18}><p className="profile-statement">{chapter.statement}</p></Reveal>
        <div className="profile-lines">{chapter.lines.map((line, i) => <Reveal active={active} delay={.32 + i * .14} key={line}><p>{line}</p></Reveal>)}</div>
        <Reveal active={active} delay={.6}><p className="hand-note">{chapter.note}</p></Reveal>
      </section>
    );
  }

  if (chapter.id === "growing") {
    return (
      <section className="chapter growth-section" aria-labelledby="growth-title" data-index={index}>
        <div className="overlap-art" aria-hidden="true"><i /><i /><i /><span>trust</span></div>
        <div className="growth-copy">
          <Reveal active={active}><Label>{chapter.label}</Label><h2 id="growth-title">{chapter.title}</h2></Reveal>
          <Reveal active={active} delay={.15}><p className="statement">{chapter.statement}</p></Reveal>
          <div className="small-copy">{chapter.paragraphs.map((p, i) => <Reveal active={active} delay={.3 + i * .12} key={p}><p>{p}</p></Reveal>)}</div>
          <Reveal active={active} delay={.58}><p className="hand-note">{chapter.note}</p></Reveal>
        </div>
      </section>
    );
  }

  if (chapter.id === "small-team") {
    return (
      <section className="chapter photo-section team-section" aria-labelledby="team-title" data-index={index}>
        <div className="photo-copy"><Reveal active={active}><Label>{chapter.label}</Label><h2 id="team-title">{chapter.title}</h2></Reveal><Reveal active={active} delay={.15}><p className="statement">{chapter.statement}</p></Reveal><Reveal active={active} delay={.3}><p className="small-copy">{chapter.lines.join(" ")}</p></Reveal></div>
        <div className="photo-spread">{chapter.photos.map((photo, i) => <PhotoCard key={photo.caption} photo={photo} index={i} active={active} />)}</div>
      </section>
    );
  }

  if (chapter.id === "cat") {
    return (
      <section className="chapter photo-section cat-section" aria-labelledby="cat-title" data-index={index}>
        <div className="photo-copy"><Reveal active={active}><Label>{chapter.label}</Label><h2 id="cat-title">{chapter.title}</h2></Reveal><Reveal active={active} delay={.12}><p className="statement">{chapter.statement}</p><p className="small-copy">{chapter.lines.join(" ")}</p></Reveal><Reveal active={active} delay={.42}><p className="hand-note">{chapter.note}</p></Reveal></div>
        <div className="photo-spread cat-spread">{chapter.photos.map((photo, i) => <PhotoCard key={photo.caption} photo={photo} index={i} active={active} kind="cat" />)}</div>
      </section>
    );
  }

  if (chapter.id === "motion") {
    return (
      <section className="chapter milestone-section" aria-labelledby="motion-title" data-index={index}>
        <Reveal active={active} className="milestone-intro"><Label>{chapter.label}</Label><h2 id="motion-title">{chapter.title}</h2></Reveal>
        <div className="milestone-list">{chapter.milestones.map((item, i) => <motion.article key={item.number} initial={false} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }} transition={{ ...transition, delay: .18 + i * .14 }}><span>{item.number}</span><h3>{item.text}</h3><small>{item.meta}</small></motion.article>)}</div>
      </section>
    );
  }

  if (chapter.id === "not-straight") {
    return (
      <section className="chapter road-section" aria-labelledby="road-title" data-index={index}>
        <div className="road-line" aria-hidden="true"><i /><i /><i /></div>
        <Reveal active={active} className="road-copy"><Label>{chapter.label}</Label><h2 id="road-title">{chapter.title}</h2></Reveal>
        <Reveal active={active} delay={.3} className="road-answer"><p className="statement">{chapter.statement}</p>{chapter.lines.map((line) => <span key={line}>{line}</span>)}<p className="closing">{chapter.closing}</p></Reveal>
      </section>
    );
  }

  if (chapter.id === "notes") {
    return (
      <section className="chapter notes-section" aria-labelledby="notes-title" data-index={index}>
        <Reveal active={active} className="notes-intro"><Label>{chapter.label}</Label><h2 id="notes-title">{chapter.title}</h2><p className="statement">{chapter.statement}</p></Reveal>
        <div className="letters">{chapter.notes.map((note, i) => <motion.article key={note.from} className={`letter letter-${i + 1}`} initial={false} animate={active ? { opacity: 1, y: 0, rotate: i ? 1 : -1 } : { opacity: 0, y: 30, rotate: 0 }} transition={{ ...transition, delay: .18 + i * .15 }}><h3>{note.from}</h3>{note.body.map((p) => <p key={p}>{p}</p>)}<span>—</span></motion.article>)}</div>
      </section>
    );
  }

  return (
    <section className="chapter final-section" aria-labelledby="final-title" data-index={index}>
      <div className="daylight" aria-hidden="true" />
      <Reveal active={active} className="final-copy"><Label>{chapter.label}</Label><h2 id="final-title">{chapter.title}</h2><p className="final-statement">{chapter.statement}</p><p className="final-reveal">{chapter.reveal}</p><p className="closing">{chapter.closing}</p><p className="hand-note">{chapter.note}</p></Reveal>
      <footer><Brand /><span>{anniversary.brand.tagline}</span></footer>
    </section>
  );
}

export function AnniversaryPage() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const deckRef = useRef<HTMLDivElement>(null);
  const count = anniversary.chapters.length;

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(count - 1, next));
    const deck = deckRef.current;
    if (!deck) return;
    const targetSection = deck.querySelector(`[data-index="${clamped}"]`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  }, [count, reducedMotion]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const sections = deck.querySelectorAll<HTMLElement>(".chapter");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index") ?? "0");
            setActive(idx);
          }
        }
      },
      { root: deck, threshold: 0.55 }
    );

    sections.forEach((sec) => observer.observe(sec));

    const onKey = (event: KeyboardEvent) => {
      const map: Record<string, number> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 };
      if (event.key in map) {
        event.preventDefault();
        goTo(active + map[event.key]);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(count - 1);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [active, count, goTo]);

  return (
    <main className="anniversary-shell">
      <header className="site-header">
        <Brand />
        <span className="header-kicker">One Year Together</span>
      </header>
      <div ref={deckRef} className="deck">
        {anniversary.chapters.map((chapter, index) => (
          <ChapterView
            key={chapter.id}
            chapter={chapter}
            index={index}
            active={active === index}
          />
        ))}
      </div>
      <nav className="progress-nav" aria-label="Anniversary chapters">
        <span className="progress-count">
          {String(active + 1).padStart(2, "0")}{" "}
          <em>/ {String(count).padStart(2, "0")}</em>
        </span>
        <div className="progress-dots">
          {anniversary.chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              className={index === active ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`Go to chapter ${index + 1}: ${chapter.label}`}
              aria-current={index === active ? "step" : undefined}
            >
              <i />
            </button>
          ))}
        </div>
      </nav>
      <p className="scroll-cue" aria-hidden="true">
        Scroll to continue <span>↓</span>
      </p>
    </main>
  );
}
