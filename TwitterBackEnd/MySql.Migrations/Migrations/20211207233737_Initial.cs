using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MySql.Migrations.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Fullname = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailAddress = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Agendas",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    AgendaDetail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agendas", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TopicCategories",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CategoryName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicCategories", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Fullname = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PersonalInfo = table.Column<string>(type: "varchar(160)", maxLength: 160, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PersonalWebSiteURL = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailAddress = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Birthday = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ProfilePicPath = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BackgroundPath = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FollowerCounter = table.Column<int>(type: "int", nullable: false),
                    FollowingCounter = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HashTags",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    HashTagDetail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TweetCounter = table.Column<int>(type: "int", nullable: false),
                    AgendaID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashTags", x => x.ID);
                    table.ForeignKey(
                        name: "FK_HashTags_Agendas_AgendaID",
                        column: x => x.AgendaID,
                        principalTable: "Agendas",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TopicName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TopicDetail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TopicCategoryID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Topics_TopicCategories_TopicCategoryID",
                        column: x => x.TopicCategoryID,
                        principalTable: "TopicCategories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Follows",
                columns: table => new
                {
                    FollowerUserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FollowingUserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Follows", x => new { x.FollowerUserID, x.FollowingUserID });
                    table.ForeignKey(
                        name: "FK_Follows_Users_FollowerUserID",
                        column: x => x.FollowerUserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Follows_Users_FollowingUserID",
                        column: x => x.FollowingUserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tweets",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TweetDetail = table.Column<string>(type: "varchar(280)", maxLength: 280, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LikeCounter = table.Column<int>(type: "int", nullable: false),
                    RetweetCounter = table.Column<int>(type: "int", nullable: false),
                    ReplyCounter = table.Column<int>(type: "int", nullable: false),
                    ReplyStatus = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ReplyMainTweetID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    TopicID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tweets", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Tweets_Topics_TopicID",
                        column: x => x.TopicID,
                        principalTable: "Topics",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tweets_Tweets_ReplyMainTweetID",
                        column: x => x.ReplyMainTweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tweets_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    TweetID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.TweetID, x.UserID });
                    table.ForeignKey(
                        name: "FK_Likes_Tweets_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Likes_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Retweet",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TweetID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Retweet", x => new { x.TweetID, x.UserID });
                    table.ForeignKey(
                        name: "FK_Retweet_Tweets_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Retweet_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TweetImages",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ImagePath = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TweetID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweetImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TweetImages_Tweets_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TweetsAndHashTags",
                columns: table => new
                {
                    HashTagID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TweetID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweetsAndHashTags", x => new { x.TweetID, x.HashTagID });
                    table.ForeignKey(
                        name: "FK_TweetsAndHashTags_HashTags_HashTagID",
                        column: x => x.HashTagID,
                        principalTable: "HashTags",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TweetsAndHashTags_Tweets_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TweetsAndMentions",
                columns: table => new
                {
                    MentionedUserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TweetID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweetsAndMentions", x => new { x.TweetID, x.MentionedUserID });
                    table.ForeignKey(
                        name: "FK_TweetsAndMentions_Tweets_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Tweets",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_TweetsAndMentions_Users_TweetID",
                        column: x => x.TweetID,
                        principalTable: "Users",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "BackgroundPath", "Birthday", "CreatedDate", "EmailAddress", "FollowerCounter", "FollowingCounter", "Fullname", "Location", "ModifiedDate", "Password", "PersonalInfo", "PersonalWebSiteURL", "PhoneNumber", "ProfilePicPath", "Status", "Username" },
                values: new object[] { new Guid("16e570d7-d78c-4bb1-8514-158cbc177c3e"), "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593807/Default_ir2ky0.jpg", new DateTime(1990, 10, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 8, 2, 37, 36, 159, DateTimeKind.Local).AddTicks(2012), "max@gmail.com", 0, 0, "Mad Max", null, null, "1", null, null, null, "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593796/Default_klqavt.jpg", 1, "Max87654812" });

            migrationBuilder.CreateIndex(
                name: "IX_Follows_FollowingUserID",
                table: "Follows",
                column: "FollowingUserID");

            migrationBuilder.CreateIndex(
                name: "IX_HashTags_AgendaID",
                table: "HashTags",
                column: "AgendaID");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_UserID",
                table: "Likes",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Retweet_UserID",
                table: "Retweet",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_TopicCategoryID",
                table: "Topics",
                column: "TopicCategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_TweetImages_TweetID",
                table: "TweetImages",
                column: "TweetID");

            migrationBuilder.CreateIndex(
                name: "IX_Tweets_ReplyMainTweetID",
                table: "Tweets",
                column: "ReplyMainTweetID");

            migrationBuilder.CreateIndex(
                name: "IX_Tweets_TopicID",
                table: "Tweets",
                column: "TopicID");

            migrationBuilder.CreateIndex(
                name: "IX_Tweets_UserID",
                table: "Tweets",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_TweetsAndHashTags_HashTagID",
                table: "TweetsAndHashTags",
                column: "HashTagID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Follows");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "Retweet");

            migrationBuilder.DropTable(
                name: "TweetImages");

            migrationBuilder.DropTable(
                name: "TweetsAndHashTags");

            migrationBuilder.DropTable(
                name: "TweetsAndMentions");

            migrationBuilder.DropTable(
                name: "HashTags");

            migrationBuilder.DropTable(
                name: "Tweets");

            migrationBuilder.DropTable(
                name: "Agendas");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "TopicCategories");
        }
    }
}
