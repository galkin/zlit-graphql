import { Field, ID, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid') @Field(() => ID) id: string;
  @Column({ type: 'varchar' }) @Index({ unique: true }) @Field() email: string;
  @Column({ type: 'varchar', nullable: true }) @Field() firstName?: string;
  @Column({ type: 'varchar', nullable: true }) @Field() lastName?: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;
}
