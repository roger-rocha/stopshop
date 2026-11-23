import assert from "node:assert/strict";
import { test } from "node:test";
import { brandLogosSchema, defaultBrandLogos, MAX_BRAND_LOGOS } from "../src/lib/brand-logos";
import { aboutHeroSchema } from "../src/lib/validators";

test("default brand logos are the current strip and pass validation", () => {
  assert.ok(defaultBrandLogos.length > 0);
  assert.equal(defaultBrandLogos[0]?.name, "McDonald's");
  assert.equal(brandLogosSchema.safeParse(defaultBrandLogos).success, true);
});

test("brand logos accept uploads and keep the given order", () => {
  const parsed = brandLogosSchema.parse([
    { name: " Wepink ", logo: "https://x.public.blob.vercel-storage.com/brands/wepink.png" },
    { name: "Hering", logo: "/logos/hering.png" },
  ]);
  assert.deepEqual(parsed.map((brand) => brand.name), ["Wepink", "Hering"]);
});

test("brand logos reject missing names, foreign paths and too many items", () => {
  assert.equal(brandLogosSchema.safeParse([{ name: "", logo: "/logos/a.png" }]).success, false);
  assert.equal(brandLogosSchema.safeParse([{ name: "A", logo: "javascript:alert(1)" }]).success, false);
  assert.equal(brandLogosSchema.safeParse([{ name: "A", logo: "http://insecure.example/a.png" }]).success, false);
  const many = Array.from({ length: MAX_BRAND_LOGOS + 1 }, (_, i) => ({ name: `M${i}`, logo: "/logos/a.png" }));
  assert.equal(brandLogosSchema.safeParse(many).success, false);
  assert.equal(brandLogosSchema.safeParse([]).success, true);
});

test("about hero requires an image and a description", () => {
  assert.equal(aboutHeroSchema.safeParse({ image: "", alt: "Fachada", caption: "" }).success, false);
  assert.equal(aboutHeroSchema.safeParse({ image: "/images/a.png", alt: "", caption: "" }).success, false);
  const ok = aboutHeroSchema.parse({ image: "https://x/y.png", alt: "Fachada do shopping" });
  assert.equal(ok.caption, "");
});
