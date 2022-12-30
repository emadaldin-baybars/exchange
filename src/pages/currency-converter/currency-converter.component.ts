import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-converter',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>I want to convert</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <form class="example-form">
            <mat-form-field class="example-full-width">
              <mat-label>Favorite food</mat-label>
              <input matInput placeholder="Ex. Pizza" value="Sushi">
            </mat-form-field>

            <mat-form-field class="example-full-width">
              <mat-label>Leave a comment</mat-label>
              <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
            </mat-form-field>
          </form>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .container {
      margin: 50px;
    }

  `]
})
export class CurrencyConverterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
