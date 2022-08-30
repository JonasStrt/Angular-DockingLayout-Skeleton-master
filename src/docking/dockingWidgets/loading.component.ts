import { Component, Input, Inject, Optional } from '@angular/core';
import { DockingComponent } from 'src/docking/DockingComponent';
import {
  GoldenLayoutComponentState, GoldenLayoutContainer,
  } from 'node_modules/ngx-golden-layout';
import { IDockingComponentConfig } from 'src/docking/interfaces/IDockingComponentConfig';
import { DataService } from 'src/dataServices/data.service';
import GoldenLayout from 'golden-layout';


@Component({
  selector: 'app-loader',
  template: `<mat-spinner></mat-spinner>`,
  styles: ['mat-spinner {margin: auto;margin-top:2em }']
})
export class LoadingComponent extends DockingComponent {

  constructor(
    @Optional()@Inject(GoldenLayoutComponentState) private state: any,
    @Optional()@Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
    private dataService: DataService) {
      super(state, container, dataService);
    }

  componentConfig: IDockingComponentConfig = {
    id: '0',
    componentName: 'loader',
    title: 'defaultTitle',
    componentData: {}
  };

  initInLayout(myComponentConfig: IDockingComponentConfig): void {
    return;
  }
  getCurrentComponentConfig(): IDockingComponentConfig {
    return this.componentConfig;
  }

}
