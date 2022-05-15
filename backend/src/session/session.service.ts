import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from 'src/schemas/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private model: Model<SessionDocument>,
  ) {}

  async create(token: string, id: string): Promise<Session> {
    const data = await this.model.findOne({ id });
    console.log(data);
    if (!data) return this.model.create({ token, id });
    else {
      return data.update({ token });
    }
  }

  async delete(token: string) {
    return this.model.deleteMany({
      token,
    });
  }

  async findOne(token: string) {
    return this.model.findOne({ token });
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const data = Buffer.from(base64, 'base64')
      .toString()
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('');

    const jsonPayload = decodeURIComponent(data);

    return JSON.parse(jsonPayload);
  }
}
