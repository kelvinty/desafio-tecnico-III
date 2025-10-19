import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // Importar UUID

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private lastKey?: string;

  constructor(private http:HttpClient){}

  postPaciente(paciente:any){
    const key = this.lastKey || uuidv4();
    this.lastKey = key;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Idempotency-Key': key
    });

    return this.http.post('http://localhost:3000/pacientes', paciente,{ headers });
  }

  getPacientes(){
    return this.http.get('http://localhost:3000/pacientes');
  }

  updatePaciente(id:number, paciente:any){
    return this.http.put(`http://localhost:3000/pacientes/${id}`, paciente);
  }

  delPaciente(id:number){
    return this.http.delete(`http://localhost:3000/pacientes/${id}`);
  }

  resetLastKey() {
    this.lastKey = undefined;
  }
}
