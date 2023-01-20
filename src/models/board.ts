import { Cell } from './cell';

export type Board = {
    height: number;
    width: number;

    cells: Cell[][];
}