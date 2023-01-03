import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConversionService } from 'src/services/conversion.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-conversion-history',
  template: `
    <div class="container">
      <h1 class="title">Conversion History</h1>

      <div class="history">
        <div class="table">
          <mat-table [dataSource]="dataSource" class="elevation">
            <ng-container matColumnDef="date">
              <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.date }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="event">
              <mat-header-cell *matHeaderCellDef>Event</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.event }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="actions">
              <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
              <mat-cell *matCellDef="let row" class="actions-col">
                <div class="action-btn primary" (click)="view(row)">
                  <mat-icon>remove_red_eye</mat-icon>
                  <span class="btn-text">View</span>
                </div>
                <div class="action-btn warn" (click)="delete(row)">
                  <mat-icon>deleter_forever</mat-icon>
                  <span class="btn-text">Delete from history</span>
                </div>
              </mat-cell>
            </ng-container>

            <mat-header-row
              *matHeaderRowDef="displayedColumns; sticky: true"
            ></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>x
          </mat-table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./conversion-history.component.scss'],
})
export class ConversionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'event', 'actions'];
  dataSource: Array<{
    date: string;
    event: string;
    id: string;
    amount: number;
    from: string;
    to: string;
  }> = [];

  $destroy = new Subject();

  constructor(private state: StateService, private conversionService: ConversionService, private router: Router) {}

  ngOnInit(): void {
    this.manipulateHistory();
  }

  manipulateHistory() {
    this.state.pipe(takeUntil(this.$destroy)).subscribe((state) => {
      state?.conversions.forEach((record) => {
        record.conversions.forEach((conversion) => {
          this.dataSource.push({
            date: record.date,
            event: `Converted an amount of ${conversion.amount} ${conversion.from} to ${conversion.to}`,
            amount: conversion.amount,
            from: conversion.from || '',
            to: conversion.to || '',
            id: conversion.id,
          });
        });
      });
    });
  }

  view(row: any) {
    this.conversionService.conversionParams.next({
      amount: row.amount,
      from: row.from,
      to: row.to,
      date: row.date,
    })

    this.router.navigate(['/currency-converter']);
  }

  delete(row: any) {
    const data = this.dataSource.filter((record) => record.id !== row.id);
    this.dataSource = [];
    this.dataSource.push(...data);

    this.state.deleteConversionHistoryRecord(row.date, row.id);
  }
}
