import { expect, request, test } from "@playwright/test";
import { getToken } from "../client/token-client";
import { createCharacter } from "../client/character-client";
import {
  RANGER_ATTRIBUTES,
  RANGER_BACKGROUND_EQUIPMENT,
  RANGER_CHAR,
  RANGER_EQUIPMENT,
  RANGER_SKILLS,
} from "../data/create-character-data";

let token = "";
let characterId = "";

test.describe.serial("Create Sylvara The Ranger", () => {
  test.beforeAll(async ({ request }) => {
    token = await getToken(request);

    expect(token).not.toBeNull();
  });

  test("Create Character Draft", async ({ request }) => {
    const characterResponse = await createCharacter(
      request,
      token,
      RANGER_CHAR,
    );
    const character = await characterResponse.json();
    characterId = character.id;
    console.log(characterResponse);

    expect(characterResponse.status()).toBe(201);
    expect(character.name).toBe(RANGER_CHAR.name);
    expect(character.classId).toBe(RANGER_CHAR.classId);
    expect(character.speciesId).toBe(RANGER_CHAR.speciesId);
    expect(character.backgroundId).toBe(RANGER_CHAR.backgroundId);
  });

  test("Add attributes to Character Draft", async ({ request }) => {
    const response = await request.patch(`/api/characters/${characterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: RANGER_ATTRIBUTES,
    });

    expect(response.status()).toBe(200);
    const updatedCharacter = await response.json();
    expect(updatedCharacter.abilityScores.final.STR).toEqual(10);
    expect(updatedCharacter.abilityScores.final.DEX).toEqual(17);
    expect(updatedCharacter.abilityScores.final.CON).toEqual(12);
    expect(updatedCharacter.abilityScores.final.INT).toEqual(10);
    expect(updatedCharacter.abilityScores.final.WIS).toEqual(15);
    expect(updatedCharacter.abilityScores.final.CHA).toEqual(10);
  });

  test("Add skills to the Character", async ({ request }) => {
    const skillsResponse = await request.patch(
      `/api/characters/${characterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: RANGER_SKILLS,
      },
    );
    expect(skillsResponse.status()).toBe(200);
    const updatedCharacter = await skillsResponse.json();
    expect(updatedCharacter.skillProficiencies).toEqual(
      expect.arrayContaining(RANGER_SKILLS.skillProficiencies),
    );
  });

  test("Add class equipment to the Character", async ({ request }) => {
    const equipmentResponse = await request.post(
      `/api/characters/${characterId}/equipment/class-choice`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: RANGER_EQUIPMENT,
      },
    );
    expect(equipmentResponse.status()).toBe(200);
  });

  test("Add background equipment to the Character", async ({ request }) => {
    const backgroundEquipmentResponse = await request.post(
      `/api/characters/${characterId}/equipment/background-choice`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: RANGER_BACKGROUND_EQUIPMENT,
      },
    );

    expect(backgroundEquipmentResponse.status()).toBe(200);
    const backgroundEquipment = await backgroundEquipmentResponse.json();
  });

  test("Spell Options", async ({ request }) => {
    const spelloptions = await request.get(
      `/api/characters/${characterId}/spell-options`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  });

  test("Spell Selection", async ({ request }) => {
    const spellselection = await request.get(
      `/api/characters/${characterId}/spell-selection`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  });

  test("Character Spells", async ({ request }) => {
    const spellsresponse = await request.put(
      `/api/characters/${characterId}/spells`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          spellIds: [89, 92],
        },
      },
    );
  });
});
