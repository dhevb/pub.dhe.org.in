import { NextResponse } from "next/server";
import {
  getAnnouncements,
  getCmsFaqs,
  getNewsItems,
  getSiteSettings,
} from "@/lib/cms";

export async function GET() {
  return NextResponse.json({
    site: getSiteSettings(),
    announcements: getAnnouncements(),
    news: getNewsItems(),
    faqs: getCmsFaqs(),
  });
}
