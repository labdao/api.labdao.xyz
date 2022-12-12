import { MigrationInterface, QueryRunner } from "typeorm";

export class InstallFuzzyStrMatchExtension1670839593000 implements MigrationInterface {
    name = 'InstallFuzzyStrMatchExtension1670839593000'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS fuzzystrmatch');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP EXTENSION IF EXISTS fuzzystrmatch');
    }

}
