import { GamesPedidos } from './../../shared/modelos/ordens.model';
import { Subscription } from 'rxjs';
import { Game } from './../../shared/modelos/games';
import { GameService } from '../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../shared/modelos/ordem.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  productOrders: Pedido[] = [];
  products: Game[] = [];
  selectedProductOrder: Pedido;
  shoppingCartOrders: GamesPedidos;
  sub: Subscription;
  productSelected = false;
  mostrar = false;

  constructor(private service: GameService) {
    this.mostrar = false;
  }

  ngOnInit() {
    this.productOrders = [];
    this.carregarGames();
    this.carregarPedidos();
    this.service.listarProdutos().subscribe((game) => (this.products = game));
  }

  // ADICIONA GAME AO CARRINHO DE COMPRAS
  adicionarCarinho(pedido: Pedido) {
    this.service.SelectedProductOrder = pedido;
    this.selectedProductOrder = this.service.SelectedProductOrder;
    this.productSelected = true;
  }

  getGameIndex(game: Game): number {
    return this.service.ProductOrders.gamesPedido.findIndex(
      (value) => value.game === game
    );
  }

  isGameSelecionado(game: Game): boolean {
    return this.getGameIndex(game) > 1;
  }

  carregarGames() {
    this.service.listarProdutos().subscribe(
      (products: any[]) => {
        this.products = products;
        this.products.forEach((product) => {
          this.productOrders.push(new Pedido(product, 0));
        });
      },
      (error) => console.log(error)
    );
  }

  carregarPedidos() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.service.ProductOrders;
    });
  }

  redefinir() {
    this.productOrders = [];
    this.carregarGames();
    this.service.ProductOrders.gamesPedido = [];
    this.carregarPedidos();
    this.productSelected = false;
  }
}
