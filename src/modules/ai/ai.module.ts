import { Module } from '@nestjs/common';
import { AIConfigurableModuleClass } from './ai.module-definition';
import { HttpModule } from '@nestjs/axios';
import { AIService } from './services';

@Module({
    imports: [HttpModule],
    providers: [AIService],
    exports: [AIService],
})
export class AIModule extends AIConfigurableModuleClass {
}
