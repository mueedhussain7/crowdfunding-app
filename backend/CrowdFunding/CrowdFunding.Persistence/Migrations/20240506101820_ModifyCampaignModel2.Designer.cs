﻿// <auto-generated />
using System;
using CrowdFunding.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CrowdFunding.Persistence.Migrations
{
    [DbContext(typeof(MySqlDbContext))]
    [Migration("20240506101820_ModifyCampaignModel2")]
    partial class ModifyCampaignModel2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.18")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CrowdFunding.Domain.Entities.Campaign", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset?>("DateUpdated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OwnerAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TransactionHash")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("TransactionHash")
                        .IsUnique();

                    b.ToTable("Campaigns");
                });

            modelBuilder.Entity("CrowdFunding.Domain.Entities.Proposal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset?>("DateUpdated")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OnChainId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OwnerAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("RequestedAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TransactionHash")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("TransactionHash")
                        .IsUnique();

                    b.ToTable("Proposals");
                });
#pragma warning restore 612, 618
        }
    }
}
