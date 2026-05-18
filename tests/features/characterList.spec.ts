import { test, expect } from "@playwright/test";
import { get } from "node:http";
import { getToken } from "../client/token-client";

test.describe.serial("Character flow validation", () => {
  let token = "";
  let charID = 0;

  test.beforeAll(async ({ request }) => {
    const tokenResponse = await getToken(request);

    expect(tokenResponse.status()).toBe(200);
    const responseBody = await tokenResponse.json();
    token = responseBody.token;
  });

  test("Character List", async ({ request }) => {
    const charactersResponse = await request.get("/api/characters", {
      headers: { Authorization: "Bearer " + token },
    });

    expect(charactersResponse.status()).toBe(200);
    const characterResponseBody = await charactersResponse.json();
    expect(characterResponseBody[18].id).toBe(2016);
    expect(characterResponseBody[18].name).toBe(
      "Daniela Fighter 1776714869652",
    );
    expect(characterResponseBody[18].level).toBe(1);
    expect(characterResponseBody[18].status).toBe("complete");
    charID = characterResponseBody[18].id;
  });

  test("Character by ID", async ({ request }) => {
    const charactersIDResponse = await request.get("/api/characters/" + charID);
    expect(charactersIDResponse.status()).toBe(200);
  });
});
