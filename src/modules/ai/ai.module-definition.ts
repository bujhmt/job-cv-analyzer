import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AIModuleOptions } from './interfaces';

export const { 
    ConfigurableModuleClass: AIConfigurableModuleClass, 
    MODULE_OPTIONS_TOKEN: AI_MODULE_OPTIONS_TOKEN 
} = new ConfigurableModuleBuilder<AIModuleOptions>()
    .setClassMethodName('register')
    .build();
