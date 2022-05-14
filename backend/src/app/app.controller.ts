import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private service: AppService) {}

  @Get()
  returnOk(): HttpStatus {
    return this.service.ok();
  }
}
