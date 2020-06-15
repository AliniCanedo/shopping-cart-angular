import { GamesComponent } from './loja/games/games.component';
import { AppComponent } from './app.component';
import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  { path: '#', component: AppComponent },
  { path: 'products', component: GamesComponent}

  ];
