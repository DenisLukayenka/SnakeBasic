import { Options } from 'src/models/options';
import { Position } from 'src/models/position';

export const validatePosition = (
    position: Position,
    { height, width }: Options
) => {
    if (position.y < 0 || position.y >= height) {
        return false;
    }

    if (position.x < 0 || position.x >= width) {
        return false;
    }

    return true;
};
