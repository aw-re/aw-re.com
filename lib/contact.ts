export type ContactInput = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  budget: string;
  website: string;
};
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
const clean = (v: unknown, max: number) =>
  typeof v === "string"
    ? v
        .trim()
        .replace(/[\r\n]+/g, " ")
        .slice(0, max)
    : "";
export function validateContact(input: unknown): {
  data: ContactInput;
  errors: FieldErrors;
} {
  const b =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const data: ContactInput = {
    name: clean(b.name, 80),
    organization: clean(b.organization, 160),
    email: clean(b.email, 160),
    phone: clean(b.phone, 40),
    projectType: clean(b.projectType, 80),
    message:
      typeof b.message === "string" ? b.message.trim().slice(0, 4000) : "",
    budget: clean(b.budget, 80),
    website: clean(b.website, 200),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(data.email))
    errors.email = "email";
  if (!["software", "ai", "data", "it", "other"].includes(data.projectType))
    errors.projectType = "projectType";
  if (data.message.length < 10) errors.message = "message";
  return { data, errors };
}
export function buildEmail(
  data: ContactInput,
  prefix = "New AW-RE project enquiry",
) {
  return {
    reply_to: data.email,
    subject: `${prefix}: ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Organization: ${data.organization || "Not provided"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Project type: ${data.projectType}`,
      `Budget: ${data.budget || "Not provided"}`,
      "",
      data.message,
    ].join("\n"),
  };
}
