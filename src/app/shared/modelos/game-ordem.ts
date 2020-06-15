import { Game } from './games';

export class GameOrdem {
    game: Game;
    quantidade: number;

    constructor(game: Game, quantidade: number = 1) {
        this.game = game;
        this.quantidade = quantidade;
    }
}
