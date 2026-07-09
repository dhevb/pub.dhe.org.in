"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATISTICS } from "@/lib/content/homepage";
import {
  BookOpen,
  Building2,
  Download,
  Globe,
  GraduationCap,
  Users,
} from "lucide-react";

const ICONS = {
  articles: BookOpen,
  globe: Globe,
  authors: Users,
  institutions: Building2,
  downloads: Download,
  conferences: GraduationCap,
} as const;

function AnimatedStat({
  value,
  suffix,
  label,
  icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: keyof typeof ICONS;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const Icon = ICONS[icon];

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  const display =
    value >= 1000 ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}K` : count;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/20 text-saffron">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding bg-navy text-white" aria-labelledby="stats-heading">
      <div className="container-wide">
        <h2 id="stats-heading" className="heading-section mb-12 text-center text-white">
          Research Impact
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STATISTICS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} icon={stat.icon as keyof typeof ICONS} />
          ))}
        </div>
      </div>
    </section>
  );
}
