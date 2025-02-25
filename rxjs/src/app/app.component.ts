import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Tab, TabList, Tabs} from 'primeng/tabs';
import {appRoutes} from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TabList, Tab, Tabs],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly appRoutes = appRoutes;
}
