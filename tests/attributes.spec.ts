import { test, expect } from '@playwright/test';

test('Validate STR attribute', async ({ request }) => {
  const response = await request.get(
    'https://adventurers-guild-api.vercel.app/api/attributes',
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody[0].id).toBe(1);
  expect(responseBody[0].name).toBe('Strength');
  expect(responseBody[0].shortname).toBe('STR');
  expect(responseBody[0].description).toBe(
    'Measures physical power, carrying capacity, and effectiveness in brute-force actions such as lifting, pushing, and melee attacks.',
  );
  expect(responseBody[0].skills[0]).toBe('Athletics');
});

test('Validate DEX attribute', async ({ request }) => {
  const response = await request.get(
    'https://adventurers-guild-api.vercel.app/api/attributes',
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody[1].id).toBe(2);
  expect(responseBody[1].name).toBe('Dexterity');
  expect(responseBody[1].shortname).toBe('DEX');
  expect(responseBody[1].description).toBe(
    'Measures agility, reflexes, balance, and coordination. It affects actions that require speed, precision, and stealth.',
  );
  expect(responseBody[1].skills[0]).toBe('Acrobatics');
  expect(responseBody[1].skills[1]).toBe('Sleight of Hand');
  expect(responseBody[1].skills[2]).toBe('Stealth');
});