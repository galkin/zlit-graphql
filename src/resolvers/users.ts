import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';

import { User } from '~/entities/user';

@Resolver(() => User)
export class UsersResolver {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.repository.find({});
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') userId: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { id: userId } });
  }

  @FieldResolver(() => [User])
  async friends(@Root() root: User): Promise<User[]> {
    return root.friends;
  }
}
