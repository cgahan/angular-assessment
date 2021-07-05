import { Component, Input } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-user-details',
  styleUrls: ['./user-details.component.scss'],
  template: /*html*/ `<section class="card">
    <div>
      <h1>{{ user?.name ?? "(No User)" }}</h1>
      <dl>
        <div>
          <dt>Email Address:</dt>
          <dd>{{ user?.email ?? "—" }}</dd>
        </div>

        <div>
          <dt>Postal Address:</dt>
          <dd>{{ user?.postalAddress ?? "—" }}</dd>
        </div>

        <div>
          <dt>Phone Number:</dt>
          <dd>{{ user?.phoneNumber ?? "—" }}</dd>
        </div>

        <div>
          <dt>Favorite Band:</dt>
          <dd>{{ user?.favoriteBand ?? "—" }}</dd>
        </div>
      </dl>
    </div>
    <figure class="chart">
      <app-posts-chart [data]="user?.postsPerWeek ?? []"></app-posts-chart>
    </figure>
  </section> `,
})
export class UserDetailsComponent {
  @Input() user?: User = undefined;
}
