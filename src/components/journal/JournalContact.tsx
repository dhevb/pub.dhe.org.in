import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/Card";

export function JournalContact() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="heading-section mb-4">Contact Editorial Office</h1>
        <p className="text-text-muted">
          Reach the publications team for submissions, indexing, partnerships, and
          support.
        </p>
      </header>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-5 w-5 text-primary" aria-hidden />
            <div>
              <h2 className="font-semibold text-text">Email</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 text-primary" aria-hidden />
            <div>
              <h2 className="font-semibold text-text">Address</h2>
              <p className="text-text-muted">
                Publications and Promotions Cell
                <br />
                Department of Holistic Education
                <br />
                Plot No. 1, Sector-71, SAS Nagar-160071
                <br />
                AMCF-132, Arya Nagar, Ballabgarh, Faridabad, 121004, Haryana
              </p>
            </div>
          </div>
          <p className="border-t border-border pt-4 text-sm text-text-muted">
            Publisher: {siteConfig.publisher}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
