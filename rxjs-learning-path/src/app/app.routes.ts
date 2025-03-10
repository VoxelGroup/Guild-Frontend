import { Routes } from '@angular/router';
import {MapComponent} from './operators/components/map/map.component';
import {FilterComponent} from './operators/components/filter/filter.component';
import {SwitchMapComponent} from './operators/components/switch-map/switch-map.component';

export const appRoutes = {
  map: 'map',
  filter: 'filter',
  switchMap: 'switchMap',
}

export const routes: Routes = [
  { path: appRoutes.map ,component: MapComponent },
  { path: appRoutes.filter, component: FilterComponent },
  { path: appRoutes.switchMap, component: SwitchMapComponent },
];
