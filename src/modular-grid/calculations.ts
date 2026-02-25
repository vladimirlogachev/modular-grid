import type { CSSProperties } from "react";
import type { GridState } from "./types";

/**
 * Core formula (identical to Elm):
 *   stepWidth = (contentWidth - gutter * (columnCount - 1)) / columnCount
 *   result = stepWidth * numberOfSteps + gutter * (numberOfSteps - 1)
 */
export function widthOfGridStepsFloat(
  grid: GridState,
  numberOfSteps: number,
): number {
  const stepWidth =
    (grid.contentWidth - grid.gutter * (grid.columnCount - 1)) /
    grid.columnCount;
  return stepWidth * numberOfSteps + grid.gutter * (numberOfSteps - 1);
}

/**
 * Width style: flex:1 + ceil max-width + float min-width.
 * Matches Elm's widthOfGridSteps exactly.
 */
export function widthOfGridStepsStyle(
  grid: GridState,
  numberOfSteps: number,
): CSSProperties {
  const w = widthOfGridStepsFloat(grid, numberOfSteps);
  return {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: `${Math.ceil(w)}px`,
    minWidth: `${w}px`,
  };
}

/**
 * Height style: float max-height + float min-height.
 * Note: height uses float for BOTH max and min (unlike width which uses ceil for max).
 */
export function heightOfGridStepsStyle(
  grid: GridState,
  numberOfSteps: number,
): CSSProperties {
  const h = widthOfGridStepsFloat(grid, numberOfSteps);
  return {
    maxHeight: `${h}px`,
    minHeight: `${h}px`,
  };
}

/** Scale dimensions proportionally to a grid width, maintaining aspect ratio. */
export function scaleProportionallyFloat(
  grid: GridState,
  params: { originalWidth: number; originalHeight: number; widthSteps: number },
): { width: number; height: number } {
  const w = widthOfGridStepsFloat(grid, params.widthSteps);
  return {
    width: w,
    height: w * (params.originalHeight / params.originalWidth),
  };
}

/**
 * Style for proportionally scaled element.
 * Matches Elm's scaleProportionallyToWidthOfGridSteps:
 * overrides both max and min with float values for both width and height.
 */
export function scaleProportionallyStyle(
  grid: GridState,
  params: { originalWidth: number; originalHeight: number; widthSteps: number },
): CSSProperties {
  const { width, height } = scaleProportionallyFloat(grid, params);
  return {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
    maxHeight: `${height}px`,
    minHeight: `${height}px`,
  };
}
