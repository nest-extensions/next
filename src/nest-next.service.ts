import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NestNextOptionsInterface } from './nest-next-options.interface';
import { NestNextOptionsSymbol } from './nest-next-options.symbol';

@Injectable()
export class NestNextService implements OnModuleInit {
	private server: ReturnType<typeof next> = next({ dir: this.config.buildDir });
	private logger = new Logger(NestNextService.name);

	constructor(
		@Inject(NestNextOptionsSymbol) private config: NestNextOptionsInterface
	) {}

	async onModuleInit(): Promise<void> {
		try {
			await this.server.prepare();
		} catch (error) {
			this.logger.error(error);
		}
	}
	getNextServer(): ReturnType<typeof next> {
		return this.server;
	}

	getNextServerHandle() {
		return this.getNextServer().getRequestHandler();
	}
}
