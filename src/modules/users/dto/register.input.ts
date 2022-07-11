import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field({ nullable: true, defaultValue: null })
  firstName?: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  favouriteArtistIds: string[] | null;
}
