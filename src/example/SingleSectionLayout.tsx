import type { ReactNode } from "react";
import { useGrid } from "../modular-grid/context";
import textStyles from "./textStyles.module.css";

/**
 * Layout shell matching Elm's SingleSectionLayout:
 * - Root: min-width = mobileScreen.minGridWidth, body text style
 * - Outer: full width
 * - Inner: max-width = innerMaxWidth, horizontal padding = margin, centered
 */
export function SingleSectionLayout({ children }: { children: ReactNode }) {
  const { grid, innerMaxWidth, minBodyWidth } = useGrid();

  return (
    <div
      className={textStyles.body}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minWidth: `${minBodyWidth}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: `${innerMaxWidth}px`,
            padding: `${grid.margin}px`,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
