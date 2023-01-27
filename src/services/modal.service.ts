import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action, ModalState, ModalType } from 'src/models/modal';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    state$ = new BehaviorSubject<ModalState>({
        type: ModalType.GameOver,
        visible: false,
        actions: [],
        title: 'Game Over!'
    });

    show(type?: ModalType) {
        this.state$.next({
            ...this.state$.value,
            type: type || this.state$.value.type,
            visible: true,
        });

        return this;
    }

    hide() {
        this.state$.next({
            ...this.state$.value,
            visible: false,
        });

        return this;
    }

    setType(type: ModalType) {
        this.state$.next({
            ...this.state$.value,
            type: type,
        });

        return this;
    }

    setActions(actions: Action[]) {
        this.state$.next({
            ...this.state$.value,
            actions: actions,
        });

        return this;
    }
}
