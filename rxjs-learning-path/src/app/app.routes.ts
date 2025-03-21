import { Routes } from '@angular/router';
import {MapComponent} from './operators/components/map/map.component';
import {FilterComponent} from './operators/components/filter/filter.component';
import {SwitchMapComponent} from './operators/components/switch-map/switch-map.component';
import {TapComponent} from './operators/components/tap/tap.component';

export const appRoutes = {
  map: 'map',
  filter: 'filter',
  switchMap: 'switchMap',
  tap: 'tap'
}

export const routes: Routes = [
  { path: appRoutes.map ,component: MapComponent },
  { path: appRoutes.filter, component: FilterComponent },
  { path: appRoutes.switchMap, component: SwitchMapComponent },
  { path: appRoutes.tap, component: TapComponent },
];
