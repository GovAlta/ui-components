import {
  addMonths as _addMonths,
  addDays as _addDays,
  format as _format,
  getDaysInMonth as _getDaysInMonth,
  isSameDay as _isSameDay,
  lastDayOfMonth as _lastDayOfMonth,
  setDate as _setDate,
  isSameMonth as _isSameMonth,
  isBefore as _isBefore,
  addYears as _addYears,
  isAfter as _isAfter,
} from "date-fns";

type CalendarDateInput =
  | string
  | Date
  | 0
  | { year: number; month: number; day: number };

export class CalendarDate {
  private _dateNums: number[];

  static parse(value: CalendarDateInput): number[] {
    if (typeof value === "string") {
      value = value.split("T")[0];
      return value.split("-").map((v) => +v);
    } else if (value instanceof Date) {
      return [value.getFullYear(), value.getMonth() + 1, value.getDate()];
    } else if (value === 0) {
      return [0, 0, 0];
    } else {
      return [value.year, value.month, value.day];
    }
  }

  static init(): CalendarDate {
    return new CalendarDate(0);
  }

  constructor(value?: CalendarDateInput) {
    if (value || value === 0) {
      this._dateNums = CalendarDate.parse(value);
    } else {
      this._dateNums = CalendarDate.parse(new Date());
    }
  }

  // Used internally to get the date value for the date_fns
  get date(): Date {
    return new Date(
      this._dateNums[0],
      this._dateNums[1] - 1,
      this._dateNums[2],
    );
  }

  get year(): number {
    return this._dateNums[0];
  }

  get month(): number {
    return this._dateNums[1];
  }

  get day(): number {
    return this._dateNums[2];
  }

  get dayOfWeek(): number {
    return this.date.getDay();
  }

  get daysInMonth(): number {
    return _getDaysInMonth(this.date);
  }

  get firstDayOfMonth(): CalendarDate {
    return new CalendarDate({ year: this.year, month: this.month, day: 1 });
  }

  get lastDayOfMonth(): CalendarDate {
    return new CalendarDate(_lastDayOfMonth(this.date));
  }

  get previousDay(): CalendarDate {
    return this.clone().addDays(-1);
  }

  get nextDay(): CalendarDate {
    return this.clone().addDays(1);
  }

  get previousWeek(): CalendarDate {
    return this.clone().addDays(-7);
  }

  get nextWeek(): CalendarDate {
    return this.clone().addDays(7);
  }

  get previousMonth(): CalendarDate {
    return this.clone().addMonths(-1);
  }

  get nextMonth(): CalendarDate {
    return this.clone().addMonths(1);
  }

  clone(): CalendarDate {
    return new CalendarDate(this.toString());
  }

  setYear(val: number) {
    this._dateNums[0] = val;
  }

  setMonth(val: number) {
    this._dateNums[1] = val;
  }

  setDay(val: number): CalendarDate {
    this._dateNums[2] = val;
    return this;
  }

  addYears(count: number): CalendarDate {
    this._dateNums[0] += count;
    return this;
  }

  addMonths(count: number): CalendarDate {
    this._dateNums = CalendarDate.parse(_addMonths(this.date, count));
    return this;
  }

  addDays(count: number): CalendarDate {
    this._dateNums = CalendarDate.parse(_addDays(this.date, count));
    return this;
  }

  isSameDay(cmp: CalendarDate): boolean {
    return _isSameDay(this.date, cmp.date);
  }

  isSameMonth(value: CalendarDate): boolean {
    return _isSameMonth(this.date, value.date);
  }

  isBefore(cmp: CalendarDate): boolean {
    return _isBefore(this.date, cmp.date);
  }

  isAfter(cmp: CalendarDate): boolean {
    return _isAfter(this.date, cmp.date);
  }

  isZero(): boolean {
    return (
      this._dateNums[0] === 0 &&
      this._dateNums[1] === 0 &&
      this._dateNums[2] === 0
    );
  }

  isValid(): boolean {
    // ensure it's a valid date
    // E.g. "2025-02-31" would be invalid because the date does not exist
    const comparisonDate = new Date(this.toString());
    if (
      isNaN(comparisonDate.getTime()) ||
      this.toString() !== comparisonDate.toISOString().split("T")[0]
    ) {
      return false;
    }

    return true;
  }

  format(tmpl: string): string {
    if (this.isZero()) {
      return "";
    }
    return _format(this.date, tmpl);
  }

  toString(): string {
    if (this.isZero()) {
      return "";
    }
    return this._dateNums
      .map((num) => (`${num}`.length < 2 ? `0${num}` : `${num}`))
      .join("-");
  }
}
