import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientDetails } from '../models/clientdetails';
import { LoanDetails } from '../models/loandetails';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  loanDetails: LoanDetails;
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })


  };

    constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Clients/';
  }

   getClients(): Observable<ClientDetails[]> {
    return this.http.get<ClientDetails[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getClient(clientId: number): Observable<ClientDetails> {
      return this.http.get<ClientDetails>(this.myAppUrl + this.myApiUrl + clientId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveClient(client): Observable<ClientDetails> {
      return this.http.post<ClientDetails>(this.myAppUrl + this.myApiUrl, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateClient(postId: number, client): Observable<ClientDetails> {
      return this.http.put<ClientDetails>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteClient(clientId: number): Observable<ClientDetails> {
      return this.http.delete<ClientDetails>(this.myAppUrl + this.myApiUrl + clientId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  generatePaymentSchedule(loanTerm, fixedRate, loanAmount) {
    let termsInMonths = loanTerm * 12; //n
    let monthlyRate = (fixedRate/100)/12; //r

    let discountFactor = (Math.pow(1+monthlyRate, termsInMonths) - 1);
    let discountFactor2 = monthlyRate*(Math.pow(1+monthlyRate,termsInMonths));

    let monthlyAmortization = loanAmount/(discountFactor/discountFactor2);
    let totalLoanAmount = monthlyAmortization * termsInMonths;

    this.loanDetails = {
      termsInMonths: termsInMonths,
      monthlyAmortization: monthlyAmortization,
      totalLoanAmount: totalLoanAmount
    }

    return this.loanDetails;
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
