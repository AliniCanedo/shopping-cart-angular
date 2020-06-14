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
  games: Games;
  pedido: Pedido;
  pedidoSelecionado: Pedido;
  // tslint:disable-next-line: variable-name
  container_on = false;
  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.service.listarGames()
    .subscribe(dados => this.games = dados);
  }

  adicionarCarrinho(pedido: Pedido) {
    console.log('produto adiconado ao carinho');
    this.service.SelecionarPedido = pedido;
    this.pedidoSelecionado = this.service.SelecionarPedido;
  }
}
