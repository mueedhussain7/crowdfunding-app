using System.Collections.Generic;
using System.Reflection.Emit;
using CrowdFunding.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;

namespace CrowdFunding.Persistence.Context;

public class MySqlDbContext : DbContext

{
    public MySqlDbContext() { }
    public MySqlDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("server=localhost;database=crowdfundingDb;user=root;password=");
    }

    public DbSet<Campaign> Campaigns { get; set; }

    // Optionally, you can override OnModelCreating to configure entity relationships and database rules
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Campaign>(p =>
        {
            p.HasIndex(i => i.TransactionHash).IsUnique();
        });

    }
}
