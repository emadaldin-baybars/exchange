import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--
      The content below will be a header, a router-outlet and a footer.
    -->
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'exchange';
}
