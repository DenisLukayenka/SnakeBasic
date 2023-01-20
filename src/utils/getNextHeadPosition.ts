import { Direction } from 'src/models/direction';
import { Position } from 'src/models/position';

export const getNextHeadPosition = (
    current: Position,
    direction: Direction
): Position => {
    const nextPosition = { ...current };
    if (direction === 'up') {
        nextPosition.y--;
    } else if (direction === 'down') {
        nextPosition.y++;
    } else if (direction === 'left') {
        nextPosition.x--;
    } else {
        nextPosition.x++;
    }

    return nextPosition;
};
