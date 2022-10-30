import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class initial1667053048757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const { insertId } = await queryRunner.query("INSERT INTO `test`.`schedules` (`title`, `startDate`, `endDate`, `duration`, `bufferTime`,`maxClients`) VALUES ('Men Haircut', '2022-10-29', '2022-11-06', '10', '5' , '3')");
            await queryRunner.query(`INSERT INTO \`test\`.\`holidays\` (\`day\`,\`scheduleId\`) VALUES ('SUNDAY' , '${insertId}');`) // suppose above returns 1 
            await queryRunner.query("INSERT INTO `test`.`openinghours` (`day`, `opensAt`, `closedAt`) VALUES ('MONDAY', '08:00', '20:00'),('TUESDAY', '08:00', '20:00'),('WEDNESDAY', '08:00', '20:00'),('THURSDAY', '08:00', '20:00'),('FRIDAY', '08:00', '20:00'),('SATURDAY', '10:00', '22:00');")
            await queryRunner.query(`INSERT INTO \`test\`.\`breaks\` (\`description\`, \`from\`, \`to\`, \`scheduleId\`) VALUES ('LUNCH BREAK', '12:00', '13:00', '${insertId}'),  ('cleaning break', '15:00', '16:00', '${insertId}'); `)

            const { insertId: scheduleId } = await queryRunner.query("INSERT INTO `test`.`schedules` (`title`, `startDate`, `endDate`, `duration`, `bufferTime`,`maxClients`) VALUES ('Woman Haircut ', '2022-10-29', '2022-11-06', '60', '10' , '3')");
            await queryRunner.query(`INSERT INTO \`test\`.\`holidays\` (\`day\`,\`scheduleId\`) VALUES ('SUNDAY' , '${scheduleId}');`) // suppose above returns 1 
            await queryRunner.query("INSERT INTO `test`.`openinghours` (`day`, `opensAt`, `closedAt`)  VALUES ('MONDAY', '08:00', '20:00'),('TUESDAY', '08:00', '20:00'),('WEDNESDAY', '08:00', '20:00'),('THURSDAY', '08:00', '20:00'),('FRIDAY', '08:00', '20:00'),('SATURDAY', '10:00', '22:00');")
            await queryRunner.query(`INSERT INTO \`test\`.\`holidays\` (\`day\`,\`scheduleId\`) VALUES ('WEDNESDAY' , '${scheduleId}');`) // PUBLIC HOLIDAY
            await queryRunner.query(`INSERT INTO \`test\`.\`breaks\` (\`description\`, \`from\`, \`to\`, \`scheduleId\`) VALUES ('LUNCH BREAK', '12:00', '13:00', '${scheduleId}'),  ('cleaning break', '15:00', '16:00', '${scheduleId}'); `)

        } catch (error) {
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
