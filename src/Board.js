import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
// its seems that if ncols = nrows + 1 would be solvable in most cases
function Board({ nrows = 3, ncols = 4, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = new Array(nrows)
      .fill(null)
      .map((v) => new Array(ncols).fill(null));
    // TODO: create array-of-arrays of true/false values

    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        initialBoard[y][x] = chanceLightStartsOn() > 0.5 ? true : false; // true or false
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        if (board[y][x] === false) {
          continue;
        } else return false;
      }
    }
    console.log(board);
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      console.log(coord);
      const [y, x] = coord;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x]; // true = false or false = true (flip)
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...board];
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }
  function fillBoard() {
    return board.map((rows, i) => {
      return (
        <tr className={`Row-${i}`}>
          {rows.map((x, idx) => (
            <Cell y={i} x={idx} flipCellsAroundMe={flipCellsAround} isLit={x} />
          ))}
        </tr>
      );
    });
  }

  return (
    // if the game is won, just show a winning msg & render nothing else
    <div className='Board'>
      {hasWon() ? (
        <div className='win'>Congratulations you won!</div>
      ) : (
        // make table board
        <table>
          <tbody className='Board-table'>{fillBoard()}</tbody>
        </table>
      )}
    </div>
  );
}

export default Board;
