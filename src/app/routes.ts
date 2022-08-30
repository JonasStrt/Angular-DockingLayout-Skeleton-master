import { Routes } from '@angular/router';
import { DockingLayoutComponent} from '../docking/dockingLayout.component';
import { SettingComponent } from '../widgets/setting.component';

/**
 * Angular Routes
 */
export const appRoutes: Routes = [
  { path: 'dashboard', component: DockingLayoutComponent },
  { path: 'settings', component: SettingComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: {id: 'Main'} },
];
