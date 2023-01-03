import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, pipe, Subject, takeUntil } from 'rxjs';
import { Conversion } from 'src/models/conversion';
import { ConversionRecord } from 'src/models/state';
import { ConversionService } from 'src/services/conversion.service';
import { StateService } from 'src/services/state.service';
import { formatDate } from 'src/utils/date.util';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-conversion-form',
  template: `
    <div class="row">
      <div class="col-12">
        <h1 class="page-title">I want to convert</h1>
      </div>
    </div>

    <div>
      <form class="form" [formGroup]="conversionForm">
        <mat-form-field class="full-width mr-10">
          <mat-label>Amount</mat-label>
          <input matInput placeholder="amount" formControlName="amount" />
        </mat-form-field>

        <mat-form-field class="full-width mr-10 f-2">
          <mat-label>From</mat-label>
          <input matInput placeholder="from" formControlName="from" />
        </mat-form-field>

        <button mat-fab color="basic" class="mr-10" (click)="switchCurrency()">
          <mat-icon>compare_arrows</mat-icon>
        </button>

        <mat-form-field class="full-width f-2 mr-10">
          <mat-label>To</mat-label>
          <input matInput placeholder="to" formControlName="to" />
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="convert()">
          Convert
        </button>
      </form>
    </div>

    <div class="conversion-container" *ngIf="converted">
      <div class="conversion-result">
        <div class="before">{{ conversionForm.value.amount }} {{ from }}</div>
        <div>=</div>
        <div class="after">{{ result }} {{ to }}</div>
      </div>
    </div>

    <div class="rate-container" *ngIf="converted">
      <div class="rate">
        <div>1 {{ from }} = {{ rate }} {{ to }}</div>
        <div>1 {{ to }} = {{ xrate }} {{ from }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./conversion-form.component.scss'],
})
export class ConversionFormComponent implements OnInit {
  conversionForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  });

  from: string = '';
  to: string = '';
  rate: number = 0;
  xrate: number = 0;

  converted = false;

  result: number = 0;

  paramsSet = false;
  $destroy = new Subject();

  constructor(
    private conversionService: ConversionService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.conversionService.conversionParams
      .pipe(takeUntil(this.$destroy))
      .subscribe((params) => {
        this.conversionForm.patchValue({
          from: params.from,
          to: params.to,
          amount: `${params.amount}`,
        });
        this.paramsSet = true;
        this.convert();
      });
  }

  switchCurrency() {
    const from = this.conversionForm.value.from;
    const to = this.conversionForm.value.to;

    this.conversionForm.patchValue({
      from: to,
      to: from,
    });
  }

  convert() {
    // check if the form is valid
    if (this.conversionForm.invalid) {
      return;
    }

    // need to push the values to the service
    if (!this.paramsSet) {
      this.conversionService.conversionParams.next({
        from: this.conversionForm.value.from || '',
        to: this.conversionForm.value.to || '',
        amount: +(this.conversionForm.value.amount || 0),
        date: formatDate(new Date()),
      });
    }

    // values need to be checked before sending to the service
    if (
      this.conversionForm.value.from &&
      this.conversionForm.value.to &&
      this.conversionForm.value.amount
    ) {
      this.conversionService
        .convert(
          this.conversionForm.value.from,
          this.conversionForm.value.to,
          +this.conversionForm.value.amount,
          this.conversionService.conversionParams.value.date
        )
        .pipe(takeUntil(this.$destroy))
        .subscribe((res: Conversion) => {
          this.converted = true;
          this.conversionService.showHistory.next(true);
          this.result = res.result;

          this.from = res.query.from;
          this.to = res.query.to;
          this.rate = res.info.rate;
          this.xrate = 1 / res.info.rate;

          this.paramsSet = false;

          this.saveConversion(res.date, {
            id: uuidv4(),
            from: res.query.from,
            to: res.query.to,
            amount: +res.query.amount,
            result: res.result,
            rate: res.info.rate,
          });
        });
    }
  }

  saveConversion(date: string, conversionRecord: ConversionRecord) {
    this.state.addConversion(date, conversionRecord);
  }
}
