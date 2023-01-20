import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';
import { Options } from 'src/models/options';
import { Position } from 'src/models/position';

export const buildDefaultBoard = (options: Options): Board => {
    const { height, width, snakeSize } = options;

    const boardCells = Array.from(Array(height), (_, heightI) => {
        return Array.from(Array(width), (_, widthI): Cell => {
            return {
                type: 'default',
                position: {
                    x: widthI,
                    y: heightI,
                },
            };
        });
    });

    const board: Board = {
        height: height,
        width: width,
        cells: boardCells,
    };

    return board;
}

export const setupSnakeCells = (board: Board, options: Options): Cell[] => {
    const { height, width, snakeSize } = options;
    const snakeCells: Cell[] = [];
    const initialPosition: Position = { y: height / 2, x: width / 2 };

    for (
        let index = initialPosition.y;
        index < initialPosition.y + snakeSize && index < board.cells.length;
        index++
    ) {
        const cell = board.cells[index][initialPosition.x];
        cell.type = 'snake';
        snakeCells.push(cell);
    }

    return snakeCells;
}