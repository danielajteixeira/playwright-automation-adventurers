import { expect, request, test} from '@playwright/test';
import { getToken } from '../client/token-client';
import { FIGHTER_CHAR } from '../data/create-character-data';
import { createCharacter } from '../client/character-client';

let token = '';

test.describe.serial('Create Daniela The Fighter',() => {
    test.beforeAll(async ({ request }) => {
        token = await getToken(request);

        expect(token).not.toBeNull();
    });

    test('Create Character Draft', async ({ request }) => {
    const characterResponse = await createCharacter(
        request,
        token,
        FIGHTER_CHAR
    );
    const character = await characterResponse.json();
    console.log(characterResponse);
});
});