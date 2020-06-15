import { Subscription } from 'rxjs';
import { GameOrdens } from './../../shared/modelos/game-ordens';
import { Game } from './../../shared/modelos/games';
import { GameOrdem } from './../../shared/modelos/game-ordem';
import { Games } from './games.model';
import { GameService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../ordem/ordem.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
    gamePedidos: GameOrdem[] = [];
    games: Games[] = [];
    pedidoProdutoSelecionado: GameOrdem;
    private carrinhoDeComprasPedido: GameOrdens;
    sub: Subscription;
    gameSelecionado = false;
    // tslint:disable-next-line: variable-name
    container = false;

    constructor(private service: GameService) {
      this.container = false;
    }

    ngOnInit() {
        this.gamePedidos = [];
        this.carregarGames();
        this.carregarPedidos();
        this.service.listarTodosGames().subscribe(game => this.games = game);
    }

    adicionarCarinho(pedido: GameOrdem) {
        this.service.pedidoGameSelecionado = pedido;
        this.pedidoProdutoSelecionado = this.service.pedidoGameSelecionado;
        this.gameSelecionado = true;
    }

    removerCarrinho(gamePedido: GameOrdem) {
        const index = this.getGameIndex(gamePedido.game);
        if (index > -1) {

            this.carrinhoDeComprasPedido.gameOrdens.splice(
                this.getGameIndex(gamePedido.game), 1);
        }
        this.service.GamesPedidos = this.carrinhoDeComprasPedido;
        this.carrinhoDeComprasPedido = this.service.GamesPedidos;
        this.gameSelecionado = false;
    }

    getGameIndex(game: Game): number {
        return this.service.GamesPedidos.gameOrdens.findIndex(
            value => value.game === game);
    }

    isGameSelecionado(game: Game): boolean {
        return this.getGameIndex(game) > -1;
    }

    carregarGames() {
        this.service.listarTodosGames()
            .subscribe(
                (games: any[]) => {
                    this.games = games;
                    this.games.forEach(game => {
                        this.gamePedidos.push(new GameOrdem(game, 0));
                    });
                },
                (error) => console.log(error)
            );
    }

    carregarPedidos() {
        this.sub = this.service.PedidoAlterado.subscribe(() => {
            this.carrinhoDeComprasPedido = this.service.GamesPedidos;
        });
    }

    redefinir() {
        this.gamePedidos = [];
        this.carregarGames();
        this.service.GamesPedidos.gameOrdens = [];
        this.carregarPedidos();
        this.gameSelecionado = false;
    }
}
