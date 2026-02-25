import type { CSSProperties, ReactNode } from "react";
import { useGrid } from "./context";
import { widthOfGridStepsFloat } from "./calculations";

// ── GridRow ──

/**
 * Horizontal row with gutter spacing between children.
 * Elm equivalent: `row [ width fill, spacing layout.grid.gutter ] elements`
 */
export function GridRow({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { grid } = useGrid();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: `${grid.gutter}px`,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// ── GridColumn ──

/**
 * Column with width in grid steps, arbitrary height.
 * Double-wrapped: outer div for grid sizing, inner div for user styles.
 *
 * Elm equivalent:
 *   column (alignTop :: height fill :: widthOfGridSteps layout widthSteps)
 *     [ column (width fill :: attrs) elements ]
 */
export function GridColumn({
  widthSteps,
  children,
  style,
  className,
}: {
  widthSteps: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { grid } = useGrid();
  const w = widthOfGridStepsFloat(grid, widthSteps);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        height: "100%",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        maxWidth: `${Math.ceil(w)}px`,
        minWidth: `${w}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}

// ── GridBox ──

/**
 * Box with both width and height in grid steps.
 * Double-wrapped: outer div for grid sizing, inner div for user styles.
 *
 * Elm equivalent:
 *   column (alignTop :: widthOfGridSteps layout widthSteps ++ heightOfGridSteps layout heightSteps)
 *     [ column ([ width fill, height fill ] ++ attrs) elements ]
 */
export function GridBox({
  widthSteps,
  heightSteps,
  children,
  style,
  className,
}: {
  widthSteps: number;
  heightSteps: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { grid } = useGrid();
  const w = widthOfGridStepsFloat(grid, widthSteps);
  const h = widthOfGridStepsFloat(grid, heightSteps);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        // Width: ceil for max, float for min
        maxWidth: `${Math.ceil(w)}px`,
        minWidth: `${w}px`,
        // Height: float for BOTH max and min
        maxHeight: `${h}px`,
        minHeight: `${h}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flexGrow: 1,
          boxSizing: "border-box",
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}

// ── Section ──

/**
 * Full-width section with centered, grid-constrained inner content.
 * outerStyle/outerClassName go on the full-width outer div (for backgrounds).
 * Children are inside the constrained inner div.
 *
 * Elm equivalent:
 *   section layout { outerElementAttrs } content =
 *     column (layoutOuterAttributes ++ outerAttrs)
 *       [ column (maxWidth innerMaxWidth, paddingXY margin 0, centerX) [ content ] ]
 */
export function Section({
  children,
  outerStyle,
  outerClassName,
}: {
  children: ReactNode;
  outerStyle?: CSSProperties;
  outerClassName?: string;
}) {
  const { grid, innerMaxWidth } = useGrid();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...outerStyle,
      }}
      className={outerClassName}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: `${innerMaxWidth}px`,
          paddingLeft: `${grid.margin}px`,
          paddingRight: `${grid.margin}px`,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
