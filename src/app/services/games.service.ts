import { GamesPedidos } from './../loja/ordem/ordens.model';
import { Games } from './../loja/games/games.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pedido } from '../loja/ordem/ordem.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  api  = 'http://localhost:3000/products';

  private pedido: Pedido;
  private pedidos: GamesPedidos = new GamesPedidos();

  private pedidoSubject = new Subject();
  private pedidosSubject = new Subject();

  gamesPedidosChange = this.pedidoSubject.asObservable();
    pedidosChange = this.pedidosSubject.asObservable();
   /*  TotalChanged = this.totalSubject.asObservable(); */

  constructor(private http: HttpClient) {}

  listarGames(): Observable<Games> {
    return this.http.get<Games>(this.api);
  }

  set SelecionarPedido(value: Pedido) {
    this.pedido = value;
    this.pedidoSubject.next();
}

get SelecionarPedido() {
    return this.pedido;
}

set GamePedidos(value: GamesPedidos) {
    this.pedidos = value;
    this.pedidosSubject.next();
}

get PedidosGame() {
    return this.pedidos;
}

}
