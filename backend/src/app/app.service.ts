import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ok(): HttpStatus {
    return HttpStatus.OK;
  }
}
