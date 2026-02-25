// Shared types
export type {
  WindowSize,
  GridMargin,
  ScreenConfig,
  GridState,
  GridContextValue,
} from "./types";

// Shared context hook
export { useGrid } from "./context";

// Pure calculations
export {
  widthOfGridStepsFloat,
  widthOfGridStepsStyle,
  heightOfGridStepsStyle,
  scaleProportionallyFloat,
  scaleProportionallyStyle,
} from "./calculations";

// Shared components
export { GridRow, GridColumn, GridBox, Section } from "./components";

// Per-module re-exports
export * as GridLayout1 from "./grid-layout-1";
export * as GridLayout2 from "./grid-layout-2";
export * as GridLayout3 from "./grid-layout-3";
