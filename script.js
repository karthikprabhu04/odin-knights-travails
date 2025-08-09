class Tree {
  constructor(start, end) {
    // Create 8 x 8 chessboard graph
    this.graph = new Array(8).fill(0).map(() => new Array(8).fill(0));
    // Edit graph to find pathway
    this.path = this.findPath(start, end);
  }

  // Build binary search tree
  findPath(start, end) {
    // Update graph with start filled
    let currCoordinate = start;
    this.graph[currCoordinate[0]][currCoordinate[1]] = 1;

    // Find valid move options
    let moveOptions = this.findPossibleMoves(start);
    
    // Create queue and push move options here
    const queue = [];
    moveOptions.forEach((move) => queue.push(move));

    while (!(currCoordinate[0] === end[0] && currCoordinate[1] === end[1])) {
      // Take first item
      currCoordinate = queue.shift();

      // Update graph
      this.graph[currCoordinate[0]][currCoordinate[1]] = 1;

      // Find valid move options and push to queue
      moveOptions = this.findPossibleMoves(currCoordinate)
      moveOptions.forEach((move) => queue.push(move))

      console.log(currCoordinate, queue.length)
    }

    console.log("FOUND", currCoordinate)
    console.log(this.graph);
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