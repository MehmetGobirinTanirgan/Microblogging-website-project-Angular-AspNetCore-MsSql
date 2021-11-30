using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MsSql.Migrations.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Agendas",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AgendaDetail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agendas", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TopicCategories",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicCategories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PersonalInfo = table.Column<string>(type: "nvarchar(160)", maxLength: 160, nullable: true),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PersonalWebSiteURL = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    EmailAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProfilePicPath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    BackgroundPath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    FollowerCounter = table.Column<int>(type: "int", nullable: false),
                    FollowingCounter = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "HashTags",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HashTagDetail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TweetCounter = table.Column<int>(type: "int", nullable: false),
                    AgendaID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TopicDetail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TopicCategoryID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "Follows",
                columns: table => new
                {
                    FollowerUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FollowingUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "Tweets",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TweetDetail = table.Column<string>(type: "nvarchar(280)", maxLength: 280, nullable: true),
                    LikeCounter = table.Column<int>(type: "int", nullable: false),
                    RetweetCounter = table.Column<int>(type: "int", nullable: false),
                    ReplyCounter = table.Column<int>(type: "int", nullable: false),
                    ReplyStatus = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReplyMainTweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TopicID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    TweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "Retweet",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "TweetImages",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    TweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "TweetsAndHashTags",
                columns: table => new
                {
                    HashTagID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "TweetsAndMentions",
                columns: table => new
                {
                    MentionedUserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TweetID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                });

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
