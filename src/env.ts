import { config } from 'dotenv';
import * as path from 'path';
import { toBool } from './utils/util.function';

config({
  path: path.join(process.cwd(), `${process.env.NODE_ENV || 'dev'}.env`),
});

export const ENV_DEVELOPMENT = 'dev';
export const ENV_PRODUCTION = 'prod';

export const ENV: any = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  APP_NAME: process.env.APP_NAME,
  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,

  bcryptSaltRound: process.env.BCRYPT_SALT_ROUNDS,
  jwtSecret: process.env.JWT_SECRET,

  BASE_UPLOAD_URL: process.env.UPLOAD_BASE_PUBLIC_PATH,
  BASE_URL: process.env.BASE_URL,

  SWAGGER_USER: process.env.SWAGGER_USER,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,

  postgreDB: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,

    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
    autoLoadEntities: process.env.TYPEROM_AUTOLOAD_ENTITIES,
  },

  mailSending: {
    mailHost: process.env.MAIL_HOST,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailForm: process.env.MAIL_FORM,
    mailPort: process.env.MAIL_PORT,
    isMailSecure: process.env.IS_MAIL_SECURE,
  },
};

export const ormConfig: any = {
  type: ENV.postgreDB.type,
  host: ENV.postgreDB.host,
  port: ENV.postgreDB.port,
  username: ENV.postgreDB.username,
  password: ENV.postgreDB.password,
  database: ENV.postgreDB.database,

  synchronize: toBool(ENV.postgreDB.synchronize),
  logging: toBool(ENV.postgreDB.logging),
  autoLoadEntities: toBool(ENV.postgreDB.autoLoadEntities),
  entities: process.env.TYPEORM_ENTITIES,

  migrations: process.env.TYPEORM_MIGRATIONS,
  migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
};

export const mailConfig: any = {
  mailHost: ENV.mailSending.mailHost,
  mailUser: ENV.mailSending.mailUser,
  mailPassword: ENV.mailSending.mailPassword,
  mailForm: ENV.mailSending.mailForm,
  mailPort: ENV.mailSending.mailPort,
  isMailSecure: toBool(ENV.mailSending.isMailSecure),
};
