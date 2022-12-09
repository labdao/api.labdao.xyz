import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1670586587289 implements MigrationInterface {
  name = 'CreateUsers1670586587289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "email" character varying(50) NOT NULL, "role" character varying(50), "affiliation" character varying(50), "city" character varying(100), "wallet_address" character varying(50) NOT NULL, "avatar_url" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ac2af862c8540eccb210b29310" ON "user" ("wallet_address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac2af862c8540eccb210b29310"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
