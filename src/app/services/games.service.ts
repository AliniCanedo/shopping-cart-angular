import { GamesPedidos } from './../shared/modelos/ordens.model';
import { Pedido } from './../shared/modelos/ordem.model';
import { Game } from '../shared/modelos/games';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  api = 'http://localhost:3000/products';

  private productOrder: Pedido;
  private orders: GamesPedidos = new GamesPedidos();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();
  private subTotalSubject = new Subject();
  private sumFreteSubject = new Subject();

  private total: number;
  private subtotal: number;
  private sumFrete: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {}

  // lista todos os games

  listarProdutos(): Observable<Game[]> {
    return this.http.get<Game[]>(this.api);
  }

  set SelectedProductOrder(value: Pedido) {
    this.productOrder = value;
    this.productOrderSubject.next();
  }

  get SelectedProductOrder() {
    return this.productOrder;
  }

  set ProductOrders(value: GamesPedidos) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get ProductOrders() {
    return this.orders;
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
}
