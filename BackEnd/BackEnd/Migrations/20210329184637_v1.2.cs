using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class v12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnswerQuestionaryDetail_AnswerQuestionary_AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail");

            migrationBuilder.AlterColumn<int>(
                name: "AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AnswerQuestionaryDetail_AnswerQuestionary_AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail",
                column: "AnswerQuestionaryId",
                principalTable: "AnswerQuestionary",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnswerQuestionaryDetail_AnswerQuestionary_AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail");

            migrationBuilder.AlterColumn<int>(
                name: "AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_AnswerQuestionaryDetail_AnswerQuestionary_AnswerQuestionaryId",
                table: "AnswerQuestionaryDetail",
                column: "AnswerQuestionaryId",
                principalTable: "AnswerQuestionary",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
