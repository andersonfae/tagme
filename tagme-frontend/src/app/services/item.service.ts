import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: string; // Use "id" em vez de "_id"
  title: string;
  description: string;
  photoUrl?: string; // Atualize para refletir o nome correto
}

@Injectable()
export class ItemService {
  private apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  create(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
