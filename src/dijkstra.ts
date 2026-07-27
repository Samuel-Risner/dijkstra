export default class Dijkstra {

    private graph: number[][];
    private startIndex: number;
    
    /**
     * [predecessor, path value]
    */
   private result: [number, number][];
   private toProcess: (number | null)[];

   /**
    * For displaying the steps in the web app
    * Not relevant for functionality of the algorithm
    */
   private formattedResult: [number, number][][];
   private toProcessHistory: (number | null)[][];

    constructor() {
        this.graph = [[]];
        this.startIndex = 0;

        this.result = [];
        this.toProcess = [];

        this.formattedResult = [];
        this.toProcessHistory = [];
    }

    public reset(): void {
        this.graph = [[]];
        this.startIndex = 0;

        this.result = [];
        this.toProcess = [];

        this.formattedResult = [];
        this.toProcessHistory = [];
    }

    public setGraph(graph: number[][]): void {
        this.graph = graph;
    }

    public setStartIndex(startIndex: number): void {
        this.startIndex = startIndex;
    }

    public getStartIndex(): number {
        return this.startIndex;
    }

    public getFormattedResult(): [number, number][][] {
        return this.formattedResult;
    }

    public getToProcessHistory(): (number | null)[][] {
        return this.toProcessHistory;
    }


    public init(): void {
        this.result = [];

        for (let i = 0; i < this.graph.length; i++) {
            this.result.push([Infinity, Infinity]);
        }

        this.result[this.startIndex] = [this.startIndex, 0];



        this.toProcess = [];

        for (let i = 0; i < this.graph.length; i++) {
            this.toProcess.push(Infinity);
        }

        this.toProcess[this.startIndex] = 0;
    }

    private popCheapest(): [number, number] | [null, null] {
        let cheapestValue: number = Infinity;
        let cheapestIndex: number | null = null;

        let toCompare: number | null = null;

        for (let i = 0; i < this.toProcess.length; i++) {
            toCompare = this.toProcess[i];

            if (toCompare != Infinity && toCompare != null && toCompare < cheapestValue) {
                cheapestValue = toCompare;
                cheapestIndex = i;
            }
        }

        if (cheapestIndex != null) {
            this.toProcess[cheapestIndex] = null;
            return [cheapestIndex, cheapestValue];
        }

        return [null, null];
    }

    private findAndApplyCheaperConnections(knotIndex: number, path: number): void {
        let newConnection: number;

        for (let i = 0; i < this.graph.length; i++) {

            
            if (this.graph[knotIndex][i] != Infinity) { // if a connection exists
                if (this.toProcess[i] != null) { // if the knot wasn't handled yet
                    
                    newConnection = this.graph[knotIndex][i] + path;
                    
                    if (newConnection < (this.toProcess[i] as number)) { // if the connection is cheaper than the previous one
                        this.toProcess[i] = newConnection;
                        this.result[i] = [knotIndex, newConnection];
                    }
                }
            }

        }
    }

    private step(): boolean {
        const [index, value] = this.popCheapest();

        if (index == null || value == null)
            return true;

        this.findAndApplyCheaperConnections(index, value);

        this.saveResult();
        this.saveToProcess();

        return false;
    }

    public allSteps(): void {
        while (!this.step()) {
            this.step();
        }
    }

    public singleStep(): boolean {
        return this.step();
    }

    private saveResult() {
        let toAdd: [number, number][] = [];

        for (const p of this.result) {
            toAdd.push([p[0], p[1]]);
        }

        this.formattedResult.push(toAdd);
    }

    private saveToProcess() {
        let toAdd: (number | null)[] = [];

        for (const p of this.toProcess) {
            toAdd.push(p);
        }

        this.toProcessHistory.push(toAdd);
    }

}