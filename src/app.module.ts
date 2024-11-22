import { Module } from '@nestjs/common';
import { JobCvAnalyzeModule } from './modules/job-cv-analyze/job-cv-analyze.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([
            { limit: 20, ttl: 60 * 1000 },
            { limit: 300, ttl: 60 * 60 * 1000 },
        ]),
        JobCvAnalyzeModule,
    ],
})
export class AppModule {
}
