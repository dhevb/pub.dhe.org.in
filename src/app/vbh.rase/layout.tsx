import { Providers } from "@/components/Providers";

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
