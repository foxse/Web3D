using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DataAccessMsSqlServerProvider;

namespace DataAccessMsSqlServerProvider.Migrations
{
    [DbContext(typeof(DomainModelMsSqlServerContext))]
    [Migration("20170207082202_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DomainModel.Model.AttributeHistoryValue", b =>
                {
                    b.Property<long>("AttributeHistoryValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("AttributeValueId");

                    b.Property<long?>("AttributeValueId1");

                    b.Property<long?>("DateTimeHistoryValueId");

                    b.Property<long?>("DoubleHistoryValueId");

                    b.Property<long?>("IntegerHistoryValueId");

                    b.Property<long?>("ModifiedByUserId");

                    b.Property<long?>("TextHistoryValueId");

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.HasKey("AttributeHistoryValueId");

                    b.HasIndex("AttributeValueId");

                    b.HasIndex("AttributeValueId1");

                    b.HasIndex("DateTimeHistoryValueId")
                        .IsUnique();

                    b.HasIndex("DoubleHistoryValueId")
                        .IsUnique();

                    b.HasIndex("IntegerHistoryValueId")
                        .IsUnique();

                    b.HasIndex("TextHistoryValueId")
                        .IsUnique();

                    b.ToTable("AttributeHistoryValues");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeInstance", b =>
                {
                    b.Property<long>("AttributeInstanceId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.HasKey("AttributeInstanceId");

                    b.ToTable("AttributeInstances");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeName", b =>
                {
                    b.Property<string>("AttributeNameId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("AttributeInstanceId");

                    b.Property<string>("Description");

                    b.HasKey("AttributeNameId");

                    b.HasIndex("AttributeInstanceId");

                    b.ToTable("AttributeNames");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeValue", b =>
                {
                    b.Property<long>("AttributeValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("AttributeInstanceId");

                    b.Property<string>("AttributeValueTypeId");

                    b.Property<long?>("DateTimeValueId");

                    b.Property<long?>("DoubleValueId");

                    b.Property<int>("EntityInstanceId");

                    b.Property<int?>("EntityInstanceId1");

                    b.Property<long?>("IntegerValueId");

                    b.Property<long?>("ModifiedByUserId");

                    b.Property<long?>("TextValueId");

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.HasKey("AttributeValueId");

                    b.HasIndex("AttributeInstanceId");

                    b.HasIndex("AttributeValueTypeId");

                    b.HasIndex("DateTimeValueId")
                        .IsUnique();

                    b.HasIndex("DoubleValueId")
                        .IsUnique();

                    b.HasIndex("EntityInstanceId");

                    b.HasIndex("EntityInstanceId1");

                    b.HasIndex("IntegerValueId")
                        .IsUnique();

                    b.HasIndex("TextValueId")
                        .IsUnique();

                    b.ToTable("AttributeValues");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeValueType", b =>
                {
                    b.Property<string>("AttributeValueTypeId")
                        .ValueGeneratedOnAdd();

                    b.HasKey("AttributeValueTypeId");

                    b.ToTable("AttributeValueTypes");
                });

            modelBuilder.Entity("DomainModel.Model.DataEventRecord", b =>
                {
                    b.Property<long>("DataEventRecordId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("SourceInfoId");

                    b.Property<long?>("SourceInfoId1");

                    b.Property<DateTime>("Timestamp");

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.HasKey("DataEventRecordId");

                    b.HasIndex("SourceInfoId1");

                    b.ToTable("DataEventRecords");
                });

            modelBuilder.Entity("DomainModel.Model.DateTimeHistoryValue", b =>
                {
                    b.Property<long>("DateTimeHistoryValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Value");

                    b.HasKey("DateTimeHistoryValueId");

                    b.ToTable("DateTimeHistoryValue");
                });

            modelBuilder.Entity("DomainModel.Model.DateTimeValue", b =>
                {
                    b.Property<long>("DateTimeValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Value");

                    b.HasKey("DateTimeValueId");

                    b.ToTable("DateTimeValue");
                });

            modelBuilder.Entity("DomainModel.Model.DoubleHistoryValue", b =>
                {
                    b.Property<long>("DoubleHistoryValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Value");

                    b.HasKey("DoubleHistoryValueId");

                    b.ToTable("DoubleHistoryValue");
                });

            modelBuilder.Entity("DomainModel.Model.DoubleValue", b =>
                {
                    b.Property<long>("DoubleValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Value");

                    b.HasKey("DoubleValueId");

                    b.ToTable("DoubleValue");
                });

            modelBuilder.Entity("DomainModel.Model.EntityInstance", b =>
                {
                    b.Property<int>("EntityInstanceId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("ModifiedByUserId");

                    b.Property<string>("Name");

                    b.Property<string>("Normal");

                    b.Property<string>("Position");

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.Property<string>("Uv");

                    b.HasKey("EntityInstanceId");

                    b.ToTable("EntityInstances");
                });

            modelBuilder.Entity("DomainModel.Model.EntityName", b =>
                {
                    b.Property<string>("EntityNameId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("EntityInstanceId");

                    b.HasKey("EntityNameId");

                    b.HasIndex("EntityInstanceId");

                    b.ToTable("EntityNames");
                });

            modelBuilder.Entity("DomainModel.Model.IntegerHistoryValue", b =>
                {
                    b.Property<long>("IntegerHistoryValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Value");

                    b.HasKey("IntegerHistoryValueId");

                    b.ToTable("IntegerHistoryValue");
                });

            modelBuilder.Entity("DomainModel.Model.IntegerValue", b =>
                {
                    b.Property<long>("IntegerValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Value");

                    b.HasKey("IntegerValueId");

                    b.ToTable("IntegerValue");
                });

            modelBuilder.Entity("DomainModel.Model.SourceInfo", b =>
                {
                    b.Property<long>("SourceInfoId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpdatedTimestamp");

                    b.HasKey("SourceInfoId");

                    b.ToTable("SourceInfos");
                });

            modelBuilder.Entity("DomainModel.Model.TextHistoryValue", b =>
                {
                    b.Property<long>("TextHistoryValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Value");

                    b.HasKey("TextHistoryValueId");

                    b.ToTable("TextHistoryValues");
                });

            modelBuilder.Entity("DomainModel.Model.TextValue", b =>
                {
                    b.Property<long>("TextValueId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Value");

                    b.HasKey("TextValueId");

                    b.ToTable("TextValues");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeHistoryValue", b =>
                {
                    b.HasOne("DomainModel.Model.AttributeValue")
                        .WithMany("AttributeHistoryValues")
                        .HasForeignKey("AttributeValueId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DomainModel.Model.AttributeValue", "AttributeValue")
                        .WithMany()
                        .HasForeignKey("AttributeValueId1");

                    b.HasOne("DomainModel.Model.DateTimeHistoryValue", "DateTimeHistoryValue")
                        .WithOne("AttributeHistoryValue")
                        .HasForeignKey("DomainModel.Model.AttributeHistoryValue", "DateTimeHistoryValueId");

                    b.HasOne("DomainModel.Model.DoubleHistoryValue", "DoubleHistoryValue")
                        .WithOne("AttributeHistoryValue")
                        .HasForeignKey("DomainModel.Model.AttributeHistoryValue", "DoubleHistoryValueId");

                    b.HasOne("DomainModel.Model.IntegerHistoryValue", "IntegerHistoryValue")
                        .WithOne("AttributeHistoryValue")
                        .HasForeignKey("DomainModel.Model.AttributeHistoryValue", "IntegerHistoryValueId");

                    b.HasOne("DomainModel.Model.TextHistoryValue", "TextHistoryValue")
                        .WithOne("AttributeHistoryValue")
                        .HasForeignKey("DomainModel.Model.AttributeHistoryValue", "TextHistoryValueId");
                });

            modelBuilder.Entity("DomainModel.Model.AttributeName", b =>
                {
                    b.HasOne("DomainModel.Model.AttributeInstance", "AttributeInstance")
                        .WithMany("AttributeNames")
                        .HasForeignKey("AttributeInstanceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DomainModel.Model.AttributeValue", b =>
                {
                    b.HasOne("DomainModel.Model.AttributeInstance", "AttributeInstance")
                        .WithMany("AttributeValues")
                        .HasForeignKey("AttributeInstanceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DomainModel.Model.AttributeValueType", "AttributeValueType")
                        .WithMany("AttributeValues")
                        .HasForeignKey("AttributeValueTypeId");

                    b.HasOne("DomainModel.Model.DateTimeValue", "DateTimeValue")
                        .WithOne("AttributeValue")
                        .HasForeignKey("DomainModel.Model.AttributeValue", "DateTimeValueId");

                    b.HasOne("DomainModel.Model.DoubleValue", "DoubleValue")
                        .WithOne("AttributeValue")
                        .HasForeignKey("DomainModel.Model.AttributeValue", "DoubleValueId");

                    b.HasOne("DomainModel.Model.EntityInstance")
                        .WithMany("AttributeValues")
                        .HasForeignKey("EntityInstanceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DomainModel.Model.EntityInstance", "EntityInstance")
                        .WithMany()
                        .HasForeignKey("EntityInstanceId1");

                    b.HasOne("DomainModel.Model.IntegerValue", "IntegerValue")
                        .WithOne("AttributeValue")
                        .HasForeignKey("DomainModel.Model.AttributeValue", "IntegerValueId");

                    b.HasOne("DomainModel.Model.TextValue", "TextValue")
                        .WithOne("AttributeValue")
                        .HasForeignKey("DomainModel.Model.AttributeValue", "TextValueId");
                });

            modelBuilder.Entity("DomainModel.Model.DataEventRecord", b =>
                {
                    b.HasOne("DomainModel.Model.SourceInfo", "SourceInfo")
                        .WithMany("DataEventRecords")
                        .HasForeignKey("SourceInfoId1");
                });

            modelBuilder.Entity("DomainModel.Model.EntityName", b =>
                {
                    b.HasOne("DomainModel.Model.EntityInstance", "EntityInstance")
                        .WithMany("EntityNames")
                        .HasForeignKey("EntityInstanceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
