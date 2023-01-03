export interface Conversion {
  date: string;
  info: {rate: number};
  query: {from: string; to: string; amount: number};
  result: number;
  historical: boolean;
  success: boolean;
}
