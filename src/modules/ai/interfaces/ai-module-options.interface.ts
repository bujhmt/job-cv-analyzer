import { GenerateContentRequest } from '@google-cloud/vertexai';

export interface AIModuleOptions extends Omit<GenerateContentRequest, 'contents'> {
    endpoint: string;
    authKey: string;
    role?: string;
}
