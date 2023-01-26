export enum ModalType {
    GameOver,
    Win,
    Pause,
}

export type Action = {
    type: 'button',
    caption: string;
    callback: Function;
}

export type ModalState = {
    type: ModalType;
    visible: boolean;

    title: string;
    actions: Action[];
}