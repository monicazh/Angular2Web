import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LfgRequest} from "./lfg-request";


@Injectable()
export class LfgService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private lfgAllUrl = 'api/lfgs';
  private lfgSingleUrl = 'api/lfg';

  constructor(private http: Http) {
    console.log('LFG Service Initialized...');
    //this.profiles = this.getProfiles();
  }

  getAllLfgs(){
    console.log("***Service#getAllLfgs()");
    return this.http.get(this.lfgAllUrl)
      .map(res => res.json());
    //  .catch(this.handleError);
  }
  getLfgById(id: number) {
    const url = `${this.lfgSingleUrl}/${id}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  create(lfg: LfgRequest) {
    console.log("***LFG-Service#Create(), LFG Req=",lfg);
    //var headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.lfgAllUrl, lfg)
      .map(res => res.json());
  }

  // authenticated player update LFG request
  update(lfg) {
    console.log("***LFG-Service## Update(), LFG Req=",lfg);
    const url = `${this.lfgSingleUrl}/${lfg._id}`;
    return this.http
      .put(url, JSON.stringify(lfg), {headers: this.headers})
      .map(res => res.json());
  }

  delete(lfg) {
    console.log("***LFG-Service## Delete(), LFG Req=",lfg);
    const url = `${this.lfgSingleUrl}/${lfg._id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(res => res.json());
  }

}
