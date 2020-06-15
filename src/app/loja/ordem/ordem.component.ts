import { GameService } from './../../services/games.service';
import { Subscription } from 'rxjs';
import { GameOrdens } from './../../shared/modelos/game-ordens';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.component.html',
  styleUrls: ['./ordem.component.css']
})
export class OrdemComponent implements OnInit {
  pedidos: GameOrdens;
  total: number;
  pago: boolean;
  sub: Subscription;

  constructor(private service: GameService) {
      this.pedidos = this.service.GamesPedidos;
  }

  ngOnInit() {
      this.pago = false;
      this.sub = this.service.PedidoAlterado.subscribe(() => {
          this.pedidos = this.service.GamesPedidos;
      });
      this.carregarTotal();
  }

  pagamento() {
      this.pago = true;
      this.service.salvarPedido(this.pedidos).subscribe();
  }

  carregarTotal() {
      this.sub = this.service.TotalAlterado.subscribe(() => {
          this.total = this.service.Total;
      });
  }
}
