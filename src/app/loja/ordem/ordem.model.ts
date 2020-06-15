import { Game } from './../../shared/modelos/games';


export class Pedido {
    game: Game;
    quantidade: number;
    price: number;

    constructor(game: Game, quantidade: number = 1) {
        this.game = game;
        this.quantidade = quantidade;
    }
}
