import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QrCodeRequest, QrCodeResponse, QrCodeType } from '../models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrCode {

  private apiUrl = environment.apiUrl+'/v1/qrcode';

  constructor (private  http: HttpClient){}

  generate(request : QrCodeRequest):Observable<QrCodeResponse>{
    return this.http.post<QrCodeResponse>(this.apiUrl+'/generate', request);
  }

  // Gère les deux formats : tableau brut ou réponse paginée Spring (Page<>)
  getHistory(): Observable<QrCodeResponse[]>{
    return this.http.get<any>(this.apiUrl+'/history').pipe(
      map(data => Array.isArray(data) ? data : data.content ?? [])
    );
  }

  getHistoryByType(type: string): Observable<QrCodeResponse[]>{
    return this.http.get<QrCodeResponse[]>(this.apiUrl+'/history/'+type)
  }

  getStats(): Observable<{[key: string]: number}> {

    return this.http.get<{[key: string]: number}>(`${this.apiUrl}/stats`);
  }


  getTypes(): Observable<QrCodeType[]> {
    return this.http.get<QrCodeType[]>(`${this.apiUrl}/types`);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadPng(qrCode: QrCodeResponse): void {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCode.pngBase64}`;
    link.download = `qrcode-${qrCode.contentType}-${qrCode.id}.png`;
    link.click();
  }


  downloadSvg(qrCode: QrCodeResponse): void {
    const blob = new Blob([qrCode.svgBase64], { type: 'image/svg+xml' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qrcode-${qrCode.contentType}-${qrCode.id}.svg`;
    link.click();

    URL.revokeObjectURL(url);
  }
}

