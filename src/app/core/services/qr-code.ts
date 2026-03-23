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

  // Télécharge l'image PNG via son URL
  downloadPng(qrCode: QrCodeResponse): void {
    this.downloadFile(qrCode.pngUrl, `qrcode-${qrCode.contentType}-${qrCode.id}.png`);
  }

  // Télécharge l'image SVG via son URL
  downloadSvg(qrCode: QrCodeResponse): void {
    this.downloadFile(qrCode.svgUrl, `qrcode-${qrCode.contentType}-${qrCode.id}.svg`);
  }

  // Récupère le fichier distant et déclenche le téléchargement
  private downloadFile(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(blobUrl);
    });
  }
}

