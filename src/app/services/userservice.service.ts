import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private http: HttpClient) {}

  displayUserData() {
    return this.http.get('http://localhost:3000/client');
  }

  updatUserData(data: any) {
    return this.http.put('http://localhost:3000/client/' + data.id, data);
  }

  deleteClient(data:any) {
    return this.http.delete('http://localhost:3000/client/' + data.id);
  }

  createUserData(data: any) {
    return this.http.post('http://localhost:3000/client', data);
  }
}
