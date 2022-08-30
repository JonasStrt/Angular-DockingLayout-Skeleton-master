/**
 * An interface that describes the composition of a DockingLayout.
 */
export interface IDockingLayoutConfig {

  /**
   * Id
   */
  id: string;

  /**
   * title
   */
  title: string;

  /**
   * layoutConfig describes the composition of the individual containers in the goldenlayout.
   */
  layoutConfig: any;
}
