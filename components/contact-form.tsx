"use client";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Locale, services, t, tr } from "@/data/site";
import { companyContact } from "@/data/contact";
import { validateContact, FieldErrors } from "@/lib/contact";
export default function ContactForm({
  locale: l,
  initialService = "",
}: {
  locale: Locale;
  initialService?: string;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const message = (key: string) =>
    ({
      name: tr(
        l,
        "Please enter your name (at least 2 characters).",
        "أدخل اسمك (حرفان على الأقل).",
      ),
      email: tr(
        l,
        "Please enter a valid email address.",
        "أدخل بريدًا إلكترونيًا صالحًا.",
      ),
      projectType: tr(l, "Please choose a project type.", "اختر نوع المشروع."),
      message: tr(
        l,
        "Tell us a little more (at least 10 characters).",
        "أخبرنا بالمزيد عن مشروعك (10 أحرف على الأقل).",
      ),
    })[key] || "";
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const { data, errors: issues } = validateContact(raw);
    setErrors(issues);
    if (Object.keys(issues).length) {
      setState("idle");
      form.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(issues)[0]}"]`)
        ?.focus();
      return;
    }
    setState("sending");
    setStatus("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await r.json();
      if (!r.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        setState("error");
        setStatus(
          result.code === "not_configured"
            ? tr(
                l,
                `The form is temporarily unavailable. Please email ${companyContact.email} or contact us on WhatsApp.`,
                `النموذج غير متاح مؤقتًا. راسلنا على ${companyContact.email} أو تواصل عبر واتساب.`,
              )
            : tr(
                l,
                "Your message could not be sent. Please try again or contact us by email.",
                "تعذر إرسال الرسالة. حاول مجددًا أو تواصل معنا عبر البريد.",
              ),
        );
        return;
      }
      setState("success");
      setStatus(
        tr(
          l,
          "Thank you. Your project enquiry has been sent.",
          "شكرًا لك. تم إرسال استفسارك بنجاح.",
        ),
      );
      form.current?.reset();
    } catch {
      setState("error");
      setStatus(
        tr(
          l,
          "Connection interrupted. Please try again or email us directly.",
          "انقطع الاتصال. حاول مجددًا أو راسلنا مباشرة عبر البريد.",
        ),
      );
    }
  }
  const errorProps = (name: keyof FieldErrors) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <form ref={form} className="contact-form" onSubmit={submit} noValidate>
      <h2 className="form-heading">
        {tr(l, "Tell us about your project.", "حدثنا عن مشروعك.")}
      </h2>
      <p className="form-subheading">
        {tr(
          l,
          "A few details to start the conversation. * Required fields.",
          "تفاصيل بسيطة لنبدأ الحوار. * حقول مطلوبة.",
        )}
      </p>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            {tr(l, "Name", "الاسم")}
            <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder={tr(l, "Your name", "اسمك الكريم")}
            {...errorProps("name")}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {message("name")}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="organization">
            {tr(l, "Company / Organization", "الشركة / المؤسسة")}
          </label>
          <input
            id="organization"
            name="organization"
            autoComplete="organization"
            maxLength={160}
            placeholder={tr(l, "Your organization", "اسم شركتك أو مؤسستك")}
          />
        </div>
        <div className="field">
          <label htmlFor="email">
            {tr(l, "Email", "البريد الإلكتروني")}
            <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="you@company.com"
            {...errorProps("email")}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {message("email")}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="phone">
            {tr(l, "Phone (optional)", "الهاتف (اختياري)")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            maxLength={40}
            placeholder="+967 …"
          />
        </div>
        <div className="field">
          <label htmlFor="projectType">
            {tr(l, "Project Type", "نوع المشروع")}
            <span>*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={initialService}
            required
            {...errorProps("projectType")}
          >
            <option value="" disabled>
              {tr(l, "Select a service", "اختر الخدمة")}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {t(l, s.name)}
              </option>
            ))}
            <option value="other">{tr(l, "Other", "أخرى")}</option>
          </select>
          {errors.projectType && (
            <span className="field-error" id="projectType-error">
              {message("projectType")}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="budget">
            {tr(l, "Budget range (optional)", "الميزانية (اختياري)")}
          </label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">
              {tr(l, "Prefer to discuss", "أفضل مناقشتها لاحقًا")}
            </option>
            <option value="under-2500">
              {tr(l, "Under $2,500", "أقل من 2,500 دولار")}
            </option>
            <option value="2500-10000">$2,500 – $10,000</option>
            <option value="10000-plus">
              {tr(l, "$10,000+", "أكثر من 10,000 دولار")}
            </option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">
            {tr(l, "Project Description", "وصف المشروع")}
            <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            placeholder={tr(
              l,
              "What are you trying to solve? Tell us about your idea, goals, or current challenges.",
              "ما التحدي الذي ترغب في حلّه؟ حدثنا عن فكرتك وأهدافك أو الصعوبات الحالية.",
            )}
            {...errorProps("message")}
          />
          {errors.message && (
            <span className="field-error" id="message-error">
              {message("message")}
            </span>
          )}
        </div>
      </div>
      <div className="form-footer">
        <button className="button" type="submit" disabled={state === "sending"}>
          {state === "sending"
            ? tr(l, "Sending…", "جارٍ الإرسال…")
            : tr(l, "Send Project Enquiry", "أرسل استفسارك")}
          {state === "sending" ? (
            <LoaderCircle size={17} />
          ) : (
            <ArrowRight size={17} className="direction-arrow" />
          )}
        </button>
        <p>
          {tr(
            l,
            "Your details will only be used to respond to your enquiry.",
            "سنستخدم بياناتك فقط للرد على استفسارك.",
          )}
        </p>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {status && (
          <p className={`form-status ${state === "error" ? "error" : ""}`}>
            {state === "success" && (
              <CheckCircle2
                size={17}
                style={{ display: "inline", marginInlineEnd: 8 }}
              />
            )}
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
