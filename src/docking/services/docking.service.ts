import { Injectable } from '@angular/core';
import { DockingLayoutComponent } from '../dockingLayout.component';
import { IDockingLayoutConfig } from '../interfaces/IDockingLayoutConfig';
import GoldenLayout from 'golden-layout';
import { ComponentConfigService } from './componentConfig.service';
import { IDockingComponentConfig } from '../interfaces/IDockingComponentConfig';
import { DataService } from '../../dataServices/data.service';


@Injectable({
  providedIn: 'root'
})
/**
 * A service that is responsible for interaction with the docking layout.
 */
export class DockingService {

  /**
   * The current loaded DockingLayoutComponent.
   */
  private currentdockingLayout: DockingLayoutComponent;

  constructor( private componentConfigService: ComponentConfigService, private dataService: DataService) {
  }

  /**
   * Save the given IDockingLayoutConfig with help of DataService.
   */
  saveDockingLayoutConfig(myDockingLayoutConfig: IDockingLayoutConfig): void {
    this.dataService.saveIDockingLayoutConfig(myDockingLayoutConfig);
  }

  /**
   * Get the IDockingLayoutConfig with the given myId with help of DataService.
   */
  getDockingLayoutConfigById(myId: string): IDockingLayoutConfig {
    return this.dataService.getIDockingLayoutConfigById(myId);
  }

  /**
   * Get the IDockingLayoutConfig with the given myTitle with help of DataService.
   */
  getDockingLayoutConfigByTitle(myTitle: string): IDockingLayoutConfig {
    return this.dataService.getIDockingLayoutConfigByTitle(myTitle);
  }

  /**
   * Set the current loaded DockingLayoutComponent.
   */
  setCurrentDockingLayout(myDockingLayout: DockingLayoutComponent): void {
    this.currentdockingLayout = myDockingLayout;
  }

  /**
   * Get the current loaded DockingLayoutComponent.
   */
  getCurrentDockingLayout(): DockingLayoutComponent {
    return this.currentdockingLayout;
  }

  /**
   * Create the [[DockingComponent]] which is defined by myComponentConfig, in the [[currentDockingLayout]].
   * @param myComponentConfig the [[IDockingComponentConfig]] of the DockingComponent we want to create.
   * This function will call the [[saveIDockingComponentConfigAsync]] of [[DataService]].
   * First we save the IDockingComponentConfig with DataService.
   * Then we create an unfilled golden layout container with the Id given in IDockingComponentConfig.
   * The generated DockingComponent will fetch the data transferred from dataservice in the first step to initialize.
   * Step 1: Save data.
   * Step 2: Create empty DockingComponent with Id.
   * Step 3 (In DockingComponent): Get data from step 1.
   */
  createComponentInCurrentDockingLayout(myComponentConfig: IDockingComponentConfig): void {
    // generate new GUID if id is '0'
    if (myComponentConfig.id === '0') {
      myComponentConfig.id = this.componentConfigService.generateId();
    }
    // async call to save data (step 1)
    this.dataService.saveIDockingComponentConfigAsync(myComponentConfig).then(
      // then addComponent in currentDockingLayout with the given id (step 2)
      () => this.getCurrentDockingLayout().addComponent(myComponentConfig.id, myComponentConfig.componentName));
  }
  /**
   * Load a DockingComponent into the currentDockingLayout.
   * @param myId the Id of the DockingComponent we want to load.
   * @param myComponentName name of the DockingComponent, optional:
   * if not given it will fetch it from DataService.
   * It will only add an empty DockingComponent to the DockingLayout, the DockingComponent will load its data itself.
   */
  loadComponentInCurrentDockingLayout(myId: string, myComponentName: string = 'NoName'): void {
    if (myComponentName === 'NoName') {
      myComponentName = this.dataService.getIDockingComponentNameById(myId);
    }
    this.getCurrentDockingLayout().addComponent(myId, myComponentName);
  }

}
