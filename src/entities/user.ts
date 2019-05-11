import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User'
}

registerEnumType(UserRole, {
  name: 'Role',
  description: 'User role'
});

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid') @Field(() => ID) id: string;
  @Column({ type: 'varchar' }) @Index({ unique: true }) @Field() email: string;
  @Column({ type: 'varchar', nullable: true }) @Field({ nullable: true }) firstName?: string;
  @Column({ type: 'varchar', nullable: true }) @Field({ nullable: true }) lastName?: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User }) @Field(() => UserRole) role: UserRole;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;

  @Field() get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ManyToMany(type => User, user => user.friends)
  @JoinTable({ name: 'friendship' })
  friends: Promise<User[]>;
}
