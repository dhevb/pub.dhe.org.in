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

function StatCard({
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
  const Icon = ICONS[icon];
  const display = value >= 1000 ? `${(value / 1000).toFixed(0)}K` : String(value);

  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-saffron/20 text-saffron">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/80">{label}</p>
    </div>
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
            <StatCard
              key={stat.label}
              {...stat}
              icon={stat.icon as keyof typeof ICONS}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
