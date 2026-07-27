import getLetterName from "./getLetterName";

function handleInput(i: string, rowIndex: number, entryIndex: number, graph: number[][], directional: boolean, updateGraph: () => void, disabled: boolean): void {
  if (rowIndex == entryIndex || disabled)
    return updateGraph();

  let asNumber = (i == "")? Infinity : Number.parseInt(i);

  if (asNumber != Infinity)
    if (asNumber < 0 || !Number.isSafeInteger(asNumber))
      return updateGraph();

  graph[rowIndex][entryIndex] = asNumber;

  // mirror input to other half
  if (!directional)
    graph[entryIndex][rowIndex] = asNumber;

  updateGraph();
}

function increaseSizeByOne(graph: number[][], updateGraph: () => void) {
  for (const row of graph) {
    row.push(Infinity);
  }

  graph.push(new Array(graph.length+1).fill(Infinity));

  updateGraph();
}

function decreaseSizeByOne(graph: number[][], updateGraph: () => void) {
  graph.pop();

  for (const row of graph) {
    row.pop();
  }

  updateGraph();
}

function handleDirectionalChange(directional: boolean, graph: number[][], toggleDirectional: () => void, updateGraph: () => void) {
  if (directional) {
    for (let rowIndex = 1; rowIndex < graph.length; rowIndex++) {
      for (let entryIndex = 0; entryIndex < rowIndex; entryIndex++) {
        graph[rowIndex][entryIndex] = graph[entryIndex][rowIndex];
      }
    }
  }

  updateGraph();
  toggleDirectional();
}

export default function InputGrid(
  { graph, updateGraph, directional, toggleDirectional, disabled }:
  { graph: number[][], updateGraph: () => void, directional: boolean, toggleDirectional: () => void, disabled: boolean }
) {
  return (<>
    <div className="flex flex-col gap-2 text-center">

      {/* Display letters over columns */}
      <div className="flex flex-row gap-2">
        { graph.length == 0? <></> : <> {/* edge case */}
          <div className="w-8 h-8 border-2 border-transparent rounded-sm bg-transparent"></div> {/* empty square for formatting */}
          {/* the actual letters */}
          { graph[0].map((_, index) =>
            <div key={ index } className="w-8 h-8 border-2 border-gray-400 rounded-sm bg-gray-400">{ getLetterName(index) }</div>
          )}
        </> }
      </div>

      {/* Input table */}
      { graph.map((row, rowIndex) =>
        <div key={ rowIndex } className="flex flex-row gap-2">

          {/* Display letters before rows */}
          <div className="w-8 h-8 border-2 border-gray-400 rounded-sm bg-gray-400">{ getLetterName(rowIndex) }</div>

          {/* input */}
          { row.map((entry, entryIndex) =>
            <input
              key={ entryIndex }
              type="text"
              value={ entry == Infinity? "" : entry }
              onChange={ (e) => handleInput(e.target.value, rowIndex, entryIndex, graph, directional, updateGraph, disabled) }
              disabled={ rowIndex == entryIndex || (!directional && rowIndex > entryIndex) }
              className="w-8 h-8 border-2 border-gray-200 rounded-sm disabled:bg-gray-200"
            />
          )}
        </div>
      )}
    </div>

    {/* buttons to modify grid */}
    <div className="flex flex-row gap-2">
      <button
        onClick={ () => increaseSizeByOne(graph, updateGraph) }
        disabled={ disabled }
        className="w-8 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >+</button>

      <button
        onClick={ () => decreaseSizeByOne(graph, updateGraph) }
        disabled={ disabled }
        className="w-8 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >-</button>

      <button
        onClick={ () => handleDirectionalChange(directional, graph, toggleDirectional, updateGraph) }
        disabled={ disabled }
        className="px-2 h-8 border-2 border-gray-200 rounded-sm disabled:opacity-30"
      >{ directional? "Directional ➡️" : "Un-directional" }</button>
    </div>

  </>);
}