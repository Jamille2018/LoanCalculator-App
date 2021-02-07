import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ClientDetails } from '../../models/clientdetails';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.css']
})
export class ClientAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  clientName: string;
  loanAmount: any;
  loanTerm:any;
  startOfLoan: any;
  fixedRate: any;
  clientId: number;
  errorMessage: any;
  existingClient: ClientDetails;
  isEdit:Boolean;
  isFixedRateChanged:Boolean = false;
  newStartOfLoan: string;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.clientName = 'clientName';
    this.fixedRate = 'fixedRate';
    this.loanAmount = 'loanAmount';
    this.loanTerm = 'loanTerm';
    this.startOfLoan = 'startOfLoan';
   
    if (this.avRoute.snapshot.params[idParam]) {
      this.clientId = this.avRoute.snapshot.params[idParam];
    }

  }

  ngOnInit() {
    // Form Builder
    this.form = this.formBuilder.group(
    {
      clientId: 0,
      'clientName': ['', [Validators.required]],
      'fixedRate': ['', [Validators.required]],
      'loanAmount': ['', [Validators.required]],
      'startOfLoan': ['', [Validators.required]],
      'loanTerm': ['', [Validators.required]],
    })
    
    if (this.clientId > 0) {
      this.actionType = 'Edit';
      this.isEdit = true;
      this.clientService.getClient(this.clientId)
        .subscribe(data => (
          this.form.controls[this.clientName].setValue(data.clientName),
          this.form.controls[this.fixedRate].setValue(data.fixedRate),
          this.form.controls[this.loanAmount].setValue(data.loanAmount),
          this.form.controls[this.loanTerm].setValue(data.loanTerm),
          this.form.controls[this.startOfLoan].setValue(this.clientService.formatDate(data.startOfLoan))
        ));
    }
  }
  save() {
    if (!this.form.valid) {
      alert("Please fill out all fields!");
      return;
    }

    if (this.actionType === 'Add') {
      this.isEdit = false;
      let client: ClientDetails = {
        clientName: this.form.get(this.clientName).value,
        loanAmount: this.form.get(this.loanAmount).value,
        loanTerm: this.form.get(this.loanTerm).value,
        startOfLoan: this.form.get(this.startOfLoan).value,
        fixedRate: this.form.get(this.fixedRate).value
      };

      this.clientService.saveClient(client)
        .subscribe((data) => {
          this.router.navigate(['/client', data.clientId]);
        });
    }

    if (this.actionType === 'Edit') {
      this.isEdit = true;
      let client: ClientDetails = {
        clientId: this.clientId,
        clientName: this.form.get(this.clientName).value, //editable
        loanAmount: this.form.get(this.loanAmount).value, 
        startOfLoan: this.form.get(this.startOfLoan).value, 
        loanTerm: this.form.get(this.loanTerm).value, 
        fixedRate: this.form.get(this.fixedRate).value //editable
      };
      this.clientService.updateClient(client.clientId, client)
        .subscribe((data) => {
          this.router.navigate(['/client/', client.clientId]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
  
  get clientNameForm() { return this.form.get(this.clientName); }
  get fixedRateForm() { return this.form.get(this.fixedRate); }
  get loanTermForm() { return this.form.get(this.loanTerm); }
  get startOfLoanForm() { return this.form.get(this.startOfLoan); }
  get loanAmountForm() { return this.form.get(this.loanAmount); }

}
