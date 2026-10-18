import { notFound } from "next/navigation";
import { Locale } from "@/data/site";
export async function getLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();
  return locale;
}
