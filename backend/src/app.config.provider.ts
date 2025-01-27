import { ConfigModule } from '@nestjs/config';

const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: applicationConfig.DATABASE_DRIVER || 'postgres',
      url: applicationConfig.DATABASE_URL || 'postgresql://localhost',
      host: applicationConfig.DATABASE_HOST || 'postgres',
      port: applicationConfig.DATABASE_PORT || 5432,
      username: applicationConfig.DATABASE_USERNAME || 'postgres',
      password: applicationConfig.DATABASE_PASSWORD || 'postgres',
      database: applicationConfig.DATABASE_NAME || 'prac',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
