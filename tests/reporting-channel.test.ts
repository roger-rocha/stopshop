import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReportingChannelsCard } from "../src/components/pages/ReportingChannelsCard";
import {
  DEFAULT_REPORTING_CHANNEL,
  parseReportingChannelConfig,
  reportingChannelSchema,
} from "../src/lib/reporting-channel";

test("edits preserve paragraphs and situation order while trimming destination fields", () => {
  const config = reportingChannelSchema.parse({
    ...DEFAULT_REPORTING_CHANNEL,
    title: "  Respeito no shopping  ",
    introduction: "  Primeiro parágrafo.\n\nSegundo parágrafo.  ",
    situations: "  Primeira situação  \r\n\r\nSegunda situação\n  ",
    email: "  relatos@example.com  ",
    formUrl: "  https://forms.example.com/relatos?origem=site  ",
  });
  assert.equal(config.title, "Respeito no shopping");
  assert.equal(config.introduction, "Primeiro parágrafo.\n\nSegundo parágrafo.");
  assert.deepEqual(config.situations, ["Primeira situação", "Segunda situação"]);
  assert.equal(config.email, "relatos@example.com");
  assert.equal(config.formUrl, "https://forms.example.com/relatos?origem=site");
  assert.deepEqual(parseReportingChannelConfig(JSON.stringify(config)), config);
});

test("unconfigured and malformed settings never direct reports to another organization", () => {
  for (const value of [undefined, null, "", "{bad-json", "null", "[]", "{}", JSON.stringify({ ...DEFAULT_REPORTING_CHANNEL, formUrl: "javascript:alert(1)" })]) {
    const config = parseReportingChannelConfig(value);
    assert.equal(config.email, "");
    assert.equal(config.formUrl, "");
    const html = renderToStaticMarkup(createElement(ReportingChannelsCard, { config }));
    assert.match(html, /ainda não estão disponíveis/);
    assert.doesNotMatch(html, /href=|<form|<button|Denúncia registrada/);
  }
});

test("email and external form can be configured together or independently", () => {
  for (const [email, formUrl] of [
    ["relatos@example.com", "https://forms.example.com/relatos"],
    ["relatos@example.com", ""],
    ["", "https://forms.example.com/relatos"],
  ]) {
    const config = reportingChannelSchema.parse({ ...DEFAULT_REPORTING_CHANNEL, email, formUrl });
    const html = renderToStaticMarkup(createElement(ReportingChannelsCard, { config }));
    assert.equal(html.includes('href="mailto:relatos@example.com"'), Boolean(email));
    assert.equal(html.includes('href="https://forms.example.com/relatos"'), Boolean(formUrl));
    if (formUrl) assert.match(html, /target="_blank" rel="noopener noreferrer"/);
    assert.doesNotMatch(html, /ainda não estão disponíveis|<form|<button|Denúncia registrada/);
  }
});

test("clearing both destinations is supported and public copy is safely escaped", () => {
  const config = reportingChannelSchema.parse({ ...DEFAULT_REPORTING_CHANNEL, email: "  ", formUrl: "  ", channelsTitle: '<script>alert("test")</script>' });
  assert.equal(config.email, "");
  assert.equal(config.formUrl, "");
  const html = renderToStaticMarkup(createElement(ReportingChannelsCard, { config }));
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("unsafe and ambiguous external destinations are rejected", () => {
  for (const formUrl of [
    "javascript:alert(1)", "data:text/html,example", "//forms.example.com/relatos",
    "/formulario", "http://forms.example.com/relatos", "https:forms.example.com/relatos",
    "https://user:password@forms.example.com/relatos", "https://",
    "https://forms.example.com\\@example.com/relatos",
    "https://forms.example.com/\nrelatos", "https://forms.example.com/\0relatos",
  ]) {
    assert.equal(reportingChannelSchema.safeParse({ ...DEFAULT_REPORTING_CHANNEL, formUrl }).success, false, formUrl);
  }
});

test("invalid email addresses and mailto header injection are rejected", () => {
  for (const email of [
    "invalid-address", "a@example.com?bcc=another@example.com",
    "a@example.com\r\nBcc: another@example.com", "a?subject=test@example.com",
    "a#fragment@example.com", "a&bcc@example.com",
  ]) {
    assert.equal(reportingChannelSchema.safeParse({ ...DEFAULT_REPORTING_CHANNEL, email }).success, false, email);
  }
});

test("required copy and list size are validated on the server", () => {
  for (const edit of [
    { title: "  " }, { introduction: "\n " }, { situations: "\n \n" },
    { situations: Array.from({ length: 21 }, () => "Situação") },
    { complianceText: "a".repeat(5001) }, { formButtonLabel: "a".repeat(201) },
    { metaDescription: "a".repeat(501) },
  ]) {
    assert.equal(reportingChannelSchema.safeParse({ ...DEFAULT_REPORTING_CHANNEL, ...edit }).success, false);
  }
});
