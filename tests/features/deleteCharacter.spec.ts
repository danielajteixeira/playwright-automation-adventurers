import { expect, request, test } from "@playwright/test";
import { getToken } from "../client/token-client";

let token = "";

test.describe.serial("Delete character 1903", () => {
  test.beforeAll(async ({ request }) => {
    token = await getToken(request);

    expect(token).not.toBeNull();

    const deleteResponse = await request.delete("/api/characters/1903", {
      headers: { Authorization: "Bearer " + token },
    });
    expect(deleteResponse.status()).toBe(204);
  });
});

test("Get characters", async ({ request }) => {
  const charactersIDResponse = await request.get("/api/characters/1903", {
    headers: { Authorization: "Bearer " + token },
  });
  expect(charactersIDResponse.status()).toBe(404); // Assuming the character is deleted and not found
});
test("Get characters list", async ({ request }) => {
  const charactersListResponse = await request.get("/api/characters", {
    headers: { Authorization: "Bearer " + token },
  });
  expect(charactersListResponse.status()).toBe(200);
});
test("Get characters list with pagination", async ({ request }) => {
  const charactersListPaginationResponse = await request.get(
    "/api/characters?page=1&limit=10",
    {
      headers: { Authorization: "Bearer " + token },
    },
  );
  expect(charactersListPaginationResponse.status()).toBe(200);
});