import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import Task from "./Task";

@Entity()
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
