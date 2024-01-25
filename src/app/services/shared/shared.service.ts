import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
  private selectedEnterpriseSubject = new BehaviorSubject<any>(null);
  selectedEnterprise$ = this.selectedEnterpriseSubject.asObservable();



  setselectedEnterprise(value: any) {
    this.selectedEnterpriseSubject.next(value);
  } 
  
}
