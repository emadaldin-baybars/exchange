
export type StateType = State | undefined | null;

export interface State{
  conversions: ConversionDayRecord[];
}

export interface ConversionDayRecord{
  date: string;
  conversions: ConversionRecord[];
}

export interface ConversionRecord{
  id: string;
  from: string|undefined;
  to: string|undefined;
  amount: number;
  result: number;
  rate: number;
}
