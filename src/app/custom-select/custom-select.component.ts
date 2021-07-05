import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild,
  SimpleChanges,
} from '@angular/core';

// input[type="hidden"] provided to expose the control's value to forms

@Component({
  selector: 'app-custom-select',
  template: /*html*/ `
    <details
      #toggle
      class="ghost"
      [attr.name]="undefined"
      [class.expand-up]="expandUpwards"
      [style]="'--num-items: ' + rows?.length ?? 0"
    >
      <summary>
        {{ selected[0] ?? placeholder ?? 'Select...'}}
        <input
          type="hidden"
          [value]="selected[1]"
          [attr.name]="name ?? undefined"
        />
      </summary>
      <ul class="card no-padding">
        <li *ngFor="let row of rows">
          <button class="ghost" (click)="selectOption(row)">
            {{ row[0] }}
          </button>
        </li>
      </ul>
    </details>
  `,
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() name?: string = undefined;
  @Input() placeholder?: string = undefined;
  @Input() initialValue: [string | undefined, any] = [undefined, undefined];
  @Input() rows: [string, any][] = [];
  @Output() itemSelectedEvent = new EventEmitter<any>();
  selected: [string | undefined, any] = [undefined, undefined];

  @ViewChild('toggle', { static: false }) elementRef?: ElementRef;

  expandUpwards: boolean = false;
  #intersectionObserver?: IntersectionObserver = undefined;

  selectOption(option: [string | undefined, any]) {
    this.close();
    this.selected = option;
    this.itemSelectedEvent.emit(option[1]);
  }

  selectOptionByValue(option: any) {
    this.selectOption(
      this.rows.find(([label, value]) => value === option) ?? [
        undefined,
        undefined,
      ]
    );
  }

  updateObserver(): void {
    // Guess height of expanded dropdown (erring on the larger side)
    // Assumes rows of 2em height with 1px gap between them, leaves room for an extra 1.5 rows
    const el = this.elementRef?.nativeElement;
    if (!el) return;
    const emInPixels = parseFloat(getComputedStyle(el).fontSize);
    const numRows = this.rows?.length;
    const expectedHeight = Math.floor((numRows + 1.5) * (2 * emInPixels + 1));

    // Purge outdated observer if it exists
    if (this.#intersectionObserver) this.#intersectionObserver.disconnect();

    // When expanded dropdown would not fit inside viewport, have it expand up instead of down
    this.#intersectionObserver = new IntersectionObserver(
      (entries, observer) =>
        (this.expandUpwards = !entries.some(
          ({ isIntersecting }) => isIntersecting
        )),
      {
        rootMargin: `0px 0px -${expectedHeight}px 0px`, // Set margin-bottom of viewport observation window
      }
    );
    this.#intersectionObserver.observe(el);
  }

  close(): void {
    if (this.elementRef) this.elementRef.nativeElement.open = false;
  }

  ngOnInit(): void {
    if (this.initialValue?.length) this.selected = this.initialValue;
  }
  ngAfterViewInit(): void {
    this.updateObserver();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // If the number of rows has changed, re-observe for the dropdown's new height
    if (
      changes?.rows?.currentValue?.length !=
      changes?.rows?.previousValue?.length
    ) {
      this.updateObserver();
    }
  }
  ngOnDestroy(): void {
    if (this.#intersectionObserver) this.#intersectionObserver.disconnect();
  }
}
