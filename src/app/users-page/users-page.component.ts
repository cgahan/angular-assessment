import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from '../user';

@Injectable()
@Component({
  selector: 'users-page',
  styleUrls: ['./users-page.component.scss'],
  template: /*html*/ `<main>
    <div *ngIf="errorMessage" class="error-box">
      <span>{{ errorMessage }}</span
      ><a href="javascript:location.reload()">Refresh</a>
    </div>
    <app-user-details
      *ngFor="let user of selectedUsers"
      [user]="user"
    ></app-user-details>
    <app-user-table
      [users]="allUsers"
      (userSelectedEvent)="setSelectedUsers($event)"
    ></app-user-table>
  </main>`,
})
export class UsersPageComponent {
  allUsers: User[] = [];
  currentUser?: User = undefined;
  selectedUsers?: User[] = [];
  errorMessage?: string = undefined;

  setSelectedUsers(indices: Set<number>) {
    this.selectedUsers = [...indices.values()].map((x) => this.allUsers[x]);
  }

  constructor(private http: HttpClient) {
    http
      .get<User[]>('/assets/users.json')
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          const { status, error } = err;
          console.error(
            status === 0
              ? 'Client-side or network error:'
              : `Backend error ${status}:`,
            error
          );
          return throwError(
            'An error occurred. Please try refreshing the page.'
          );
        })
      )
      .subscribe(
        (next) => (this.allUsers = next ?? []),
        (error) => (this.errorMessage = error)
      );
  }
}
