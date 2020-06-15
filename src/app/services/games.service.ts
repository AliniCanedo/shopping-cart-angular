import { Game } from './../shared/modelos/games';
import { GameOrdens } from './../shared/modelos/game-ordens';
import { GameOrdem } from './../shared/modelos/game-ordem';
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

    private gameOrdem: GameOrdem;
    private pedidos: GameOrdens = new GameOrdens();



    private gameOrdemSubject = new Subject();
    private pedidosSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;
    private subTotalSubject = new Subject();
    private sumFreteSubject = new Subject();
    private semFreteSubject = new Subject();


    private subtotal: number;
    private sumFrete: number;
    private semFrete: number;

    PedidoGameAlterado = this.gameOrdemSubject.asObservable();
    PedidoAlterado = this.pedidosSubject.asObservable();
    TotalAlterado = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    listarTodosGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.api);
    }

    salvarPedido(pedido: GameOrdens) {
        return this.http.post(this.api, pedido);
    }


    set pedidoGameSelecionado(value: GameOrdem) {
        this.gameOrdem = value;
        this.gameOrdemSubject.next();
    }

    get pedidoGameSelecionado() {
        return this.gameOrdem;
    }

    set GamesPedidos(value: GameOrdens) {
        this.pedidos = value;
        this.pedidosSubject.next();
    }

    get GamesPedidos() {
        return this.pedidos;
    }

    get Total() {
      return this.total;
  }

  set Total(value: number) {
      this.total = value;
      this.totalSubject.next();
  }
  get SubTotal() {
      return this.subtotal;
  }

  set SubTotal(value: number) {
      this.subtotal = value;
      this.subTotalSubject.next();
  }
  get SumFrete() {
      return this.sumFrete;
  }

  set SumFrete(value: number) {
      this.sumFrete = value;
      this.sumFreteSubject.next();
  }

  get SemFrete() {
      return this.semFrete;
  }

  set SemFrete(value: number) {
      this.semFrete = value;
      this.semFreteSubject.next();
  }

}
