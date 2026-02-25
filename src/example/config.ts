import type { LayoutConfig } from "../modular-grid/grid-layout-2";

export const layoutConfig: LayoutConfig = {
  mobileScreen: {
    minGridWidth: 360,
    maxGridWidth: 720,
    columnCount: 6,
    gutter: 16,
    margin: "sameAsGutter",
  },
  desktopScreen: {
    minGridWidth: 1024,
    maxGridWidth: 1440,
    columnCount: 12,
    gutter: 32,
    margin: "sameAsGutter",
  },
};
