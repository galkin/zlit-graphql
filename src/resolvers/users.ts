import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';

import { User, UserRole } from '~/entities/user';

@InputType()
export class UserFilter implements Partial<User> {
  @Field({ nullable: true }) lastName?: string;
}

@InputType()
export class NewUser implements Partial<User> {
  @Field() email: string;
  @Field({ nullable: true }) firstName?: string;
  @Field({ nullable: true }) lastName?: string;
  @Field(() => UserRole) role: UserRole;
}

@Resolver(() => User)
export class UsersResolver {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  @Query(() => [User])
  async users(@Arg('filter', { nullable: true }) userFilter: UserFilter): Promise<User[]> {
    return this.repository.find({
      where: userFilter
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') userId: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { id: userId } });
  }

  @FieldResolver(() => [User])
  async friends(@Root() root: User): Promise<User[]> {
    return root.friends;
  }

  @Mutation(() => User)
  async addUser(@Arg('user') userData: NewUser) {
    const user = this.repository.create(userData);
    await this.repository.save([user]);
    return user;
  }
}
