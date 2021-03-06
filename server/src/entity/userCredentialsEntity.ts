import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("user-credentials")
export class UserCredentialsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  password: string;
}
