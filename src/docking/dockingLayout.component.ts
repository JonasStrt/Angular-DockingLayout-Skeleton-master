import { Component, Inject, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import GoldenLayout from 'golden-layout';
import { DockingService } from './services/docking.service';
import { GoldenLayoutComponent } from 'node_modules/ngx-golden-layout';
import { of } from 'rxjs';
import { DockingComponent } from './DockingComponent';
import {ActivatedRoute} from '@angular/router';
import {IDockingLayoutConfig} from './interfaces/IDockingLayoutConfig';

@Component({
  selector: 'app-docking',
  template: `<div class="spawn-new"></div>
  <golden-layout-root [layout]="layoutConfig$" (stateChanged)="layoutChanged($event)">
  </golden-layout-root>`,
})

/**
 * A Component which represents the Golden Layout Container
 * It contains the golden-layout-root
 */
export class DockingLayoutComponent implements  AfterViewInit, OnInit {

  /**
   * id the id of this DockingLayoutComponent.
   * Can be passed through routing params.
   */
  @Input() id: string ;

  /**
   * layoutConfig the config file which describes the goldenlayout container configs (position...).
   */
  public layoutConfig: GoldenLayout.Config;

  /**
   * title the title of this DockingLayoutComponent.
   * Can be passed through routing params.
   */
  // tslint:disable-next-line: no-inferrable-types
  @Input() title: string = 'main';

  /**
   * goldenLayoutComponent the GoldenLayoutComponent in this DockingLayoutComponent
   */
  @ViewChild(GoldenLayoutComponent, { static: true })
  goldenLayoutComponent: GoldenLayoutComponent;

  /**
   * Needed for GoldenLayout to assign [layout] in golden-layout-root
   */
  layoutConfig$;

  constructor(private dockingService: DockingService, private activatedRoute: ActivatedRoute) {}

  /**
   * Add an empty DockingComponent to this goldenlayout
   * Pass the DockingComponentId through componentState.
   * So the DockingComponent can access the Id.
   * The DockingComponent will load its IDockingComponentCofing on itself.
   * @parm myId the Id of this DockingComponent.
   * @parm myComponentName the name of this DockingComponent.
   */
  addComponent(myId: string, myComponentName: string): void {
    this.goldenLayoutComponent.createNewComponent({
        // componentName
        componentName: myComponentName,
        type: 'component',
        // Title will be replaced ind DockingComponent
        title: 'loading...',
        // Set componentState with id
        componentState : {id: myId}
      });
  }

  // Deprecated: A way to initialize the DockingComponent
  // Replaced by DataServices
  /*
  addComponent(myComponentConfig: IDockingComponentConfig): void {
    this.createComponent(myComponentConfig).then((myId: string) => this.initComponent(this.getLastComponent(), myComponentConfig, myId));
  }

  createComponent(myComponentConfig: IDockingComponentConfig) {
    const promise = new Promise((resolve, reject) => {
      this.goldenLayoutComponent.createNewComponent({
        componentName: myComponentConfig.componentName,
        type: 'component',
        title: myComponentConfig.title,
        id: myComponentConfig.id,
        componentState : {id: myComponentConfig.id, title: myComponentConfig.title}
      });
      resolve(myComponentConfig.id);
    });
    return promise;
  }

  initComponent(myComponent: DockingComponent, myComponentConfig: IDockingComponentConfig, myId: string): void {
    myComponent.setId(myId);
    myComponent.initInLayout(myComponentConfig);
  }
*/
  /**
   * Get Last added DockingComponent.
   * @returns DockingComponent
   */
  getLastComponent(): DockingComponent {
    return this.goldenLayoutComponent.openedComponents.slice(-1)[0];
  }

  /**
   * get a DockingComponent in this layout by Id.
   * @param myId Id of the DockingComponent.
   * @returns the related DockingComponent in this layout.
   */
  getComponent(myId: string): DockingComponent {
    for (const component of this.goldenLayoutComponent.openedComponents) {
      if (component.getId() === myId) {
        return component;
      }
    }
    return null;
  }

  /**
   * Save this DockingLayoutComponent in a descriptive IDockingLayoutConfig
   * @returns IDockingLayoutConfig
   */
  saveDockingLayoutConfig(): void {
    const myDockingConfig: IDockingLayoutConfig = {
      id: this.id,
      title: this.title,
      layoutConfig:  this.goldenLayoutComponent.getSerializableState(),
    };
    this.dockingService.saveDockingLayoutConfig(myDockingConfig);
  }

  loadDockingLayoutConfig(myDockingLayoutConfig: IDockingLayoutConfig) {}

  ngOnInit(): void {
     let myDockingLayoutConfig: IDockingLayoutConfig;
     // check for title
     if (this.activatedRoute.snapshot.queryParamMap.has('title')) {
       // get the DockingLayoutConfig by calling the docking service with the parms we got through the routing call
       myDockingLayoutConfig = this.dockingService.getDockingLayoutConfigByTitle(this.activatedRoute.snapshot.queryParamMap.get('title'));
       // set attributes
       this.layoutConfig = myDockingLayoutConfig.layoutConfig;
       this.id = myDockingLayoutConfig.id;
       this.title = myDockingLayoutConfig.title;
     }
     // set the layoutConfig$ for golden layout
     this.layoutConfig$ = of(this.layoutConfig);
  }

  ngAfterViewInit() {
    // set the current dockingLayout in dockingService
    this.dockingService.setCurrentDockingLayout(this);
  }

  layoutChanged(evt: any): void {
    console.log('Event Fired');
    this.saveDockingLayoutConfig();
  }
}
