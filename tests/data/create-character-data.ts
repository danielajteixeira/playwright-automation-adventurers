import { CreateCharacterType } from "../client/character-client";

export const FIGHTER_CHAR: CreateCharacterType = {
  name: "Daniela The Fighter",
  classId: 5,
  speciesId: 4,
  backgroundId: 8,
};

export const RANGER_CHAR: CreateCharacterType = {
  name: "Sylvara Theryniel",
  classId: 8,
  speciesId: 3,
  backgroundId: 9,
};

export const RANGER_ATTRIBUTES = {
  abilityScores: {
    base: {
      STR: 10,
      DEX: 15,
      CON: 12,
      INT: 10,
      WIS: 14,
      CHA: 10,
    },
    bonuses: {
      STR: 0,
      DEX: 2,
      CON: 0,
      INT: 0,
      WIS: 1,
      CHA: 0,
    },
  },
};

export const RANGER_SKILLS = {
  skillProficiencies: ["Athletics", "Animal Handling", "Nature"],
};
