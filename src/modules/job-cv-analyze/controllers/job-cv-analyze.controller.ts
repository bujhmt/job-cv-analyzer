import { BadRequestException, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AnalyzeJobCvDto } from '../dto';
import { PdfService } from '../../pdf/services';
import { AIService } from '../../ai/services';

@ApiTags('Job-CV Analyzer')
@Controller('/analyze')
export class JobCvAnalyzerController {
    constructor(
        private readonly pdfService: PdfService,
        private readonly aiService: AIService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upload Job Description and CV PDFs' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: AnalyzeJobCvDto })
    @ApiResponse({ status: 200, description: 'Analysis completed successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @ApiResponse({ status: 422, description: 'Invalid file type or size.' })
    @ApiResponse({ status: 429, description: 'Too many requests.' })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'job' }, { name: 'cv' }]))
    async analyze(@UploadedFiles() files: AnalyzeJobCvDto) {
        const { job: jobFiles, cv: cvFiles } = files;

        if (jobFiles.length !== 1 || cvFiles.length !== 1) {
            throw new BadRequestException('Invalid number of files uploaded.');
        }

        const [jobFile] = jobFiles;
        const [cvFile] = cvFiles;

        const [jobDescription, cvContent] = await Promise.all([
            this.pdfService.parsePdfFromBuffer(jobFile.buffer),
            this.pdfService.parsePdfFromBuffer(cvFile.buffer),
        ]);

        const response = await this.aiService.generateAIResponseFromText(
            jobDescription,
            cvContent,
            `
                Analyze the following job description and CV. 
                Identify the candidate's strengths and weaknesses, and evaluate how well they align with the job description.
                Rank the cadidate relevance to the job using float number from 0 to 1.
                As a result, return a JSON object with the following fields:
                - relevance: float number from 0 to 1
                - strengths: list of strings
                - weaknesses: list of strings
                - notes: list of strings
            `,
        );

        return JSON.parse(response);
    }
}
