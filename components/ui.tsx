import Link from "next/link";
import Image from "next/image";
import wordmark from "@/public/brand/aw-re-tech.png";
import {
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  Bot,
  ChartNoAxesCombined,
  Server,
  Settings2,
  Layers3,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  MessageCircle,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Locale, tr } from "@/data/site";
const icons = {
  code: CodeXml,
  bot: Bot,
  chart: ChartNoAxesCombined,
  server: Server,
  settings: Settings2,
  layers: Layers3,
  sparkles: Sparkles,
  shield: ShieldCheck,
};
export function Icon({ name }: { name: string }) {
  const I = icons[name as keyof typeof icons] || CodeXml;
  return <I size={25} strokeWidth={1.5} />;
}
export function Logo({
  compact = false,
  priority = false,
}: {
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={`logo ${compact ? "compact" : ""}`} dir="ltr">
      <Image
        src={wordmark}
        alt="AW-RE Tech"
        className="logo-image"
        priority={priority}
        sizes="(max-width: 640px) 155px, 215px"
        quality={90}
      />
    </span>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      {children}
      <ArrowRight size={17} className="direction-arrow" />
    </Link>
  );
}
export function SectionHeader({
  number,
  label,
  title,
  description,
  action,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <div className="eyebrow">
          <span className="section-number">{number}</span>
          <i />
          {label}
        </div>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="page-hero container">
      <div className="eyebrow">
        <i />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <span className="page-hero-line" />
    </section>
  );
}
export function ContactDetails({ locale }: { locale: Locale }) {
  return (
    <address className="contact-details">
      <a href="mailto:abdulwahab@aw-re.com">
        <Mail size={17} />
        <span>abdulwahab@aw-re.com</span>
      </a>
      <a
        href="https://wa.me/967773936589"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Phone size={17} />
        <span dir="ltr">+967 773 936 589</span>
        <ArrowUpRight size={13} />
      </a>
      <a href="https://aw-re.com">
        <Globe size={17} />
        <span>aw-re.com</span>
      </a>
      <span>
        <MapPin size={17} />
        {tr(locale, "Sana’a, Yemen", "صنعاء، اليمن")}
      </span>
    </address>
  );
}
export function Socials({ locale }: { locale: Locale }) {
  return (
    <div className="socials">
      <a
        href="https://github.com/aw-re"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github size={18} />
      </a>
      <a
        href="https://wa.me/967773936589"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tr(locale, "WhatsApp", "واتساب")}
      >
        <MessageCircle size={18} />
      </a>
      <span
        className="social-placeholder"
        title={tr(locale, "LinkedIn — coming soon", "لينكدإن — قريبًا")}
      >
        <Linkedin size={18} />
      </span>
      <span
        className="social-placeholder"
        title={tr(locale, "YouTube — coming soon", "يوتيوب — قريبًا")}
      >
        <Youtube size={18} />
      </span>
    </div>
  );
}
