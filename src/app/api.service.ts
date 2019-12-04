import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000/messages';

  constructor(private httpClient: HttpClient) {
  }

  public get() {
    return this.httpClient.get(this.SERVER_URL);
  }

  public save(data) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (data.messageUUID) {
      data.id = data.messageUUID;
      return this.httpClient.put(this.SERVER_URL + '/' + data.id, data, {headers});
    } else {
      data.id = data.messageUUID = UUID.UUID();
      return this.httpClient.post(this.SERVER_URL, data, {headers});
    }
  }

  public delete(data) {
    return this.httpClient.delete(this.SERVER_URL + '/' + data.messageUUID);
  }

  public importMessage(data) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    data.id = data.messageUUID;
    return this.httpClient.post(this.SERVER_URL, data, {headers});
  }
}
