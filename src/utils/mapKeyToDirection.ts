import { Direction } from 'src/models/direction';

export const mapKeyToDirection = (key: string): Direction => {
    if (key === 'ArrowUp' || key === 'w') {
        return 'up';
    }

    if (key === 'ArrowDown' || key === 's') {
        return 'down';
    }

    if (key === 'ArrowRight' || key === 'd') {
        return 'right';
    }

    if (key === 'ArrowLeft' || key === 'a') {
        return 'left';
    }
    
    throw new Error('Cannot find direction for key: ' + key);
};
