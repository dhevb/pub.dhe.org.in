import { WHY_PUBLISH } from "@/lib/content/homepage";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import {
  Clock,
  Flag,
  Globe,
  Layers,
  Search,
  Wallet,
} from "lucide-react";

const ICONS = {
  globe: Globe,
  wallet: Wallet,
  clock: Clock,
  search: Search,
  layers: Layers,
  flag: Flag,
} as const;

export function WhyPublishSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="why-publish-heading">
      <div className="container-wide">
        <h2 id="why-publish-heading" className="heading-section mb-12 text-center">
          Why Publish With Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PUBLISH.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Globe;
            return (
              <Card key={item.title} className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="mb-2 text-lg">{item.title}</CardTitle>
                <CardContent>{item.description}</CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
