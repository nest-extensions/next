import { DynamicModule, Module } from '@nestjs/common';
import { NestNextService } from './nest-next.service';
import { NestNextController } from './nest-next.controller';
import { NestNextOptionsInterface } from './nest-next-options.interface';
import { NestNextOptionsSymbol } from './nest-next-options.symbol';

@Module({})
export class NestNextModule {
	static register(config: NestNextOptionsInterface): DynamicModule {
		const module: DynamicModule = {
			module: NestNextModule,
			providers: [
				{ provide: NestNextOptionsSymbol, useValue: config },
				NestNextService,
			],
			exports: [NestNextService],
		};

		if (!config.disableController) {
			module.controllers = [NestNextController];
		}

		return module;
	}
}
