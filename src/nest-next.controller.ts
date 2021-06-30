import { Controller, Get, Req, Res } from '@nestjs/common';
import { NestNextService } from './nest-next.service';
import { Request, Response } from 'express';

@Controller('')
export class NestNextController {
	constructor(private viewService: NestNextService) {}

	@Get('*')
	async serve(@Req() req: Request, @Res() res: Response) {
		const handle = this.viewService.getNextServerHandle();
		await handle(req, res);
	}
}
