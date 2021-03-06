export default {
  type: 'postgres',
  host: '10.0.0.10',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  entities: ['./dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true,
  autoLoadEntities: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as any;
