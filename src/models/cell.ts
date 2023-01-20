import { Position } from './position';

export type Cell = {
    position: Position;

    type: CellType;
}

export type CellType = 'fruit' | 'snake' | 'default';