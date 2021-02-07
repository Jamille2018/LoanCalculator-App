using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LoanCalculator.Models
{
	public class Client
	{
		[Key]
		public int ClientId { get; set; }

		[Required]
		public string ClientName { get; set; }

		[Required]
		public Double LoanAmount { get; set; }

		[Required]
		public int LoanTerm { get; set; }

		[Required]
		public DateTime StartOfLoan { get; set; }

		[Required]
		public Double FixedRate { get; set; }
	}
}

