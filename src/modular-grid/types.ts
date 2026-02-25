export type WindowSize = {
  width: number;
  height: number;
};

/**
 * Grid margin option.
 * - `"sameAsGutter"` – margin equals the gutter value.
 * - `number` – explicit margin in pixels.
 */
export type GridMargin = "sameAsGutter" | number;

/** Per-screen configuration. */
export type ScreenConfig = {
  minGridWidth: number;
  maxGridWidth: number | null;
  columnCount: number;
  gutter: number;
  margin: GridMargin;
};

/** Computed grid values for the current window size and screen class. */
export type GridState = {
  contentWidth: number;
  columnCount: number;
  gutter: number;
  margin: number;
};

/** Full context value provided to shared grid components. */
export type GridContextValue = {
  grid: GridState;
  window: WindowSize;
  innerMaxWidth: number;
  minBodyWidth: number;
};
