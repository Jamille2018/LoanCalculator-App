import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { ClientDetails } from '../../models/clientdetails';
import { PaymentDetails } from '../../models/paymentdetails';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client$: Observable<ClientDetails>;
  clientId: number;
  clientDetails;
  loanDetails;
  paymentDetails = [];
  headers = ["Payment Date", "Monthly Amortization", "Remaining Balance"];
  constructor(private clientService: ClientService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.clientId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadClient();
    this.clientDetails = this.client$.subscribe(data => {
    this.loanDetails = this.clientService.generatePaymentSchedule(data.loanTerm, data.fixedRate, data.loanAmount);
    this.generatePaymentDetails(this.loanDetails, data.startOfLoan);
    });
  }

  loadClient() {
    this.client$ = this.clientService.getClient(this.clientId);
  }

  generatePaymentDetails(loanDetails, startOfLoan) {
    for (var i = 1; i <=loanDetails.termsInMonths; i++) {
      let oldPaymentObj = new PaymentDetails();
      oldPaymentObj.paymentDate = this.addOneMonth(startOfLoan, i-1);
      oldPaymentObj.monthlyAmortization = loanDetails.monthlyAmortization;
      oldPaymentObj.remainingBalance = loanDetails.totalLoanAmount - (loanDetails.monthlyAmortization)*i;

      this.paymentDetails.push(oldPaymentObj);
    }
  }

  addOneMonth(date, increment) {
    let d = new Date(date);
    return new Date(d.setMonth(d.getMonth() + increment));
  }

}
