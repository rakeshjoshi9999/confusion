import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/observable/of';

import { Promotion } from '../shared/promotion';

@Injectable()
export class PromotionService {


  constructor(private http: Http,
  private processHttpMsgService: ProcessHttpmsgService) { }

  getPromotions() : Observable<Promotion[]>{
    return this.http.get(baseURL+'promotions').map(res => { return this.processHttpMsgService.extractData(res);});
  }
  getPromotion(id: number): Observable<Promotion>{
    return this.http.get(baseURL+'promotions/'+id).map(res =>{ return this.processHttpMsgService.extractData(res);});
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get(baseURL+'promotions?featured=true').map(res =>{ return this.processHttpMsgService.extractData(res)[0]});
  }

}
