import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/observable/of';

import { Leader } from '../shared/leader';

@Injectable()
export class LeaderService {

  constructor(private http:Http,
  private processHttpMsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get(baseURL+'leaders').map(res =>{ return this.processHttpMsgService.extractData(res);});
  }

  getLeader(id: number): Observable<Leader>{
    return this.http.get(baseURL+'leaders/'+id).map(res => {return this.processHttpMsgService.extractData(res);});
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get(baseURL+'leaders?featured=true').map(res =>{ return this.processHttpMsgService.extractData(res)[0]});
  }

}
