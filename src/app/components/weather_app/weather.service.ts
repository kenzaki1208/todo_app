import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '957ab29d9edb467193831948252703';
  private apiUrl = 'http://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) { }

  private removeVietnameseDiacritics(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getWeather(city: string): Observable<any> {
    const normalizedCity = this.removeVietnameseDiacritics(city);
    const url = `${this.apiUrl}?q=${city}&key=${this.apiKey}`;
    return this.http.get(url)
  }
}
