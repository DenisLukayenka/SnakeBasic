import { Board } from 'src/models/board';
import { getRandomNumber } from './getRandomNumber';

export const findNextFruitPosition = (board: Board) => {
    const cells = board.cells.flat().filter((c) => c.type !== 'snake');
    const nextFruitCell = cells[getRandomNumber(cells.length)];

    return nextFruitCell;
};
