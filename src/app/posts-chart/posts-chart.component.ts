import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-posts-chart',
  template: /*html*/ `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      [attr.viewBox]="viewBox"
    >
      <path class="gridlines" [attr.d]="gridlines" />
      <g class="bars">
        <g
          class="bar"
          *ngFor="let datum of dataCumulative; let i = index"
          x="0"
          y="0"
          [attr.transform]="barTransform(i)"
        >
          <title>{{ datum ?? 0 }} posts</title>
          <rect
            [attr.y]="chartHeight - barHeights[i]"
            [attr.width]="barWidth"
            [attr.height]="barHeights[i]"
          />
          <text
            class="axis-text"
            [attr.x]="barWidth / 2"
            text-anchor="middle"
            [attr.y]="chartHeight + 40"
          >
            {{ i + 1 }} week{{ i ? 's' : '' }}
          </text>
        </g>
      </g>
      <g class="axis-labels">
        <text
          text-anchor="middle"
          transform="rotate(-90)"
          [attr.x]="-chartHeight / 2"
          [attr.y]="-90"
        >
          Number of Posts
        </text>
        <text
          text-anchor="middle"
          [attr.x]="chartWidth / 2"
          [attr.y]="chartHeight + 80"
        >
          Weeks of Membership
        </text>
      </g>
      <g>
        <text
          *ngFor="let v of [].constructor(yAxisDivisions + 1); let i = index"
          class="axis-text"
          [attr.x]="-20"
          [attr.y]="i * yIncrement"
          text-anchor="end"
          dominant-baseline="middle"
        >
          {{ maxValue - (maxValue * i) / yAxisDivisions }}
        </text>
      </g>
    </svg>
  `,
  styleUrls: ['./posts-chart.component.scss'],
})
export class PostsChartComponent implements OnChanges {
  @Input() data: number[] = [];
  dataCumulative: number[] = [];
  maxValue: number = 1000;

  barWidth: number = 100;
  barHeights: number[] = [];
  barPadding: number = 30;
  yAxisDivisions: number = 5;

  chartMargin = { left: 110, right: 0, top: 20, bottom: 80 };
  chartHeight: number = 400;
  chartWidth: number = 0;
  viewBox: string = '';

  yIncrement: number = 0;
  gridlines: string = '';

  barTransform(i: number): string {
    return `translate(${
      this.barPadding + i * (this.barWidth + this.barPadding)
    } 0)`;
  }

  updateChart(): void {
    this.dataCumulative = this.data.reduce(
      (prev: number[], curr: number) => [
        ...prev,
        (prev[prev.length - 1] ?? 0) + curr,
      ],
      []
    );

    // Maximum value is 1000 or the highest value in the list, rounded up to nearest 100
    this.maxValue =
      100 * Math.ceil(Math.max(1_000, ...this.dataCumulative) / 100);

    this.barHeights = this.dataCumulative.map(
      (x) => (this.chartHeight * x) / this.maxValue
    );

    this.chartWidth =
      this.barPadding +
      this.dataCumulative.length * (this.barWidth + this.barPadding);

    this.viewBox = [
      -this.chartMargin.left,
      -this.chartMargin.top,
      this.chartWidth + this.chartMargin.left + this.chartMargin.right,
      this.chartHeight + this.chartMargin.top + this.chartMargin.bottom,
    ].join(' ');

    this.yIncrement = this.chartHeight / this.yAxisDivisions;
    this.gridlines = `
    M 0,0 V ${this.chartHeight} H ${this.chartWidth}
    ${Array.from(
      { length: this.yAxisDivisions },
      (_, i) => `M 0,${i * this.yIncrement} H ${this.chartWidth}`
    ).join(' ')}
  `;
  }

  constructor() {
    this.updateChart();
  }
  ngOnChanges(): void {
    this.updateChart();
  }
}
