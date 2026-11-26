import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContactEmail, parseContactForm } from "../src/lib/contact-form";

const valid = {
  name: "  Maria Souza ",
  email: " maria@example.com ",
  phone: " (47) 99999-0000 ",
  department: "marketing",
  message: "  Olá!\nGostaria de saber sobre eventos.  ",
  terms: "on",
};

test("valid submissions are trimmed and keep the chosen department", () => {
  const result = parseContactForm(valid);
  assert.ok(result.success);
  assert.deepEqual(result.data, {
    name: "Maria Souza",
    email: "maria@example.com",
    phone: "(47) 99999-0000",
    department: "marketing",
    message: "Olá!\nGostaria de saber sobre eventos.",
    terms: "on",
  });
});

test("phone and department are optional", () => {
  const result = parseContactForm({ ...valid, phone: "", department: "" });
  assert.ok(result.success);
  assert.equal(result.data.phone, "");
  assert.equal(result.data.department, undefined);
});

test("missing required fields, bad e-mail, unknown department or unaccepted terms are rejected", () => {
  const cases: Array<[Record<string, unknown>, string]> = [
    [{ ...valid, name: "   " }, "Informe seu nome."],
    [{ ...valid, email: "nao-e-email" }, "Informe um e-mail válido."],
    [{ ...valid, message: "" }, "Escreva sua mensagem."],
    [{ ...valid, terms: undefined }, "Aceite os termos e a política de privacidade."],
  ];
  for (const [input, message] of cases) {
    const result = parseContactForm(input);
    assert.equal(result.success, false);
    if (!result.success) assert.equal(result.message, message);
  }
  assert.equal(parseContactForm({ ...valid, department: "diretoria" }).success, false);
});

test("the e-mail escapes visitor input, replies to the visitor and keeps the subject on one line", () => {
  const result = parseContactForm({
    ...valid,
    name: "Eve\r\nBcc: x@example.com <script>",
    message: "<img src=x onerror=alert(1)> & tchau",
  });
  assert.ok(result.success);
  const email = buildContactEmail(result.data);
  assert.equal(email.replyTo, "maria@example.com");
  assert.ok(!/[\r\n]/.test(email.subject));
  assert.match(email.subject, /\(Marketing\)$/);
  assert.ok(!email.html.includes("<script>"));
  assert.ok(!email.html.includes("<img"));
  assert.ok(email.html.includes("&lt;img src=x onerror=alert(1)&gt; &amp; tchau"));
  assert.ok(email.text.includes("Departamento: Marketing"));
  assert.ok(email.text.includes("<img src=x onerror=alert(1)> & tchau"));
});
