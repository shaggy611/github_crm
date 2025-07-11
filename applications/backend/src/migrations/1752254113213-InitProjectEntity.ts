import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProjectEntity1752254113213 implements MigrationInterface {
    name = 'InitProjectEntity1752254113213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "projects" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
          "owner" VARCHAR NULL,
          "name" VARCHAR NULL,
          "url" VARCHAR NULL,
          "stars" INTEGER NULL,
          "forks" INTEGER NULL,
          "issues" INTEGER NULL,
          "created_at_utc" BIGINT NULL,
          "account_id" uuid NOT NULL,
          CONSTRAINT "PK_projects_id" PRIMARY KEY ("id"),
          CONSTRAINT "FK_projects_user_id" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
