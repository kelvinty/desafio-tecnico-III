import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // Importar UUID

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  private lastKey?: string;

  constructor(private http:HttpClient){}

  postExame(exame:any){
    const key = this.lastKey || uuidv4();
    this.lastKey = key;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Idempotency-Key': key
    });

    return this.http.post('http://localhost:3000/exames', exame,{ headers });
  }

  getExames(page:number, limit:number){
    return this.http.get(`http://localhost:3000/exames?limit=${limit}&page=${page}`);
  }

  updateExame(id:number, exame:any){
    return this.http.patch(`http://localhost:3000/exames/${id}`, exame);
  }

  delExame(id:number){
    return this.http.delete(`http://localhost:3000/exames/${id}`);
  }

  resetLastKey() {
    this.lastKey = undefined;
  }
}
