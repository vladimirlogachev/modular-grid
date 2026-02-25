import type { CSSProperties } from "react";
import { useScreenClass } from "../modular-grid/grid-layout-2";
import { useGrid } from "../modular-grid/context";
import { scaleProportionallyStyle } from "../modular-grid/calculations";
import { GridRow, GridColumn, GridBox } from "../modular-grid/components";
import { white } from "./colors";
import textStyles from "./textStyles.module.css";

// ── Data ──

const pageTitle = "Elm modular grid";

const paragraphTitle = "Module and grid explained";

const paragraphText = `A modular grid is a tool that helps to make a layout. It consists of simple geometric shapes – modules of the same size, located in a certain sequence. The grid allows you to split the layout into equal cells  – modules and adjust all the indents and sizes of each object so that they are a multiple of the module size.`;

type BlockData = {
  title: string;
  description: string;
  color: string;
};

const block1: BlockData = {
  title: "Block 1",
  description: "Some description",
  color: "#B2EBF2",
};
const block2: BlockData = {
  title: "Block 2",
  description: "Some description",
  color: "#BBDEFB",
};
const block3: BlockData = {
  title: "Block 3",
  description: "Some description",
  color: "#FFE0B2",
};
const block4: BlockData = {
  title: "Block 4",
  description: "Some description",
  color: "#B2EBF2",
};

const importantImage = {
  url: "/assets/images/important-image.svg",
  description: "Important image",
  sourceSize: { width: 600, height: 400 },
};

// ── View ──

export function HomePage() {
  const screenClass = useScreenClass();

  switch (screenClass) {
    case "mobile":
      return <MobileView />;
    case "desktop":
      return <DesktopView />;
  }
}

// ── Mobile ──

function MobileView() {
  const { grid } = useGrid();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: `${grid.gutter}px`,
      }}
    >
      <div style={{ width: "100%" }}>
        <p className={textStyles.headerMobile}>{pageTitle}</p>
      </div>

      <img
        src={importantImage.url}
        alt={importantImage.description}
        style={scaleProportionallyStyle(grid, {
          originalWidth: importantImage.sourceSize.width,
          originalHeight: importantImage.sourceSize.height,
          widthSteps: 6,
        })}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${grid.gutter}px`,
        }}
      >
        <p className={textStyles.subheaderMobile}>{paragraphTitle}</p>
        <p className={textStyles.body}>{paragraphText}</p>
      </div>

      <GridRow>
        <MobileBlock widthSteps={3} heightSteps={4} block={block1} />
        <MobileBlock widthSteps={3} heightSteps={4} block={block2} />
      </GridRow>

      <GridRow>
        <MobileBlock widthSteps={4} heightSteps={4} block={block3} />
        <MobileBlock widthSteps={2} heightSteps={4} block={block4} />
      </GridRow>
    </div>
  );
}

function MobileBlock({
  widthSteps,
  heightSteps,
  block,
}: {
  widthSteps: number;
  heightSteps: number;
  block: BlockData;
}) {
  const { grid } = useGrid();

  return (
    <GridBox
      widthSteps={widthSteps}
      heightSteps={heightSteps}
      style={{
        backgroundColor: block.color,
        color: white,
        padding: `${grid.gutter}px`,
      }}
    >
      <p className={textStyles.subheaderMobile}>{block.title}</p>
      <p style={descriptionStyle}>{block.description}</p>
    </GridBox>
  );
}

// ── Desktop ──

function DesktopView() {
  const { grid } = useGrid();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: `${grid.gutter}px`,
      }}
    >
      <div style={{ width: "100%" }}>
        <p
          className={textStyles.headerDesktop}
          style={{ padding: `${grid.gutter}px` }}
        >
          {pageTitle}
        </p>
      </div>

      <GridRow>
        <img
          src={importantImage.url}
          alt={importantImage.description}
          style={{
            ...scaleProportionallyStyle(grid, {
              originalWidth: importantImage.sourceSize.width,
              originalHeight: importantImage.sourceSize.height,
              widthSteps: 6,
            }),
            alignSelf: "flex-start",
          }}
        />
        <GridColumn
          widthSteps={6}
          style={{
            gap: `${grid.gutter}px`,
            alignSelf: "flex-start",
          }}
        >
          <p className={textStyles.subheaderDesktop}>{paragraphTitle}</p>
          <p className={textStyles.body}>{paragraphText}</p>
        </GridColumn>
      </GridRow>

      <GridRow>
        <DesktopBlock widthSteps={4} heightSteps={5} block={block1} />
        <DesktopBlock widthSteps={4} heightSteps={5} block={block2} />
        <GridBox
          widthSteps={4}
          heightSteps={5}
          style={{ gap: `${grid.gutter}px` }}
        >
          <DesktopBlock widthSteps={4} heightSteps={3} block={block3} />
          <DesktopBlock widthSteps={4} heightSteps={2} block={block4} />
        </GridBox>
      </GridRow>
    </div>
  );
}

function DesktopBlock({
  widthSteps,
  heightSteps,
  block,
}: {
  widthSteps: number;
  heightSteps: number;
  block: BlockData;
}) {
  const { grid } = useGrid();

  return (
    <GridBox
      widthSteps={widthSteps}
      heightSteps={heightSteps}
      style={{
        backgroundColor: block.color,
        color: white,
        padding: `${grid.gutter}px`,
      }}
    >
      <p className={textStyles.subheaderDesktop}>{block.title}</p>
      <p style={descriptionStyle}>{block.description}</p>
    </GridBox>
  );
}

// ── Shared styles ──

const descriptionStyle: CSSProperties = {
  marginTop: "auto",
  width: "100%",
  textAlign: "right",
};
