using System;
using System.Linq;
using DomainModel.Model;
using Microsoft.EntityFrameworkCore;

namespace DataAccessMsSqlServerProvider
{
    // >dotnet ef migration add testMigration
    public class DomainModelMsSqlServerContext : DbContext
    {
        public DomainModelMsSqlServerContext(DbContextOptions<DomainModelMsSqlServerContext> options) :base(options)
        { }

        public DbSet<DataEventRecord> DataEventRecords { get; set; }

        public DbSet<SourceInfo> SourceInfos { get; set; }

        public DbSet<EntityInstance> EntityInstances { get; set; }
        public DbSet<AttributeInstance> AttributeInstances { get; set; }
        public DbSet<AttributeName> AttributeNames { get; set; }
        public DbSet<EntityName> EntityNames { get; set; }
        public DbSet<AttributeValueType> AttributeValueTypes { get; set; }
        public DbSet<AttributeValue> AttributeValues { get; set; }
        public DbSet<AttributeHistoryValue> AttributeHistoryValues { get; set; }
        public DbSet<DateTimeValue> DateTimeValues { get; set; }
        public DbSet<DoubleValue> DoubleValues { get; set; }
        public DbSet<IntegerValue> IntegerValues { get; set; }
        public DbSet<TextValue> TextValues { get; set; }
        public DbSet<DateTimeValue> DateTimeHistoryValues { get; set; }
        public DbSet<DoubleValue> DoubleHistoryValues { get; set; }
        public DbSet<IntegerValue> IntegerHistoryValues { get; set; }
        public DbSet<TextHistoryValue> TextHistoryValues { get; set; }
        public DbSet<ProjectTreeNode> ProjectTree { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DataEventRecord>().HasKey(m => m.DataEventRecordId);
            builder.Entity<SourceInfo>().HasKey(m => m.SourceInfoId);

            builder.Entity<EntityInstance>().HasKey(m => m.EntityInstanceId);
            builder.Entity<AttributeInstance>().HasKey(m => m.AttributeInstanceId);
            builder.Entity<AttributeName>().HasKey(m => m.AttributeNameId);
            builder.Entity<EntityName>().HasKey(m => m.EntityNameId);
            builder.Entity<AttributeValue>().HasKey(m => m.AttributeValueId);
            builder.Entity<AttributeHistoryValue>().HasKey(m => m.AttributeHistoryValueId);
            builder.Entity<DateTimeValue>().HasKey(m => m.DateTimeValueId);
            builder.Entity<DoubleValue>().HasKey(m => m.DoubleValueId);
            builder.Entity<IntegerValue>().HasKey(m => m.IntegerValueId);
            builder.Entity<TextValue>().HasKey(m => m.TextValueId);
            builder.Entity<DateTimeHistoryValue>().HasKey(m => m.DateTimeHistoryValueId);
            builder.Entity<DoubleHistoryValue>().HasKey(m => m.DoubleHistoryValueId);
            builder.Entity<IntegerHistoryValue>().HasKey(m => m.IntegerHistoryValueId);
            builder.Entity<TextHistoryValue>().HasKey(m => m.TextHistoryValueId);

            // shadow properties
            builder.Entity<DataEventRecord>().Property<DateTime>("UpdatedTimestamp");
            builder.Entity<SourceInfo>().Property<DateTime>("UpdatedTimestamp");

            //builder.Entity<EntityInstance>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<AttributeInstance>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<AttributeValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<AttributeHistoryValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<DateTimeValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<DoubleValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<IntegerValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<TextValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<DateTimeHistoryValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<DoubleHistoryValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<IntegerHistoryValue>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<TextHistoryValue>().Property<DateTime>("UpdatedTimestamp");

            //builder.HasDefaultSchema("public");

            builder.Entity<AttributeValue>()
                    .HasMany(av => av.AttributeHistoryValues)
                    .WithOne()
                    .HasForeignKey(hv => hv.AttributeValueId);

            builder.Entity<EntityInstance>()
            .HasMany(ei => ei.AttributeValues)
            .WithOne()
            .HasForeignKey(av => av.EntityInstanceId);

//            builder.Entity<Entity>().ToTable("Entity");

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            updateUpdatedProperty<SourceInfo>();
            updateUpdatedProperty<DataEventRecord>();

            //updateUpdatedProperty<EntityInstance>();
            //updateUpdatedProperty<AttributeInstance>();
            //updateUpdatedProperty<AttributeValue>();
            //updateUpdatedProperty<AttributeHistoryValue>();
            //updateUpdatedProperty<DateTimeValue>();
            //updateUpdatedProperty<DoubleValue>();
            //updateUpdatedProperty<IntegerValue>();
            //updateUpdatedProperty<TextValue>();
            //updateUpdatedProperty<DateTimeHistoryValue>();
            //updateUpdatedProperty<DoubleHistoryValue>();
            //updateUpdatedProperty<IntegerHistoryValue>();
            //updateUpdatedProperty<TextHistoryValue>();

            return base.SaveChanges();
        }

        private void updateUpdatedProperty<T>() where T : class
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in modifiedSourceInfo)
            {
                entry.Property("UpdatedTimestamp").CurrentValue = DateTime.UtcNow;
            }
        }
    }
}