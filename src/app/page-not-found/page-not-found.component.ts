import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<main>
    <p><strong>Error 404:</strong> Page not found</p>
    <p><a href="/">Return to home</a></p>
  </main>`,
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {}
