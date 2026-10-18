import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, buildEmail } from "../lib/contact.ts";
const valid = {
  name: "Test User",
  email: "test@example.com",
  organization: "A real company",
  projectType: "software",
  message: "We need a reporting system.",
};
test("organization is legitimate data, not a spam trap", () => {
  const { data, errors } = validateContact(valid);
  assert.deepEqual(errors, {});
  assert.equal(data.organization, "A real company");
  assert.equal(data.website, "");
});
test("required fields and invalid project types are rejected", () => {
  const { errors } = validateContact({
    ...valid,
    name: "A",
    email: "broken",
    projectType: "unknown",
    message: "short",
  });
  assert.deepEqual(Object.keys(errors), [
    "name",
    "email",
    "projectType",
    "message",
  ]);
});
test("malformed inputs cannot bypass validation", () => {
  for (const value of [null, [], false, 42, "text"])
    assert.equal(Object.keys(validateContact(value).errors).length, 4);
});
test("email fields strip newlines and message is bounded", () => {
  const { data } = validateContact({
    ...valid,
    name: "Test\r\nBcc: other@example.com",
    message: "x".repeat(5000),
  });
  assert(!data.name.includes("\n"));
  assert.equal(data.message.length, 4000);
});
test("all enquiry details are included in the email payload", () => {
  const { data } = validateContact({
    ...valid,
    phone: "+967123456789",
    budget: "2500-10000",
  });
  const mail = buildEmail(data);
  assert.equal(mail.reply_to, valid.email);
  for (const item of [
    "A real company",
    "+967123456789",
    "software",
    "2500-10000",
    valid.message,
  ])
    assert(mail.text.includes(item));
  assert(!("html" in mail));
});
