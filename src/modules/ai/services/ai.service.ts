import { Inject, Injectable } from '@nestjs/common';
import { AI_MODULE_OPTIONS_TOKEN } from '../ai.module-definition';
import { AIModuleOptions } from '../interfaces';
import { GenerateContentRequest, GenerateContentResponse } from '@google-cloud/vertexai';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AIService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(AI_MODULE_OPTIONS_TOKEN) private readonly options: AIModuleOptions,
    ) {}

    public async generateAIResponseFromText(...promts: string[]): Promise<string> {
        const { endpoint, authKey, role = 'user', ...options } = this.options;

        const request: GenerateContentRequest = {
            contents: [{ role, parts: promts.map((text) => ({ text })) }],
            ...options,
        };

        const answer = await this.httpService.axiosRef.post<GenerateContentResponse>(endpoint, request, {
            headers: { Authorization: authKey },
        });

        const { data } = answer;

        if (!data.candidates.length) {
            throw new Error('No answer candidates from AI');
        }

        const [firstCandidate] = data.candidates;
        const { content } = firstCandidate;
        const [firstPart] = content.parts;

        return firstPart.text;
    }
}
