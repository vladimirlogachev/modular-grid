import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { ScreenConfig, GridState, GridContextValue, WindowSize } from "./types";
import { GridContext } from "./context";

// ── Types ──

export type ScreenClass = "mobile" | "desktop";

export type LayoutConfig = {
  mobileScreen: ScreenConfig;
  desktopScreen: ScreenConfig;
};

// ── Calculations ──

function resolveMargin(config: ScreenConfig): number {
  return config.margin === "sameAsGutter" ? config.gutter : config.margin;
}

function classifyScreen(
  config: LayoutConfig,
  windowWidth: number,
): ScreenClass {
  return windowWidth < config.desktopScreen.minGridWidth ? "mobile" : "desktop";
}

function initGrid(
  config: LayoutConfig,
  window: WindowSize,
): { screenClass: ScreenClass; contextValue: GridContextValue } {
  const screenClass = classifyScreen(config, window.width);

  let grid: GridState;
  let innerMaxWidth: number;

  switch (screenClass) {
    case "mobile": {
      const sc = config.mobileScreen;
      const gridMargin = resolveMargin(sc);
      const maxGridWidth = sc.maxGridWidth ?? window.width;
      // Mobile: clamp BOTH min and max
      const clampedGridWidth = Math.min(
        Math.max(sc.minGridWidth, window.width),
        maxGridWidth,
      );
      grid = {
        contentWidth: clampedGridWidth - gridMargin * 2,
        columnCount: sc.columnCount,
        gutter: sc.gutter,
        margin: gridMargin,
      };
      innerMaxWidth = sc.maxGridWidth ?? window.width;
      break;
    }
    case "desktop": {
      const sc = config.desktopScreen;
      const gridMargin = resolveMargin(sc);
      const maxGridWidth = sc.maxGridWidth ?? window.width;
      // Desktop: only clamp max, NOT min
      const clampedGridWidth = Math.min(maxGridWidth, window.width);
      grid = {
        contentWidth: clampedGridWidth - gridMargin * 2,
        columnCount: sc.columnCount,
        gutter: sc.gutter,
        margin: gridMargin,
      };
      innerMaxWidth = sc.maxGridWidth ?? window.width;
      break;
    }
  }

  return {
    screenClass,
    contextValue: {
      grid,
      window,
      innerMaxWidth,
      minBodyWidth: config.mobileScreen.minGridWidth,
    },
  };
}

// ── Context ──

const ScreenClassContext = createContext<ScreenClass | null>(null);

// ── Provider ──

export function GridLayout2Provider({
  config,
  children,
}: {
  config: LayoutConfig;
  children: ReactNode;
}) {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { screenClass, contextValue } = initGrid(config, windowSize);

  return (
    <ScreenClassContext.Provider value={screenClass}>
      <GridContext.Provider value={contextValue}>
        {children}
      </GridContext.Provider>
    </ScreenClassContext.Provider>
  );
}

// ── Hook ──

export function useScreenClass(): ScreenClass {
  const ctx = useContext(ScreenClassContext);
  if (ctx === null) {
    throw new Error(
      "useScreenClass must be used within a GridLayout2Provider",
    );
  }
  return ctx;
}
