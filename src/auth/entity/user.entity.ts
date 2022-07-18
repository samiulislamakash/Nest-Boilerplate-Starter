import { UserRole } from './../enum/auth.enum';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Organization } from 'src/organization/entity/organization.entity';

@Entity('user')
export class User extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: UserRole;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true, type: 'timestamptz' })
  birthday: Date;

  @ManyToOne(() => Organization, (organization) => organization.user)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
