import { useState } from "react";

import InputGrid from "./InputGrid";
import type Dijkstra from "./dijkstra";
import Table from "./Table";

enum APP_STATE {
  INPUT,
  STEPPING,
  FINISHED_STEPPING,
  FINISHED
}

export default function App(
  { dijkstra }:
  { dijkstra: Dijkstra }
) {
  const [appState, setAppState] = useState<APP_STATE>(APP_STATE.INPUT);
  const [directional, setDirectional] = useState<boolean>(false);
  const [grid, setGraph] = useState<number[][]>([[Infinity, Infinity], [Infinity, Infinity]]);
  const [gridUpdateState, updateGridFunc] = useState<boolean>(true);

  const updateGrid = () => updateGridFunc(!gridUpdateState);
  const toggleDirectional = () => setDirectional(!directional);

  const startStepping = () => {
    setAppState(APP_STATE.STEPPING);

    dijkstra.setGraph(grid);
    dijkstra.setStartIndex(0);
    dijkstra.init();
  }

  const stepSingle = () => {
    if (dijkstra.singleStep())
      setAppState(APP_STATE.FINISHED_STEPPING);

    updateGrid();
  }

  const stepAll = () => {
    setAppState(APP_STATE.FINISHED);

    dijkstra.setGraph(grid);
    dijkstra.setStartIndex(0);
    dijkstra.init();

    dijkstra.allSteps();
    updateGrid();
  }

  const reset = () => {
    dijkstra.reset();
    setGraph([[Infinity, Infinity], [Infinity, Infinity]]);
    setAppState(APP_STATE.INPUT);
  }

  return (<div className="flex flex-col gap-8 p-8 items-center">

    {/* reset */}
    <div>
      <button
        onClick={ reset }
        className="px-2 h-8 border-2 border-gray-200 rounded-sm"
      >Reset</button>
    </div>

    <InputGrid
      graph={ grid }
      updateGraph={ updateGrid }
      directional={ directional }
      toggleDirectional={ toggleDirectional }
      disabled={ appState != APP_STATE.INPUT }
    />

    {/* options for solution viewing */}
    <div className="flex flex-row gap-2">
      <button
        disabled={ grid.length == 0 || appState != APP_STATE.INPUT }
        onClick={ startStepping }
        className="px-2 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >Solve step by step</button>

      <button
        disabled={ grid.length == 0 || appState != APP_STATE.INPUT }
        onClick={ stepAll }
        className="px-2 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >Solve all at once</button>
    </div>

    {/* table for the steps of the algorithm */}
    { appState != APP_STATE.INPUT?
      <Table graph={ grid } table={ dijkstra.getFormattedResult() } startIndex={ dijkstra.getStartIndex() } toProcessHistory={ dijkstra.getToProcessHistory() } /> : <></>
    }

    {/* step button */}
    <div>
      <button
        disabled={ appState == APP_STATE.FINISHED_STEPPING }
        hidden={ appState != APP_STATE.STEPPING && appState != APP_STATE.FINISHED_STEPPING }
        onClick={ stepSingle }
        className="px-2 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >Step</button>
    </div>

  </div>);
}