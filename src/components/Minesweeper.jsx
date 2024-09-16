import React, { useState, useEffect } from "react";
import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./logic";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 7;

function Minesweeper() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE, NUMBER_OF_MINES));
  const [minesLeft, setMinesLeft] = useState(NUMBER_OF_MINES);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    listMinesLeft();
  }, [board]);

  function listMinesLeft() {
    const markedTilesCount = board
      .flat()
      .filter((tile) => tile.status === TILE_STATUSES.MARKED).length;
    setMinesLeft(NUMBER_OF_MINES - markedTilesCount);
  }

  function checkGameEnd() {
    const win = checkWin(board);
    const lose = checkLose(board);

    if (win || lose) {
      setGameOver(true);
      setMessage(win ? "You Win" : "You Lose");
      if (lose) {
        setBoard((board) =>
          board.map((row) =>
            row.map((tile) => {
              if (tile.status === TILE_STATUSES.MARKED) return markTile(tile);
              if (tile.mine) return { ...tile, status: TILE_STATUSES.MINE };
              return tile;
            })
          )
        );
      }
    }
  }

  const handleTileClick = (tile) => {
    if (gameOver) return;
    const newBoard = revealTile(board, tile);
    setBoard(newBoard);
    checkGameEnd();
  };

  const handleTileRightClick = (e, tile) => {
    e.preventDefault();
    if (gameOver) return;
    const newBoard = board.map((row) =>
      row.map((t) => (t === tile ? markTile(t) : t))
    );
    setBoard(newBoard);
  };

  return (
    <div className="minesweeper">
      <div className="subtext">Mines Left: {minesLeft}</div>
      <div className="board" style={{ "--size": BOARD_SIZE }}>
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`tile ${tile.status}`}
              onClick={() => handleTileClick(tile)}
              onContextMenu={(e) => handleTileRightClick(e, tile)}
            >
              {tile.status === TILE_STATUSES.NUMBER ? tile.mineCount : ""}
            </div>
          ))
        )}
      </div>
      <div className="message">{message}</div>
    </div>
  );
}

export default Minesweeper;
