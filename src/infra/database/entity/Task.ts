import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Timestamp,
} from "typeorm";
import User from "./User";

@Entity()
export default class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isFinished: boolean;

  @Column()
  userId: string;

  @Column({ type: "timestamp" })
  expiresAt: Timestamp;

  @CreateDateColumn()
  createdAt: Timestamp;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
