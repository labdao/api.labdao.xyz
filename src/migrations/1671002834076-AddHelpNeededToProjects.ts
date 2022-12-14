import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHelpNeededToProjects1671002834076 implements MigrationInterface {
    name = 'sh1671002834076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "help_needed" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "help_needed"`);
    }

}
