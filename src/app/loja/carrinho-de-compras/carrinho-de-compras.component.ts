import { GamesPedidos } from '../../shared/modelos/ordens.model';
import { Pedido } from '../../shared/modelos/ordem.model';
import { Game } from './../../shared/modelos/games';
import { GameService } from '../../services/games.service';
import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css'],
})
export class CarrinhoDeComprasComponent implements OnInit, OnDestroy {
  orders: GamesPedidos;
  total: number;
  subTotal: number;
  sumFrete: number;
  frete: number;
  sum: number;
  sub: Subscription;
  productOrders: Pedido[] = [];
  products: Game[] = [];
  selectedProductOrder: Pedido;
  shoppingCartOrders: GamesPedidos;
  productSelected = true;
  // tslint:disable-next-line: variable-name
  remove_item = false;

  constructor(private service: GameService) {
    this.remove_item = false;
    this.sumFrete = 0;
    this.total = 0;
    this.sum = 0;
    this.frete = 0;
  }

  ngOnInit() {
    this.orders = new GamesPedidos();
    this.productOrders = [];
    this.carregarGames();
    this.carregarCarrinho();
    this.carregarPedidos();
    this.carregaTotal();
    this.carregaSubTotal();
    this.carregaSomaFrete();
  }

  // Lista os games vindos do serviço
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

  // adiciona os games ao carrinho
  carregarCarrinho() {
    this.sub = this.service.ProductOrderChanged.subscribe(() => {
      const productOrder = this.service.SelectedProductOrder;
      if (productOrder) {
        this.orders.gamesPedido.push(
          new Pedido(productOrder.game, productOrder.quantidade)
        );
      }
      this.service.ProductOrders = this.orders;
      this.orders = this.service.ProductOrders;
      this.total = this.calculaTotal(this.orders.gamesPedido);
      this.subTotal = this.calculaSubTotal(this.orders.gamesPedido);
      this.sumFrete = this.calculaFrete(this.orders.gamesPedido);
    });
  }

  redefinir() {
    this.orders = new GamesPedidos();
    this.orders.gamesPedido = [];
    this.carregaTotal();
    this.total = 0;
  }

  // remove itens do carrinho
  removerCarrinho(productOrder: Pedido) {
    const index = this.getGameIndex(productOrder.game);
    if (index > -1) {
      this.shoppingCartOrders.gamesPedido.splice(
        this.getGameIndex(productOrder.game),
        1
      );
    }
    this.service.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.service.ProductOrders;
    this.productSelected = false;
  }

  carregarPedidos() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.service.ProductOrders;
    });
  }

  private calculaTotal(products: Pedido[]): number {
    let sum = 0;
    products.forEach((value) => {
      sum += value.game.price * value.quantidade;
    });
    return sum;
  }
  private calculaSubTotal(products: Pedido[]): number {
    let sum = 0;
    products.forEach((value) => {
      sum += value.game.price * value.quantidade;
    });
    return sum;
  }
  private calculaFrete(products: Pedido[]): number {
    let sumFrete = 0;
    products.forEach((value) => {
      if (sumFrete <= 250) {
        this.frete = 10;
        sumFrete += this.frete * value.quantidade;
      } else {
        sumFrete += this.frete * value.quantidade;
      }
    });
    return sumFrete;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  carregaTotal() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.total = this.calculaTotal(this.orders.gamesPedido);
    });
  }
  carregaSubTotal() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.total = this.calculaSubTotal(this.orders.gamesPedido);
    });
  }

  carregaSomaFrete() {
    this.sub = this.service.OrdersChanged.subscribe(() => {
      this.sumFrete = this.calculaFrete(this.orders.gamesPedido);
    });
  }

  getGameIndex(product: Game): number {
    return this.service.ProductOrders.gamesPedido.findIndex(
      (value) => value.game === product
    );
  }

  isGameSelected(product: Game): boolean {
    return this.getGameIndex(product) > -1;
  }
}
