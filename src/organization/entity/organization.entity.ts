import { User } from './../../auth/entity/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('organization')
export class Organization extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.organization)
  user: User[];
}
