import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjects1670591524193 implements MigrationInterface {
  name = 'CreateProjects1670591524193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "goal" text NOT NULL, "summary" text, "website" character varying(255), "skills" text, "number_of_members" integer NOT NULL, "funding" text, "user_id" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126"`,
    );
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
