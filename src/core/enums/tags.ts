/**
 * CORE — cross-cutting tags every app uses.
 * Feature tags (e.g. @checkout, @booking) are app-specific:
 * declare them in src/apps/<app>/tags.ts, never here.
 */
export enum Tag {
  UI = '@ui',
  API = '@api',
  Smoke = '@smoke',
  Regression = '@regression',
}
