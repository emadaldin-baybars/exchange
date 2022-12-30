import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-lg navbar-dark bg-dark elevation">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="#"><span class="light">Currency</span><span class="boldy">Exchange</span></a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" aria-current="page" routerLink="/currency-converter">CURRENCY CONVERTER</a>
            <a class="nav-link" routerLink="/conversion-history">CONVERSION HISTORY</a>
          </div>
        </div>

        <!-- logout button -->
        <div>
          <span>Logout</span>
        </div>


      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
