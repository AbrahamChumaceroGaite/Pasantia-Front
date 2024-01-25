import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  enterpriseSubmitted = new EventEmitter<void>();
  enterpriseUpdated = new EventEmitter<void>();

  emitEnterpriseSubmitted() {
    this.enterpriseSubmitted.emit();
  }

  emitEnterpriseUpdated() {
    this.enterpriseUpdated.emit();
  }

}
