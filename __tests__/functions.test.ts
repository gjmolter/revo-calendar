/**
 * @jest-environment jsdom
 */

import { LEAP_MONTH_DAYS, REGULAR_MONTH_DAYS } from "../src/helpers/consts";
import helperFunctions from "../src/helpers/functions";
import translations from "../src/helpers/translations";

test("2020-11-32 is not a valid Date", () => {
  expect(helperFunctions.isValidDate(new Date("2020-11-32"))).toBe(false);
});

test("2020-12-07 is a valid Date", () => {
  expect(helperFunctions.isValidDate(new Date("2020-12-07"))).toBe(true);
});

test("Feb 2000 had 29 days", () => {
  expect(helperFunctions.isLeapYear(2000)).toStrictEqual(LEAP_MONTH_DAYS);
});

test("Feb 2001 had 28 days", () => {
  expect(helperFunctions.isLeapYear(2001)).toStrictEqual(REGULAR_MONTH_DAYS);
});

test("new Date() is today", () => {
  var today = new Date();
  expect(helperFunctions.isToday(today.getDate(), today.getMonth(), today.getFullYear())).toBe(true);
});

test("null RGBA is null", () => {
  expect(helperFunctions.decomposeRGBA(null)).toStrictEqual(null);
});

test("transparent RGBA is [0, 0, 0, 0]", () => {
  expect(helperFunctions.decomposeRGBA("transparent")).toStrictEqual([0, 0, 0, 0]);
});

test("#000 RGBA is [0, 0, 0, 1]", () => {
  expect(helperFunctions.decomposeRGBA("#000")).toStrictEqual([0, 0, 0, 1]);
});

test("#000A RGBA is [0, 0, 0, 0.66]", () => {
  expect(helperFunctions.decomposeRGBA("#000A")).toStrictEqual([0, 0, 0, 0.6666666666666666]);
});

test("coral RGBA is [255, 127, 80, 1]", () => {
  expect(helperFunctions.decomposeRGBA("coral")).toStrictEqual([255, 127, 80, 1]);
});

test("rgb(0,255,0) RGBA is [0, 255, 0, 1]", () => {
  expect(helperFunctions.decomposeRGBA("rgb(0,255,0)")).toStrictEqual([0, 255, 0, 1]);
});

test("rgba(0,255,0,0.1) RGBA is [0, 255, 0, 1]", () => {
  expect(helperFunctions.decomposeRGBA("rgba(0,255,0,0.1)")).toStrictEqual([0, 255, 0, 0.1]);
});

test("#00FF00 RGBA is [0, 255, 0, 1]", () => {
  expect(helperFunctions.decomposeRGBA("#00FF00")).toStrictEqual([0, 255, 0, 1]);
});

test("abc123 RGBA is not valid", () => {
  expect(helperFunctions.decomposeRGBA("abc123")).toStrictEqual(null);
});

test("#0000FF0 RGBA is [0, 0, 255, 0]", () => {
  expect(helperFunctions.decomposeRGBA("#0000FF0")).toStrictEqual([0, 0, 255, 0]);
});

test("#FFFFFF RGB is rgb(255, 255, 255)", () => {
  expect(helperFunctions.getRGBColor("#FFFFFF")).toBe("rgb(255, 255, 255)");
});

test("#FFFFFF RGBA with half alpha is rgba(255, 255, 255, 0.5)", () => {
  expect(helperFunctions.getRGBAColorWithAlpha("#FFFFFF", 0.5)).toBe("rgba(255, 255, 255, 0.5)");
});

test("Tuesday is the first day of Dec 2020", () => {
  expect(helperFunctions.getFirstWeekDayOfMonth(11, 2020)).toBe(2);
});

test("11 ordinal is 11th", () => {
  expect(helperFunctions.getNumberWithOrdinal(11)).toBe("11th");
});

test("23 ordinal is 23rd", () => {
  expect(helperFunctions.getNumberWithOrdinal(23)).toBe("23rd");
});

test("Date formatting works as expected", () => {
  expect(helperFunctions.getFormattedDate(new Date(2020, 11, 7), "dddd, DD de MMMM de YYYY", "pt", translations)).toBe(
    "Segunda-Feira, 07 de Dezembro de 2020"
  );
});

test("Time formatting works as expected (24h)", () => {
  expect(helperFunctions.getFormattedTime(new Date(2020, 11, 7, 21, 41), true)).toBe("21:41");
});

test("Time formatting works as expected (AM/PM)", () => {
  expect(helperFunctions.getFormattedTime(new Date(2020, 11, 7, 21, 41), false)).toBe("9:41 PM");
});
