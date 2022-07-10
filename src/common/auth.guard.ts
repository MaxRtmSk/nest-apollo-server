import axios from 'axios';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class VerifyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;
    const url = `${process.env.USERS_URL}/verify`;

    try {
      await axios.post(
        url,
        {},
        {
          headers: { Authorization: token },
        },
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
