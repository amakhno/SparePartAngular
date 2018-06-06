﻿// <auto-generated />
using EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace EntityFramework.Migrations
{
    [DbContext(typeof(EntityFrameworkContext))]
    partial class EntityFrameworkContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DataModels.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContentType");

                    b.Property<byte[]>("Data");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("DataModels.Mark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ImageId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Marks");
                });

            modelBuilder.Entity("DataModels.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MarkId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("MarkId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("DataModels.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("DataModels.SparePart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("ImageId");

                    b.Property<int>("MarkId");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.HasIndex("MarkId");

                    b.ToTable("SpareParts");
                });

            modelBuilder.Entity("DataModels.User", b =>
                {
                    b.Property<string>("UserName")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Password")
                        .HasMaxLength(32);

                    b.Property<int>("RoleId");

                    b.HasKey("UserName");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DataModels.Model", b =>
                {
                    b.HasOne("DataModels.Mark", "Mark")
                        .WithMany()
                        .HasForeignKey("MarkId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DataModels.SparePart", b =>
                {
                    b.HasOne("DataModels.Mark", "Mark")
                        .WithMany()
                        .HasForeignKey("MarkId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DataModels.User", b =>
                {
                    b.HasOne("DataModels.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
