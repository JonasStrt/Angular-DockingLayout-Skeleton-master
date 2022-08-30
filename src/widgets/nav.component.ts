import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { DockingService } from 'src/docking/services/docking.service';
import { IDockingComponentConfig } from 'src/docking/interfaces/IDockingComponentConfig';
import { LocalDataService } from 'src/dataServices/localData.service';
// import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-navigation',
  template: `<mat-toolbar color="primary">
            <mat-toolbar-row>
            <span><a class="menu_links" (click)='showDashboard()'>Docking</a></span>
            <span style="margin-left:3em"><a class="menu_links" (click)='addTab()'>Add new tab</a></span>
            <span style="margin-left:3em"><a class="menu_links" (click)='openTab()'>Open 4711 tab</a></span>
            <span style="margin-left:3em"><a class="menu_links" (click)='saveDockingLayout()' >Save Dockinglayout</a></span>
            <span style="margin-left:3em"><a class="menu_links" (click)='showSettings()'>Settings</a></span>
            </mat-toolbar-row>`,
  styles: [` a.menu_links {
            cursor: pointer;
          }`]
})

/**
 * Only mockup
 */
export class NavComponent {

  constructor(private router: Router, private dockingService: DockingService, private testService: LocalDataService) {

  }

  showSettings(): void {
      this.router.navigate(['settings']);
  }

  showDashboard(): void {
    this.router.navigate(['dashboard'], { queryParams: { title: 'main' } });
  }

  addTab(): void {
    const testComponentConfig: IDockingComponentConfig = {
      id: '0',
      componentName: 'test',
      title: 'my Tab',
      componentData: {
        myValue: 'Test Value'
      }
    };
    this.dockingService.createComponentInCurrentDockingLayout(testComponentConfig);
  }

  openTab(): void {
    this.dockingService.loadComponentInCurrentDockingLayout('4711', 'test');
  }

  saveDockingLayout(): void {
    this.dockingService.getCurrentDockingLayout().saveDockingLayoutConfig();
    this.testService.saveComponentConfigsToFile();
    this.testService.saveLayoutsConfigsToFile();
  }

}
