import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSkillsUsersJoinTable1671481694971 implements MigrationInterface {
    name = 'CreateSkillsUsersJoinTable1671481694971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_skills_skill" ("user_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_68002f532a7848141e0fa32711d" PRIMARY KEY ("user_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78b253ae60c0ac087a7f82780f" ON "user_skills_skill" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b447b1a2dc7552a716532e2216" ON "user_skills_skill" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_78b253ae60c0ac087a7f82780f7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_b447b1a2dc7552a716532e22166" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_b447b1a2dc7552a716532e22166"`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_78b253ae60c0ac087a7f82780f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b447b1a2dc7552a716532e2216"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78b253ae60c0ac087a7f82780f"`);
        await queryRunner.query(`DROP TABLE "user_skills_skill"`);
    }
}
