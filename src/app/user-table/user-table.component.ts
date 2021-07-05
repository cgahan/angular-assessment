import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-table',
  styleUrls: ['./user-table.component.scss'],
  template: /*html*/ `<section>
    <div class="card no-padding">
      <table>
        <caption>
          <h1>User Information</h1>
        </caption>
        <thead>
          <tr
            (click)="toggleUserSelected()"
            [attr.data-selected]="areAllSelected() ? '' : undefined"
          >
            <th class="checkbox"></th>
            <th>Name</th>
            <th>Account Number</th>
            <th>Country</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="
              let user of users | slice: pageStart:pageStart + rowsPerPage;
              let i = index
            "
            (click)="toggleUserSelected(i + pageStart)"
            [attr.data-selected]="isSelected(i + pageStart) ? '' : undefined"
          >
            <td class="checkbox"></td>
            <td>{{ user.name }}</td>
            <td>{{ user.accountNumber }}</td>
            <td>{{ user.country }}</td>
            <td>{{ user.dateJoined | date: 'd MMM y' }}</td>
          </tr>
          <tr *ngIf="!users?.length">
            <td colspan="5" style="text-align: center;">No users found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer>
      <div>
        Rows per page:
        <app-custom-select
          name="rowsPerPage"
          [rows]="[
            ['1', 1],
            ['10', 10],
            ['20', 20],
            ['30', 30],
            ['40', 40],
            ['50', 50]
          ]"
          [initialValue]="[rowsPerPage + '', rowsPerPage]"
          (itemSelectedEvent)="changeRowsPerPage($event)"
        ></app-custom-select>
      </div>
      <div>
        {{ paginatorMessage }}
      </div>
      <div class="page-navigator">
        <button class="ghost" (click)="prevPage()">❮</button>
        <button class="ghost" (click)="nextPage()">❯</button>
      </div>
    </footer>
  </section>`,
})
export class UserTableComponent implements OnChanges {
  @Input() users: User[] = [];
  @Output() userSelectedEvent = new EventEmitter<Set<number>>();
  selectedIndices: Set<number> = new Set();
  paginatorMessage: string = '';
  pageStart: number = 0; // Stores currentPage * rowsPerPage for optimisation

  rowsPerPage: number = 10;
  currentPage: number = 0;

  constructor() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePagination(changes?.currentPage?.currentValue);
  }

  changeRowsPerPage(rowsPerPage: number) {
    this.rowsPerPage = rowsPerPage;
    // Move to new page so that row at top of table is still visible
    this.updatePagination(Math.floor(this.pageStart / rowsPerPage));
  }

  updatePagination(currentPage?: number) {
    if (typeof currentPage === 'undefined') {
      currentPage = this.currentPage;
    } else {
      this.currentPage = currentPage;
    }

    const totalRows = this.users?.length;
    this.pageStart = currentPage * this.rowsPerPage;
    this.paginatorMessage = `${totalRows ? this.pageStart + 1 : 0}-${Math.min(
      totalRows,
      this.pageStart + this.rowsPerPage
    )} of ${totalRows}`;
  }
  prevPage() {
    if (this.currentPage === 0) return;
    this.updatePagination(this.currentPage - 1);
  }
  nextPage() {
    if ((this.currentPage + 1) * this.rowsPerPage >= this.users.length) return;
    this.updatePagination(this.currentPage + 1);
  }

  isSelected(index: number): boolean {
    return this.selectedIndices.has(index);
  }
  areAllSelected(): boolean {
    return (
      this.users.length > 0 && this.selectedIndices.size === this.users.length
    );
  }

  toggleUserSelected(index?: number) {
    if (typeof index === 'undefined') {
      this.selectedIndices = this.areAllSelected()
        ? new Set()
        : new Set(Array.from({ length: this.users.length }, (_, i) => i));
    } else if (this.isSelected(index)) {
      this.selectedIndices.delete(index);
    } else {
      this.selectedIndices.add(index);
    }
    this.userSelectedEvent.emit(this.selectedIndices);
  }
}
