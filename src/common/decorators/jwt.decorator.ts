import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JWT = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    return context.req.headers.authorization;
  },
);
