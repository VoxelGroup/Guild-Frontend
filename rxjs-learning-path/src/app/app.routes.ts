import { Routes } from '@angular/router';
import {MapComponent} from './operators/components/map/map.component';
import {FilterComponent} from './operators/components/filter/filter.component';

export const appRoutes = {
  map: 'map',
  filter: 'filter'
}

export const routes: Routes = [
  { path: appRoutes.map ,component: MapComponent },
  { path: appRoutes.filter, component: FilterComponent }
];
