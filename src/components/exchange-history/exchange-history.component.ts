import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, filter, Subject, take, takeUntil } from 'rxjs';
import { ConversionService } from 'src/services/conversion.service';
import { formatDate } from 'src/utils/date.util';

@Component({
  selector: 'app-exchange-history',
  template: `
    <div>
      <h1 class="title">Exchange History</h1>

      <div class="controls">
        <form [formGroup]="controlForm">
          <mat-form-field appearance="fill">
            <mat-label>Duration</mat-label>
            <mat-select formControlName="duration">
              <mat-option
                *ngFor="let duration of durations"
                [value]="duration.value"
              >
                {{ duration.viewValue }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-radio-group
            aria-label="Select an option"
            formControlName="display"
          >
            <mat-radio-button value="table" checked>Table</mat-radio-button>
            <mat-radio-button value="chart">Chart</mat-radio-button>
          </mat-radio-group>
        </form>
      </div>

      <div class="tables-container">
        <div class="table" *ngIf="controlForm.value.display == 'table'">
          <mat-table [dataSource]="dataSource" class="scrollable elevation">
            <ng-container matColumnDef="date">
              <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.date }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="rate">
              <mat-header-cell *matHeaderCellDef>Exchange rate</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.rate }}</mat-cell>
            </ng-container>

            <mat-header-row
              *matHeaderRowDef="displayedColumns; sticky: true"
            ></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
          </mat-table>
        </div>

        <div class="table">
          <mat-table [dataSource]="statisticsDataSource" class="elevation">
            <ng-container matColumnDef="name">
              <mat-header-cell *matHeaderCellDef>Statistics</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="value">
              <mat-header-cell *matHeaderCellDef></mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.value }}</mat-cell>
            </ng-container>

            <mat-header-row
              *matHeaderRowDef="statisticsDisplayedColumns"
            ></mat-header-row>
            <mat-row
              *matRowDef="let row; columns: statisticsDisplayedColumns"
            ></mat-row>
          </mat-table>
        </div>

        <div class="table" *ngIf="controlForm.value.display == 'chart'">
          <!-- <ngx-charts-sparkline [results]="dataSource|async"></ngx-charts-sparkline> -->
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./exchange-history.component.scss'],
})
export class ExchangeHistoryComponent implements OnInit, OnDestroy {
  controlForm: FormGroup = new FormGroup({
    duration: new FormControl('7'),
    display: new FormControl('table'),
  });

  displayedColumns: string[] = ['date', 'rate'];
  dataSource: BehaviorSubject<Array<{ date: string; rate: number }>> =
    new BehaviorSubject<Array<{ date: string; rate: number }>>([]);

  statisticsDisplayedColumns: string[] = ['name', 'value'];
  statisticsDataSource: Array<{ name: string; value: number }> = [];

  durations = [
    { value: '7', viewValue: '7 days' },
    { value: '14', viewValue: '14 days' },
    { value: '30', viewValue: '30 days' },
  ];

  $destroy = new Subject();

  constructor(private convertService: ConversionService) {}

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
    this.getExchangeRateHistory();

    this.controlForm.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.getExchangeRateHistory();
      });

    this.dataSource.pipe(takeUntil(this.$destroy)).subscribe((data) => {
      console.log('data', data)
      this.setStasticsDataSource(data);
    });
  }

  getExchangeRateHistory() {

    const fromDate = formatDate(
      this.calculateStartDate(this.controlForm.value.duration)
    );
    const toDate = formatDate(new Date());

    this.convertService
      .getExchangeRateHistory(fromDate, toDate)
      .pipe(
        filter((data) => data.rates != null),
        take(1)
      )
      .subscribe((data) => {
        this.dataSource.next(
          Object.keys(data.rates).map((key) => {
            return {
              date: key,
              rate: data.rates[key][
                this.convertService.conversionParams.value.to
              ],
            };
          })
        );
      });
  }

  setStasticsDataSource(data: Array<{ date: string; rate: number }>) {
    this.statisticsDataSource = [
      {
        name: 'Lowest',
        value: Math.min(...data.map((item) => item.rate)),
      },
      {
        name: 'Highest',
        value: Math.max(...data.map((item) => item.rate)),
      },
      {
        name: 'Average',
        value:
          data.reduce((a, b) => a + b.rate, 0) /
          data.length,
      },
    ];
  }

  calculateStartDate(before: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - before);
    return date;
  }
}
