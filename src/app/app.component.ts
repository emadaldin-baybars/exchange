import { Component } from '@angular/core';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-root',
  template: `
    <!--
      The content below will be a header and a router-outlet.
    -->
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'exchange';

  constructor(private state: StateService) {
    this.state.init();
  }
}
