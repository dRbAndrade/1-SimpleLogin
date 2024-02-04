import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  getStatus(date:string[]):Promise<HttpResponse>{
    return CapacitorHttp.post(
      {
        url:'https://factura-core.com/dashboard/cpestatus',
        data: {
          currentYear: date[0],
          currentMonth: date[1]
        },
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        }
    });
  }

  getRejected(date:string[]):Promise<HttpResponse>{
    return CapacitorHttp.post(
      {
        url:'https://factura-core.com/dashboard/cperejected',
        data: {
          currentYear: date[0],
          currentMonth: date[1]
        },
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        }
    });
  }

  getProcessed(date:string[]):Promise<HttpResponse>{
    return CapacitorHttp.post(
      {
        url:'https://factura-core.com/dashboard/cpeprocessed',
        data: {
          currentYear: date[0],
          currentMonth: date[1]
        },
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        }
    });
  }
  
  downloadReport(type:number, date:string[]){
    let endpoint: string;
    let url: string;
    switch(type){
      case 1: endpoint = "cpestatus"; break;
      case 2: endpoint = "cpeprocessed"; break;
      default: return;
    }

    url = "https://factura-core.com/dashboard/report/" + endpoint;

    CapacitorHttp.post({
        url,
        data:{yearReport:date[0],monthReport:date[1]},
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        }
    }).then(response => this.downloadFile(response.data, response.headers['Content-Type']!));

  }

  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

}
