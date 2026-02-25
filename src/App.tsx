import { GridLayout2Provider } from "./modular-grid/grid-layout-2";
import { layoutConfig } from "./example/config";
import { SingleSectionLayout } from "./example/SingleSectionLayout";
import { HomePage } from "./example/HomePage";

export function App() {
  return (
    <GridLayout2Provider config={layoutConfig}>
      <SingleSectionLayout>
        <HomePage />
      </SingleSectionLayout>
    </GridLayout2Provider>
  );
}
