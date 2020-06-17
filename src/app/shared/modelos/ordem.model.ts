import { Game } from "./games";

export class Pedido {
  game: Game;
  quantidade: number;
  price: number;

  constructor(game: Game, quantidade: number) {
    this.game = game;
    this.quantidade = quantidade = 1;
  }
}
