import { Component, Input, Inject, Optional } from '@angular/core';
import { DockingComponent } from 'src/docking/DockingComponent';
import {
  GoldenLayoutComponentState, GoldenLayoutContainer,
  } from 'node_modules/ngx-golden-layout';
import { IDockingComponentConfig } from 'src/docking/interfaces/IDockingComponentConfig';
import { DataService } from 'src/dataServices/data.service';
import GoldenLayout from 'golden-layout';


@Component({
  selector: 'app-test',
  template: ` <mat-form-field class="example-full-width">
  <mat-label>Enter a Value</mat-label>
  <input matInput placeholder="Some Value" [(ngModel)]='componentConfig.componentData.myValue'
   [value]= 'componentConfig.componentData.myValue'>
  </mat-form-field>`
})

/**
 * TestComponent to show functionality.
 * Extends DcokingComponent so it can be docked in DockingLayoutComponnet.
 */
export class TestComponent extends DockingComponent {

  /**
   * Default initialization.
   * Adds myValue to componentData
   */
  public componentConfig: IDockingComponentConfig = {
      id: '0',
      componentName: 'test',
      title: 'defaultTitle',
      componentData:
        {
          myValue: 'None'
        }
    };

  constructor(
    @Optional()@Inject(GoldenLayoutComponentState) private state: any,
    @Optional()@Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
    private dataService: DataService) {
    super(state, container, dataService);
    if ( this.state !== null) {
        // get IDockingComponentConfig by th given id in goldenlayout state
        this.componentConfig = dataService.getIDockingComponentConfigById(this.state.id);
        // init
        this.initInLayout(this.componentConfig);
        // set title
        this.container.setTitle(this.componentConfig.title);
      }
    }

  initInLayout(myComponentConfig: IDockingComponentConfig): void {
     this.componentConfig = myComponentConfig;
  }

  getCurrentComponentConfig(): IDockingComponentConfig {
    return this.componentConfig;
    }

}
