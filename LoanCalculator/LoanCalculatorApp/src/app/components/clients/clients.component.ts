import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { ClientDetails } from '../../models/clientdetails';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<ClientDetails[]>;
  isLoading:Boolean = true;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clients$ = this.clientService.getClients();
    this.clients$.subscribe(
      response => {
            this.isLoading = false;
      }
    )
  }

  search() {
  // Declare variables
     var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("clientTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  }
  

  // delete(clientId) {
  //   const ans = confirm('Do you want to delete client with id: ' + clientId + '?');
  //   if (ans) {
  //     this.clientService.deleteClient(clientId).subscribe((data) => {
  //       this.loadClients();
  //     });
  //   }
  // }
}


