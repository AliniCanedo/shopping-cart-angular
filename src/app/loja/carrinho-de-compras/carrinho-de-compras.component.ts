import { Games } from './../games/games.model';
import { GamesPedidos } from './../ordem/ordens.model';
import { GameService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from '../ordem/ordem.model';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent implements OnInit {
  fecharPedido: boolean;
    pedidos: GamesPedidos;
    sum: number;
    sub: Subscription;
    gamespedido: GamesPedidos[] = [];
    games: Games[] = [];

    pedidoSelecionado: Pedido;
    carrinhoPedidos: GamesPedidos;

  constructor(private service: GameService) { }

  ngOnInit(): void {
  }



}
