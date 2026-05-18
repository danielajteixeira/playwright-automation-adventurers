import { APIRequestContext } from "@playwright/test";

export async function getToken(request: APIRequestContext) {
  console.log("USER", process.env.API_USERNAME);
  console.log("PASS", process.env.API_PASSWORD);
  const response = await request.post("/api/auth/token", {
    data: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
    },
  });
  const responseToken = await response.json();

  return responseToken.token;
}
