import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as dockingComponentsJson from '../assets/dockingComponents.json';
import * as dockingLayoutsJson from '../assets/dockingLayouts.json';
import { DomSanitizer } from '@angular/platform-browser';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

/**
 * Service class that is responsible for handling the data flow at local level.
 */
export class LocalDataService {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Json file which stores the information about every DockingComponent.
   */
  // @ts-ignore
  private componentsJson = dockingComponentsJson.default;

  /**
   * Json file which stores the information about every LayoutComponent.
   */
  // @ts-ignore
  private layoutsJson = dockingLayoutsJson.default;

  /**
   * Load a DockingLayoutConfig by Id.
   * @param myId id of the DockingLayout
   * @returns JSON the IDockingLayoutConfig as JSON file
   */
  public getLayoutConfigJsonById(myId: string): any {
    for (const layout of this.layoutsJson) {
      if ( layout.id === myId) {
        return layout;
      }
    }
    return null;
  }

  /**
   * Load a DockingLayoutConfig by Title.
   * @param myTitle title of the DockingLayout
   * @returns JSON the IDockingLayoutConfig as JSON file
   */
  public getLayoutConfigJsonByTitle(myTitle: string): any {
    for (const layout of this.layoutsJson) {
      if ( layout.title === myTitle) {
        return layout;
      }
    }
    return null;
  }

  /**
   * Save a DockingLayout.
   * @param myLayout IDockingLayoutConfig as JSON
   */
  public saveLayoutConfigJson(myLayout: any): void {
    for (const index in this.layoutsJson) {
      if ( this.layoutsJson[index].id === myLayout.id) {
          this.layoutsJson[index] = myLayout;
          return;
      }
    }
    this.layoutsJson.push(myLayout);
  }

  /**
   * Load a DockingComponentConfig by Id.
   * @param myId id of the DockingComponent
   * @returns JSON the IDockingComponentConfig as JSON file
   */
  public getComponentConfigJsonById(myId: string): any {
    for (const component of this.componentsJson) {
      if ( component.id === myId) {
        return component;
      }
    }
    return null;
  }

  /**
   * Save a DockingComponet.
   * @param myComponent IDockingComponentConfig as JSON
   */
  public saveComponentConfigJson(myComponent: any): void {
    for (const index in this.componentsJson) {
      if ( this.componentsJson[index].id === myComponent.id) {
          this.componentsJson[index] = myComponent;
          return;
      }
    }
    this.componentsJson.push(myComponent);
  }

  /**
   * get the componentName by Id
   * @param myId id of the DockingComponent
   */
  public getDockingComponentNameById(myId: string): string {
    for (const component of this.componentsJson) {
      if ( component.id === myId) {
        return component.componentName;
      }
    }
  }

  /**
   * Save the IDockingComponentConfig to a JSON file and download it
   */
  public saveComponentConfigsToFile(): void {
    const file = new Blob([JSON.stringify(this.componentsJson)], { type: 'data:text/json;charset=UTF-8' });
    saveAs(file, 'dockingComponents.json');
  }

  /**
   * Save the IDockingLayoutConfig to a JSON file and download it
   */
  public saveLayoutsConfigsToFile(): void {
    const file = new Blob([JSON.stringify(this.layoutsJson)], { type: 'data:text/json;charset=UTF-8' });
    saveAs(file, 'dockingLayouts.json');
  }


}
