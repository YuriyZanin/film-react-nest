import { ConfigModule } from '@nestjs/config';

const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: applicationConfig.DATABASE_DRIVER || 'mongodb',
      url: applicationConfig.DATABASE_URL || 'mongodb://localhost:27017/prac',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
