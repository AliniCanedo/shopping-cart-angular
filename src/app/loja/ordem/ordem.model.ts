import { Game } from './../../shared/modelos/games';


export class Pedido {
    game: Game;
    quantidade: number;

    constructor(game: Game, quantidade: number) {
        this.game = game;
        this.quantidade = quantidade;
    }
}
