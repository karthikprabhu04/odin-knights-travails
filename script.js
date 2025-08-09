class Tree {
  constructor(start, end) {
    // Create 8 x 8 chessboard graph
    this.graph = new Array(8).fill(0).map(() => new Array(8).fill(0));
    // Edit graph to find pathway
    this.path = this.findPath(start, end);
    console.log("Shortest path:", this.path);
  }


  findPath(start, end) {
    // Mark start visited
    this.graph[start[0]][start[1]] = 1;

    // Parents map to reconstruct path
    const parents = {};
    parents[`${start[0]}, ${start[1]}`] = null;

    // Start queue
    const queue = [start];

    while (queue.length > 0) {
      let currCoordinate = queue.shift();

      // Check if reached end
      if (currCoordinate[0] === end[0] && currCoordinate[1] === end[1]) {
        let path = [];
        let step = `${currCoordinate[0]},${currCoordinate[1]}`;

        while (step !== null && step !== undefined) {
          const [y, x] = step.split(',').map(Number);
          path.push([y, x]);
          step = parents[step];
        }

        return path.reverse();
      }
      
      // Find valid moves from current position
      let moveOptions = this.findPossibleMoves(currCoordinate);
  
      moveOptions.forEach((move) => {
        let key =  `${move[0]},${move[1]}`;
        if (!parents.hasOwnProperty(key)) {
            queue.push(move);
            parents[key] = `${currCoordinate[0]},${currCoordinate[1]}`;
            this.graph[move[0]][move[1]] = 1; // mark visited
          }
        });
    }

    return null;
  }

  findPossibleMoves(coordinate) {
    let y = coordinate[0];
    let x = coordinate[1];

    const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

    const validMoves = moves
      .map(([dy, dx]) => [y + dy, x + dx])
      .filter(([newY, newX]) => newY >= 0 && newY <= 7 && newX >= 0 && newX <= 7)
      .filter(([newY, newX]) => this.graph[newY][newX] !== 1);

    return validMoves;
  }

}

new Tree([7,7], [0, 0]);