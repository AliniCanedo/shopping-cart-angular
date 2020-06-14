import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LojaComponent } from './loja/loja.component';
import { GamesComponent } from './loja/games/games.component';
import { OrdemComponent } from './loja/ordem/ordem.component';
import { CarrinhoDeComprasComponent } from './loja/carrinho-de-compras/carrinho-de-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    LojaComponent,
    GamesComponent,
    OrdemComponent,
    CarrinhoDeComprasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
