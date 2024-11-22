import { Module, UnprocessableEntityException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { JobCvAnalyzerController } from './controllers';
import { PdfModule } from '../pdf/pdf.module';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [
        AIModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                endpoint: configService.get('AI_ENDPOINT'),
                authKey: configService.get('AI_AUTH_KEY'),
                generationConfig: {
                    responseMimeType: 'application/json',
                },
            }),
        }),
        MulterModule.register({
            fileFilter: (_, file, cb) => {
                if (file.mimetype !== 'application/pdf') {
                    return cb(new UnprocessableEntityException('Only .pdf files are allowed!'), false);
                }

                cb(null, true);
            },
            limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
        }),
        PdfModule,
    ],
    controllers: [JobCvAnalyzerController],
})
export class JobCvAnalyzeModule {}
