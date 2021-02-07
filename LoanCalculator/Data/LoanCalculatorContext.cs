using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LoanCalculator.Models;

namespace LoanCalculator.Data
{
    public class LoanCalculatorContext : DbContext
    {
        public LoanCalculatorContext (DbContextOptions<LoanCalculatorContext> options)
            : base(options)
        {
        }

        public DbSet<LoanCalculator.Models.Client> Clients { get; set; }
    }
}
