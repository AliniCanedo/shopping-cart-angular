import { Pedido } from './../shared/modelos/ordem.model';
import { Game } from './../shared/modelos/games';
import { GameService } from './../services/games.service';
import { CarrinhoDeComprasComponent } from './carrinho-de-compras/carrinho-de-compras.component';
import { GamesComponent } from './games/games.component';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
})
export class LojaComponent implements OnInit {
  products: Game[];
  productOrders: Pedido;

  constructor(private service: GameService) {}

  @ViewChild('productsC')
  productsC: GamesComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: CarrinhoDeComprasComponent;

  ngOnInit() {
    this.service.listarProdutos().subscribe((game) => (this.products = game));
  }

  redefinir() {
    this.productsC.redefinir();
    this.shoppingCartC.redefinir();
  }


}
