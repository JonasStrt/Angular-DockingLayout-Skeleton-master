import { Injectable} from '@angular/core';
import { DockingLayoutComponent } from '../docking/dockingLayout.component';
import { IDockingLayoutConfig } from '../docking/interfaces/IDockingLayoutConfig';
import { LocalDataService } from './localData.service';
import { GlobalDataService } from './globalData.service';
import { IDockingComponentConfig } from '../docking/interfaces/IDockingComponentConfig';

/**
 * Enum to declare which data service we use.
 */
enum DataFlag {
 LOCAL = 0,
 GLOBAL = 1,
}

@Injectable({
  providedIn: 'root'
})

/**
 * A service that is responsible for getting data from the right data service.
 */
export class DataService {

  /**
   * Declare which data service we use.
   */
  public dataFlag: DataFlag;

  /**
   * The current data service ([[GlobalDataService]] or [[LocalDataService]]).
   */
  public currentDataService;

  constructor(private localDataService: LocalDataService, private globalDataService: GlobalDataService) {
    // TODO set this in UI
    this.setDataFlag(DataFlag.LOCAL);
  }

  /**
   * Set [[dataFlag]] and depending on the flag set the correct DataService to [[currentDataService]].
   * @parm myDataFlag the [[DataFlag]].
   */
  public setDataFlag(myDataFlag: DataFlag): void {
    this.dataFlag = myDataFlag;
    if (this.dataFlag === DataFlag.LOCAL) {
      this.currentDataService = this.localDataService;
    } else {
      this.currentDataService = this.globalDataService;
    }
  }

  /**
   * Get [[IDockingLayoutConfig]] by Id.
   * Call getLayoutConfigJsonById from [[currentDataService]].
   * @parm myId Id as string.
   * @returns myIDockingLayoutConfig the matching IDockingLayoutConfig.
   */
  getIDockingLayoutConfigById(myId: string): IDockingLayoutConfig {
    const myDockingLayoutJSON = this.currentDataService.getLayoutConfigJsonById(myId);
    const myIDockingLayoutConfig: IDockingLayoutConfig = myDockingLayoutJSON;
    return myIDockingLayoutConfig;
  }

  /**
   * Get [[IDockingLayoutConfig]] by Title.
   * Call getLayoutConfigJsonByTitle from [[currentDataService]].
   * @parm myTitle title as string.
   * @returns myIDockingLayoutConfig the matching IDockingLayoutConfig
   */
  getIDockingLayoutConfigByTitle(myTitle: string): IDockingLayoutConfig {
    const myDockingLayoutJSON = this.currentDataService.getLayoutConfigJsonByTitle(myTitle);
    const myIDockingLayoutConfig: IDockingLayoutConfig = myDockingLayoutJSON;
    return myIDockingLayoutConfig;
  }

  /**
   * Save a single [[IDockingLayoutConfig]].
   * Call saveLayoutConfig from [[currentDataService]].
   * @parm myLayoutConfig [[IDockingLayoutConfig]].
   */
  saveIDockingLayoutConfig(myLayoutConfig: IDockingLayoutConfig): void {
    const myDockingLayoutJSON = myLayoutConfig;
    this.currentDataService.saveLayoutConfigJson(myDockingLayoutJSON);
  }

  /**
   * Get [[IDockingComponentConfig]] by id.
   * Call getComponentConfigJsonByTitle from [[currentDataService]].
   * @parm myId as string.
   * @returns myIDockingComponentConfig the matching IDockingComponentConfig
   */
  getIDockingComponentConfigById(myId: string): IDockingComponentConfig {
    const myDockingComponentJSON = this.currentDataService.getComponentConfigJsonById(myId);
    const myDockingComponentConfig: IDockingComponentConfig = myDockingComponentJSON;
    return myDockingComponentConfig;
  }

  /**
   * Get DockingComponentName by id.
   * Call getDockingComponentNameById from [[currentDataService]].
   * @parm myId as string.
   * @returns componentName the name of the component we need to add it to golden layout.
   */
  getIDockingComponentNameById(myId: string): string {
    return this.currentDataService.getDockingComponentNameById(myId);
  }


  /**
   * Save a single [[IDockingComponentConfig]].
   * Call saveComponentConfigJson from [[currentDataService]].
   * @parm myComponentConfig [[IDockingComponentConfig]].
   */
  saveIDockingComponentConfig(myComponentConfig: IDockingComponentConfig): void {
    const myComponentJSON = myComponentConfig;
    this.currentDataService.saveComponentConfigJson(myComponentJSON);
  }

  /**
   * Save a single [[IDockingComponentConfig]].
   * Call saveComponentConfigJson from [[currentDataService]].
   * This function returns a promise,
   * so you can be sure that the given IDockingComponentConfig is saved before you continue.
   * @parm myComponentConfig [[IDockingComponentConfig]].
   * @return promise
   */
  saveIDockingComponentConfigAsync(myComponentConfig: IDockingComponentConfig): any {
    const promise = new Promise((resolve, reject) => {
    const myComponentJSON = myComponentConfig;
    this.currentDataService.saveComponentConfigJson(myComponentJSON);
    resolve(true);
    });
    return promise;
  }

}
