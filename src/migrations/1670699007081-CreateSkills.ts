import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSkills1670699007081 implements MigrationInterface {
  name = 'CreateSkills1670699007081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0f49a593960360f6f85b692aca" ON "skill" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f49a593960360f6f85b692aca"`,
    );
    await queryRunner.query(`DROP TABLE "skill"`);
  }
}
