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
  | { year: number; month: number; day: number };

export class CalendarDate {
  private _date: number[];

  static parse(value: CalendarDateInput): number[] {
    if (typeof value === "string") {
      value = value.split("T")[0];
      return value.split("-").map((v) => +v);
    } else if (value instanceof Date) {
      return [value.getFullYear(), value.getMonth() + 1, value.getDate()];
    } else {
      return [value.year, value.month, value.day];
    }
  }

  constructor(value?: CalendarDateInput) {
    if (value) {
      this._date = CalendarDate.parse(value);
    } else {
      this._date = CalendarDate.parse(new Date());
    }
  }

  private get date() {
    return new Date(this._date[0], this._date[1] - 1, this._date[2]);
  }

  get year(): number {
    return this._date[0];
  }
  set year(val: number) {
    this._date[0] = val;
  }

  get month(): number {
    return this._date[1];
  }
  set month(val: number) {
    this._date[1] = val;
  }

  get day(): number {
    return this._date[2];
  }
  set day(val: number) {
    this._date[2] = val;
  }

  clone(): CalendarDate {
    return new CalendarDate(this.toString());
  }

  setDay(val: number): CalendarDate {
    this.day = val;
    return this;
  }

  addYears(count: number): CalendarDate {
    this._date[0] += count;
    return this;
  }

  addMonths(count: number): CalendarDate {
    this._date = CalendarDate.parse(_addMonths(this.date, count));
    return this;
  }

  addDays(count: number): CalendarDate {
    console.log("addDays", count);
    console.log("  before", count, this._date);
    console.log("  -- ", _addDays(this.date, count));
    this._date = CalendarDate.parse(_addDays(this.date, count));
    console.log("  after", count, this._date);
    console.log("====");
    return this;
  }

  get daysInMonth(): number {
    return _getDaysInMonth(this.date);
  }

  isSameDay(cmp: CalendarDate): boolean {
    return _isSameDay(this.date, cmp.date);
  }

  get lastDayOfMonth(): CalendarDate {
    return new CalendarDate(_lastDayOfMonth(this.date));
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

  isValid(): boolean {
    return !!this.date;
  }

  format(tmpl: string): string {
    return _format(this.date, tmpl);
  }

  toString(): string {
    return this._date.join("-");
  }
}
