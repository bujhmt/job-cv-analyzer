import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeJobCvDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Job description PDF file',
    })
    job: Express.Multer.File[];

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'CV PDF file',
    })
    cv: Express.Multer.File[];
}
