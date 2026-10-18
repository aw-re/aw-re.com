import { NextResponse } from "next/server";
import { validateContact, buildEmail } from "@/lib/contact";
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers });
export async function POST(request: Request) {
  let body: unknown;
  try {
    if (!request.headers.get("content-type")?.includes("application/json"))
      return json(415, { ok: false, code: "content_type" });
    if (Number(request.headers.get("content-length")) > 12288)
      return json(413, { ok: false, code: "too_large" });
    const reader = request.body?.getReader();
    if (!reader) return json(400, { ok: false, code: "invalid_body" });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12288) {
        await reader.cancel();
        return json(413, { ok: false, code: "too_large" });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json(400, { ok: false, code: "invalid_body" });
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return json(400, { ok: false, code: "invalid_body" });
  const { data, errors } = validateContact(body);
  if (data.website) return json(200, { ok: true });
  if (Object.keys(errors).length)
    return json(422, { ok: false, code: "validation", errors });
  const apiKey = process.env.RESEND_API_KEY,
    to = process.env.CONTACT_TO_EMAIL,
    from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from)
    return json(503, { ok: false, code: "not_configured" });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...buildEmail(data, process.env.CONTACT_SUBJECT_PREFIX),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error("Contact delivery failed with status", response.status);
      return json(502, { ok: false, code: "delivery_failed" });
    }
    return json(200, { ok: true });
  } catch {
    console.error("Contact delivery unavailable");
    return json(502, { ok: false, code: "delivery_failed" });
  }
}
export function GET() {
  return json(405, { ok: false, code: "method_not_allowed" });
}
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { Allow: "POST, OPTIONS" },
  });
}
