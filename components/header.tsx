"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Locale, navigation, tr, copy, t } from "@/data/site";
import { Logo } from "./ui";
export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 16);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          toggle.current,
          ...Array.from(menu.current?.querySelectorAll<HTMLElement>("a") || []),
        ].filter(Boolean) as HTMLElement[];
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const other = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link
          href={`/${locale}`}
          aria-label={tr(locale, "AW-RE Tech — home", "أوري تك — الرئيسية")}
          onClick={() => setOpen(false)}
        >
          <Logo priority />
        </Link>
        <nav
          className="desktop-nav"
          aria-label={tr(locale, "Main navigation", "التنقل الرئيسي")}
        >
          {navigation.map(([url, en, ar]) => (
            <Link
              key={url}
              href={`/${locale}${url}`}
              aria-current={
                pathname === `/${locale}${url}` ? "page" : undefined
              }
            >
              {tr(locale, en, ar)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href={switchHref}
            className="language-switch"
            hrefLang={other}
            lang={other}
            aria-label={tr(locale, "Switch to Arabic", "Switch to English")}
          >
            <Globe size={16} />
            <span>{locale === "en" ? "EN" : "AR"}</span>
            <ChevronDown size={12} />
          </Link>
          <Link href={`/${locale}/contact`} className="button header-cta">
            {t(locale, copy.start)}
            <ArrowRight size={16} className="direction-arrow" />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={tr(
              locale,
              open ? "Close menu" : "Open menu",
              open ? "إغلاق القائمة" : "فتح القائمة",
            )}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          ref={menu}
          id="mobile-nav"
          className="mobile-nav"
          aria-label={tr(locale, "Mobile navigation", "قائمة الجوال")}
        >
          {navigation.map(([url, en, ar], i) => (
            <Link
              key={url}
              href={`/${locale}${url}`}
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {tr(locale, en, ar)}
              <ArrowRight size={20} className="direction-arrow" />
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="button"
            onClick={() => setOpen(false)}
          >
            {t(locale, copy.start)}
            <ArrowRight size={17} />
          </Link>
        </nav>
      )}
    </header>
  );
}
