/**
 * An interface that describes the composition of a DockingComponet.
 */
export interface IDockingComponentConfig {

  /**
   * Id
   */
  id: string;

  /**
   * ComponentName is used to be created in the golden layout.
   */
  componentName: string;

  /**
   * Title tab title in golden layout.
   */
  title: string;

  /**
   * Define the data needed in this component.
   */
  componentData: any;
}
