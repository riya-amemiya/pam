import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { User, Post, UserRelationRole } from "@prisma/client";

interface Database {
  User: User;
  Post: Post;
  UserRelationRole: UserRelationRole;
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export { db as kysely };
