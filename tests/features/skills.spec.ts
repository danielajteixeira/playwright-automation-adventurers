import { test, expect } from '@playwright/test';

test('Validate STR attribute', async ({ request }) => {
  const response = await request.get(
    'https://adventurers-guild-api.vercel.app/api/skills',
  );

  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();

  return console.log(responseBody);
});