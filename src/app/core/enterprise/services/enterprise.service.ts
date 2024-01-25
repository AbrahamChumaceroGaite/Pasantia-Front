import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Enterprise } from 'src/app/models/enterprise';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  baseUrl: string = '';
  baseUrlAux: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.appUrl + 'api/enterprise';
  }

  save(any: any) {
    return this.http.post(this.baseUrl + "/post", any);
  }

  getEnterprises(event: LazyLoadEvent, startDate?: Date, endDate?: Date): Observable<{ filas: Enterprise[]; totalFilas: number }> {
    const params: any = {
      first: event.first,
      rows: event.rows
    };

    if (startDate) {
      params.startDate = startDate;
    }

    if (endDate) {
      params.endDate = endDate;
    }

    if (event.globalFilter) {
      params.globalFilter = event.globalFilter;
    }

    if (event.sortField) {
      params.sortField = event.sortField;
    }

    if (event.sortOrder) {
      params.sortOrder = event.sortOrder;
    }

    return this.http.get<{ filas: Enterprise[]; totalFilas: number }>(this.baseUrl + '/get', {params });
  }

  getById(id: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + "/getById/" + id);
  }

  getMisc(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + "/getMisc");
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete/" + id);
  }

  update(id: any, body: any): Observable<any> {
    return this.http.put(this.baseUrl + "/put/" + id, body).pipe(
      map((response: any) => response.message)
    );
  }

  sendToReview(id: any): Observable<any> {
    return this.http.post(this.baseUrl + "/toReview", id);
  }

}
