import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar'}) @Index({ unique: true }) email: string;
  @Column({ type: 'varchar', nullable: true }) firstName?: string;
  @Column({ type: 'varchar', nullable: true }) lastName?: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;
}
