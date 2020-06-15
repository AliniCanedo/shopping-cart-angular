import { Pedido } from './../ordem/ordem.model';
import { Game } from './../../shared/modelos/games';
import { GameOrdem } from './../../shared/modelos/game-ordem';
import { GameOrdens } from './../../shared/modelos/game-ordens';


import { GameService } from './../../services/games.service';
import { Subscription } from 'rxjs';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent implements OnInit, OnDestroy {
     fimDoPedido: boolean;
     pedidos: GameOrdens;
     private carrinhoDeComprasPedido: GameOrdens;
    total: number;
    sub: Subscription;

    subTotal: number;
    sumFrete: number;
    frete: number;
    sum: number;
    gamePedido: GameOrdem[] = [];


    // tslint:disable-next-line: no-output-on-prefix
    @Output() onFimDoPedido: EventEmitter<boolean>;
  games: any[];

    constructor(private service: GameService) {
        this.sumFrete = 0;
        this.total = 0;
        this.sum = 0;
        this.frete = 10;
        this.total = 0;
        this.fimDoPedido = false;
        this.onFimDoPedido = new EventEmitter<boolean>();
    }

    ngOnInit() {
        this.pedidos = new GameOrdens();
        this.gamePedido = [];
        this.carregarCarrinho();
        this.carregarTotal();
        this.loadSubTotal();
        this.loadProducts();
        this.loadOrders();
        this.loadSumFrete();
    }


    removerCarrinho(gamePedido: GameOrdem) {
        const index = this.getGameIndex(gamePedido.game);
        if (index > -1) {

            this.carrinhoDeComprasPedido.gameOrdens.splice(
                this.getGameIndex(gamePedido.game), 1);
        }
        this.service.GamesPedidos = this.carrinhoDeComprasPedido;
        this.carrinhoDeComprasPedido = this.service.GamesPedidos;

    }

    getGameIndex(game: Game): number {
        return this.service.GamesPedidos.gameOrdens.findIndex(
            value => value.game === game);
    }

    isGameSelecionado(game: Game): boolean {
        return this.getGameIndex(game) > -1;
    }


    private calcularTotal(games: GameOrdem[]): number {
        let sum = 0;
        games.forEach(value => {
            sum += (value.game.price * value.quantidade);
        });
        return sum;
    }

    private calculateFrete(pedidos: Pedido[]): number  {
      let sumFrete = 0;
      pedidos.forEach(value => {
          if (this.sum < 250) {
              this.frete = 10;
              sumFrete += (this.frete * value.quantidade);

      }
          if (this.sum > 250) {
          this.frete = 0;
          sumFrete += (this.frete * value.quantidade);

      }
      });

      return sumFrete;

  }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    fecharPedido() {
        this.fimDoPedido = true;
        this.service.Total = this.total;
        this.onFimDoPedido.emit(this.fimDoPedido);
    }

    carregarTotal() {
        this.sub = this.service.PedidoAlterado.subscribe(() => {
            this.total = this.calcularTotal(this.pedidos.gameOrdens);
        });
    }

    carregarCarrinho() {
        this.sub = this.service.PedidoGameAlterado.subscribe(() => {
            const gamePedido = this.service.pedidoGameSelecionado;
            if (gamePedido) {
                this.pedidos.gameOrdens.push(new GameOrdem(
                  gamePedido.game, gamePedido.quantidade));
            }
            this.service.GamesPedidos = this.pedidos;
            this.pedidos = this.service.GamesPedidos;
            this.total = this.calcularTotal(this.pedidos.gameOrdens);
        });
    }

    redefinir() {
        this.fimDoPedido = false;
        this.pedidos = new GameOrdens();
        this.pedidos.gameOrdens = [];
        this.carregarTotal();
        this.total = 0;
    }

    loadSubTotal() {
      this.sub = this.service.PedidoAlterado.subscribe(() => {
        this.total = this.calculateSubTotal(this.games);
    });
  }

  private calculateSubTotal(games: Pedido[]): number {
    let sum = 0;
    games.forEach(value => {
        sum += (value.game.price * value.quantidade);
    });
    return sum;
}
loadProducts() {
    this.service.listarTodosGames()
        .subscribe(
            (games: any[]) => {
                this.games = games;
                // tslint:disable-next-line: no-shadowed-variable
                this.games.forEach((games: Game) => {
                    this.gamePedido.push(new Pedido(games, 0));
                });
            },
            (error) => console.log(error)
        );
}

loadOrders() {
  this.sub = this.service.PedidoAlterado.subscribe(() => {
      this.carrinhoDeComprasPedido = this.service.GamesPedidos;
  });
}

 loadSumFrete() {
  this.sub = this.service.PedidoAlterado.subscribe(() => {
      return this.sumFrete = this.calculateFrete(this.games);
  });
}


}
