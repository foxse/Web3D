using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessMsSqlServerProvider.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AttributeInstances",
                columns: table => new
                {
                    AttributeInstanceId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeInstances", x => x.AttributeInstanceId);
                });

            migrationBuilder.CreateTable(
                name: "AttributeValueTypes",
                columns: table => new
                {
                    AttributeValueTypeId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeValueTypes", x => x.AttributeValueTypeId);
                });

            migrationBuilder.CreateTable(
                name: "DateTimeHistoryValue",
                columns: table => new
                {
                    DateTimeHistoryValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DateTimeHistoryValue", x => x.DateTimeHistoryValueId);
                });

            migrationBuilder.CreateTable(
                name: "DateTimeValue",
                columns: table => new
                {
                    DateTimeValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DateTimeValue", x => x.DateTimeValueId);
                });

            migrationBuilder.CreateTable(
                name: "DoubleHistoryValue",
                columns: table => new
                {
                    DoubleHistoryValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoubleHistoryValue", x => x.DoubleHistoryValueId);
                });

            migrationBuilder.CreateTable(
                name: "DoubleValue",
                columns: table => new
                {
                    DoubleValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoubleValue", x => x.DoubleValueId);
                });

            migrationBuilder.CreateTable(
                name: "EntityInstances",
                columns: table => new
                {
                    EntityInstanceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ModifiedByUserId = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Normal = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false),
                    Uv = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityInstances", x => x.EntityInstanceId);
                });

            migrationBuilder.CreateTable(
                name: "IntegerHistoryValue",
                columns: table => new
                {
                    IntegerHistoryValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegerHistoryValue", x => x.IntegerHistoryValueId);
                });

            migrationBuilder.CreateTable(
                name: "IntegerValue",
                columns: table => new
                {
                    IntegerValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegerValue", x => x.IntegerValueId);
                });

            migrationBuilder.CreateTable(
                name: "SourceInfos",
                columns: table => new
                {
                    SourceInfoId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SourceInfos", x => x.SourceInfoId);
                });

            migrationBuilder.CreateTable(
                name: "TextHistoryValues",
                columns: table => new
                {
                    TextHistoryValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextHistoryValues", x => x.TextHistoryValueId);
                });

            migrationBuilder.CreateTable(
                name: "TextValues",
                columns: table => new
                {
                    TextValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextValues", x => x.TextValueId);
                });

            migrationBuilder.CreateTable(
                name: "AttributeNames",
                columns: table => new
                {
                    AttributeNameId = table.Column<string>(nullable: false),
                    AttributeInstanceId = table.Column<long>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeNames", x => x.AttributeNameId);
                    table.ForeignKey(
                        name: "FK_AttributeNames_AttributeInstances_AttributeInstanceId",
                        column: x => x.AttributeInstanceId,
                        principalTable: "AttributeInstances",
                        principalColumn: "AttributeInstanceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EntityNames",
                columns: table => new
                {
                    EntityNameId = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    EntityInstanceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityNames", x => x.EntityNameId);
                    table.ForeignKey(
                        name: "FK_EntityNames_EntityInstances_EntityInstanceId",
                        column: x => x.EntityInstanceId,
                        principalTable: "EntityInstances",
                        principalColumn: "EntityInstanceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataEventRecords",
                columns: table => new
                {
                    DataEventRecordId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    SourceInfoId = table.Column<int>(nullable: false),
                    SourceInfoId1 = table.Column<long>(nullable: true),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataEventRecords", x => x.DataEventRecordId);
                    table.ForeignKey(
                        name: "FK_DataEventRecords_SourceInfos_SourceInfoId1",
                        column: x => x.SourceInfoId1,
                        principalTable: "SourceInfos",
                        principalColumn: "SourceInfoId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AttributeValues",
                columns: table => new
                {
                    AttributeValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AttributeInstanceId = table.Column<long>(nullable: false),
                    AttributeValueTypeId = table.Column<string>(nullable: true),
                    DateTimeValueId = table.Column<long>(nullable: true),
                    DoubleValueId = table.Column<long>(nullable: true),
                    EntityInstanceId = table.Column<int>(nullable: false),
                    EntityInstanceId1 = table.Column<int>(nullable: true),
                    IntegerValueId = table.Column<long>(nullable: true),
                    ModifiedByUserId = table.Column<long>(nullable: true),
                    TextValueId = table.Column<long>(nullable: true),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeValues", x => x.AttributeValueId);
                    table.ForeignKey(
                        name: "FK_AttributeValues_AttributeInstances_AttributeInstanceId",
                        column: x => x.AttributeInstanceId,
                        principalTable: "AttributeInstances",
                        principalColumn: "AttributeInstanceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeValues_AttributeValueTypes_AttributeValueTypeId",
                        column: x => x.AttributeValueTypeId,
                        principalTable: "AttributeValueTypes",
                        principalColumn: "AttributeValueTypeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeValues_DateTimeValue_DateTimeValueId",
                        column: x => x.DateTimeValueId,
                        principalTable: "DateTimeValue",
                        principalColumn: "DateTimeValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeValues_DoubleValue_DoubleValueId",
                        column: x => x.DoubleValueId,
                        principalTable: "DoubleValue",
                        principalColumn: "DoubleValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeValues_EntityInstances_EntityInstanceId",
                        column: x => x.EntityInstanceId,
                        principalTable: "EntityInstances",
                        principalColumn: "EntityInstanceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeValues_EntityInstances_EntityInstanceId1",
                        column: x => x.EntityInstanceId1,
                        principalTable: "EntityInstances",
                        principalColumn: "EntityInstanceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeValues_IntegerValue_IntegerValueId",
                        column: x => x.IntegerValueId,
                        principalTable: "IntegerValue",
                        principalColumn: "IntegerValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeValues_TextValues_TextValueId",
                        column: x => x.TextValueId,
                        principalTable: "TextValues",
                        principalColumn: "TextValueId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AttributeHistoryValues",
                columns: table => new
                {
                    AttributeHistoryValueId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AttributeValueId = table.Column<long>(nullable: false),
                    AttributeValueId1 = table.Column<long>(nullable: true),
                    DateTimeHistoryValueId = table.Column<long>(nullable: true),
                    DoubleHistoryValueId = table.Column<long>(nullable: true),
                    IntegerHistoryValueId = table.Column<long>(nullable: true),
                    ModifiedByUserId = table.Column<long>(nullable: true),
                    TextHistoryValueId = table.Column<long>(nullable: true),
                    UpdatedTimestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeHistoryValues", x => x.AttributeHistoryValueId);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_AttributeValues_AttributeValueId",
                        column: x => x.AttributeValueId,
                        principalTable: "AttributeValues",
                        principalColumn: "AttributeValueId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_AttributeValues_AttributeValueId1",
                        column: x => x.AttributeValueId1,
                        principalTable: "AttributeValues",
                        principalColumn: "AttributeValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_DateTimeHistoryValue_DateTimeHistoryValueId",
                        column: x => x.DateTimeHistoryValueId,
                        principalTable: "DateTimeHistoryValue",
                        principalColumn: "DateTimeHistoryValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_DoubleHistoryValue_DoubleHistoryValueId",
                        column: x => x.DoubleHistoryValueId,
                        principalTable: "DoubleHistoryValue",
                        principalColumn: "DoubleHistoryValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_IntegerHistoryValue_IntegerHistoryValueId",
                        column: x => x.IntegerHistoryValueId,
                        principalTable: "IntegerHistoryValue",
                        principalColumn: "IntegerHistoryValueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttributeHistoryValues_TextHistoryValues_TextHistoryValueId",
                        column: x => x.TextHistoryValueId,
                        principalTable: "TextHistoryValues",
                        principalColumn: "TextHistoryValueId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_AttributeValueId",
                table: "AttributeHistoryValues",
                column: "AttributeValueId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_AttributeValueId1",
                table: "AttributeHistoryValues",
                column: "AttributeValueId1");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_DateTimeHistoryValueId",
                table: "AttributeHistoryValues",
                column: "DateTimeHistoryValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_DoubleHistoryValueId",
                table: "AttributeHistoryValues",
                column: "DoubleHistoryValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_IntegerHistoryValueId",
                table: "AttributeHistoryValues",
                column: "IntegerHistoryValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeHistoryValues_TextHistoryValueId",
                table: "AttributeHistoryValues",
                column: "TextHistoryValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeNames_AttributeInstanceId",
                table: "AttributeNames",
                column: "AttributeInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_AttributeInstanceId",
                table: "AttributeValues",
                column: "AttributeInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_AttributeValueTypeId",
                table: "AttributeValues",
                column: "AttributeValueTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_DateTimeValueId",
                table: "AttributeValues",
                column: "DateTimeValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_DoubleValueId",
                table: "AttributeValues",
                column: "DoubleValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_EntityInstanceId",
                table: "AttributeValues",
                column: "EntityInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_EntityInstanceId1",
                table: "AttributeValues",
                column: "EntityInstanceId1");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_IntegerValueId",
                table: "AttributeValues",
                column: "IntegerValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeValues_TextValueId",
                table: "AttributeValues",
                column: "TextValueId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataEventRecords_SourceInfoId1",
                table: "DataEventRecords",
                column: "SourceInfoId1");

            migrationBuilder.CreateIndex(
                name: "IX_EntityNames_EntityInstanceId",
                table: "EntityNames",
                column: "EntityInstanceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttributeHistoryValues");

            migrationBuilder.DropTable(
                name: "AttributeNames");

            migrationBuilder.DropTable(
                name: "DataEventRecords");

            migrationBuilder.DropTable(
                name: "EntityNames");

            migrationBuilder.DropTable(
                name: "AttributeValues");

            migrationBuilder.DropTable(
                name: "DateTimeHistoryValue");

            migrationBuilder.DropTable(
                name: "DoubleHistoryValue");

            migrationBuilder.DropTable(
                name: "IntegerHistoryValue");

            migrationBuilder.DropTable(
                name: "TextHistoryValues");

            migrationBuilder.DropTable(
                name: "SourceInfos");

            migrationBuilder.DropTable(
                name: "AttributeInstances");

            migrationBuilder.DropTable(
                name: "AttributeValueTypes");

            migrationBuilder.DropTable(
                name: "DateTimeValue");

            migrationBuilder.DropTable(
                name: "DoubleValue");

            migrationBuilder.DropTable(
                name: "EntityInstances");

            migrationBuilder.DropTable(
                name: "IntegerValue");

            migrationBuilder.DropTable(
                name: "TextValues");
        }
    }
}
