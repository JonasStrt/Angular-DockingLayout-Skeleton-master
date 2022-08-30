import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { GoldenLayoutModule, ComponentType } from 'node_modules/ngx-golden-layout';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from '../widgets/nav.component';
import { DockingLayoutComponent} from '../docking/dockingLayout.component';
import { appRoutes } from './routes';
import { SettingComponent } from '../widgets/setting.component';
import { TestComponent } from 'src/docking/dockingWidgets/test.component';
import { LoadingComponent } from 'src/docking/dockingWidgets/loading.component';
import { from } from 'rxjs';

// It is required to have JQuery as global in the window object.
window['$'] = $;

/**
 * Define our components.
 */
const COMPONENTS = [
  AppComponent,
  NavComponent,
  SettingComponent,
  TestComponent,
  LoadingComponent,
  DockingLayoutComponent
];

/**
 * Is required for golden layout.
 * Define here all types that you want to include in the golden layout.
 */
const componentTypes: ComponentType[] = [{
  name: 'test',
  type: TestComponent
},
{
  name: 'loading',
  type: LoadingComponent
}
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    GoldenLayoutModule.forRoot(componentTypes),
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ COMPONENTS],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
