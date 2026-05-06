import { APIRequestContext } from "@playwright/test";


export type CreateCharacterType = {
    name: string;
    classId?: number;
    speciesId?: number;
    backgroundId?: number;
};


export async function createCharacter(
    request: APIRequestContext,
    token: string,
    data: CreateCharacterType,
) {

    const response = await request.post('/api/characters', {
        headers: {Authorization: 'Bearer ' + token},
        data,
    });
    console.log(await response.json());
    return response;
}