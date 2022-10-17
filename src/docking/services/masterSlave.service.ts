import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})

export class MasterSlaveService {
  private slaveMap = new Map<string, Subject<string>>();
  private masterId = null;

  public addSlave(id:string, subject: Subject<string>) {
    this.slaveMap.set(id, subject);
  }

  public addMaster(id: string) {
    this.masterId = id;
  }

  public isMaster(id:string) {
    if(this.masterId === id) {
      return true;
    }
    else{
      return false;
    }
  }

  public triggerSlaves(changedVal) {
    this.slaveMap.forEach((value,key)=> {
      value.next(changedVal);
    });
  }
}
