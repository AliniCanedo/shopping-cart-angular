import { OrdemComponent } from './ordem/ordem.component';
import { CarrinhoDeComprasComponent } from './carrinho-de-compras/carrinho-de-compras.component';
import { GamesComponent } from './games/games.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent  {

  private collapsed = true;
  fimDoPedido = false;

  @ViewChild('productsC')
  productsC: GamesComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: CarrinhoDeComprasComponent;

  @ViewChild('ordersC')
  ordersC: OrdemComponent;


  fecharPedido(fimDoPedido: boolean) {
      this.fimDoPedido = fimDoPedido;
  }

  redefinir() {
      this.fimDoPedido = false;
      this.productsC.redefinir();
      this.shoppingCartC.redefinir();
      this.ordersC.pago = false;
  }
}
