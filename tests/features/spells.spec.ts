import { test, expect } from "@playwright/test";

test("Get Spell Options", async ({ request }) => {
  const response = await request.get(
    `https://adventurers-guild-api.vercel.app/api/spells`,
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
});
