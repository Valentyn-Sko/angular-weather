import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherForecastItem } from './interfaces';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class WeatherService {
    city = '';
    cityWeather: EventEmitter<WeatherForecastItem[]> = new EventEmitter();
    errorEm: EventEmitter<string> = new EventEmitter();
    httpOptions = {
        headers: new HttpHeaders({
            'x-rapidapi-key': 'aaa8d726damshba1d9d56be382aep15ea94jsn1d450faf28f6',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        })
    };

    constructor(private http: HttpClient) { }

    getWeatherForCity(city: string): void {
        this.city = city;
        this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${environment.API_key}&units=metric`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return response.list.map((weather: { dt_txt: string, main: { temp: string } }) => {
                        return { name: weather.dt_txt.slice(0, 16), value: weather.main.temp };
                    });
                }
                )).subscribe(resp => {
                    this.cityWeather.emit(resp);
                },
                    (err: HttpErrorResponse) => {
                        this.errorEm.emit(err.error.message);
                    }
                );
    }
}
