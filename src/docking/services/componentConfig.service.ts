import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})

/**
 * Service which is responsible for ComponentConfig.
 */
export class ComponentConfigService {

  /**
   * generate a GUID.
   * @returns a GUID as string.
   */
  generateId(): string {
    return Guid.create().toString();
  }

}
