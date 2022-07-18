import { ormConfig } from './env';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: ormConfig.type,
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  database: ormConfig.database,
  synchronize: ormConfig.synchronize,
  logging: ormConfig.logging,
  entities: [ormConfig.entities],
  migrations: [ormConfig.migrations],
  subscribers: [],
});
