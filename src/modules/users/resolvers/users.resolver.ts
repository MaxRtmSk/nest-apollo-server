import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { RegisterInput } from '../dto/register.input';

class User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async jwt(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return await this.usersService.login(email, password);
  }

  @Mutation(() => User)
  async register(@Args() args: RegisterInput): Promise<any> {
    return this.usersService.register(args);
  }
}
