import getLetterName from "./getLetterName";
import InfinitySymbol from "./InfinitySymbol";

export default function Table(
  { table, graph, startIndex, toProcessHistory }:
  { table: ([number, number])[][], graph: number[][], startIndex: number, toProcessHistory: (number | null)[][] }
) {
  return (<div className="flex flex-col border-l-2 border-black">

      {/* letters */}
      <div className="flex flex-row text-center">
        { graph[0].map((_, index) =>
          <div className="w-10 font-bold border-r-2 border-b-2 border-t-2 border-black" key={ index }>{ getLetterName(index) }</div>
        )}
      </div>

      {/* first row, only the start is set */}
      <div className="flex flex-row">
        { graph[0].map((_, index) =>
          <div className="w-10 border-r-2 border-b-2 border-black flex flex-row" key={ index }>
            { index == startIndex? <>
              <div className="m-auto">{ getLetterName(index) }</div>
              <div className="m-auto">0</div>
            </> : <>
              <div className="m-auto">/</div>
              <div className="m-auto"><InfinitySymbol /></div>
            </>}
          </div>
        )}
      </div>

      {/* entries */}
      { table.map((row, rowIndex) =>
        <div className="flex flex-row" key={ rowIndex }>
          { row.map((entry, entryIndex) =>
            <div className={ `w-10 border-r-2 border-b-2 border-black flex flex-row ${toProcessHistory[rowIndex][entryIndex] == null? "bg-green-500" : ""}` } key={ entryIndex }>
              <div className="m-auto">{ entry[0] == Infinity? "/" : getLetterName(entry[0]) }</div>
              <div className="m-auto">{ entry[1] == Infinity? <InfinitySymbol /> : entry[1] }</div>
            </div>
          )}
        </div>
      )}

  </div>);
}