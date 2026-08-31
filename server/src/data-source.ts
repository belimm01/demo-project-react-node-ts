import { DataSource } from "typeorm";
import { env } from "./env.js";
import { UserCredentialsEntity } from "./entity/userCredentialsEntity.js";

/**
 * Application-wide TypeORM data source. Replaces the deprecated
 * `createConnection` / `ormconfig.json` setup with the current
 * `DataSource` API driven entirely by environment configuration.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: true,
  logging: false,
  entities: [UserCredentialsEntity],
});
