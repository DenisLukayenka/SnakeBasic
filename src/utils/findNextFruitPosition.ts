import { Board } from 'src/models/board';
import { getRandomNumber } from './getRandomNumber';

export const findNextFruitCell = (board: Board) => {
    const cells = board.cells.flat().filter((c) => c.type !== 'snake');
    const index = getRandomNumber(cells.length);

    if (index < 0) {
        return undefined;
    }

    return cells[index];
};
