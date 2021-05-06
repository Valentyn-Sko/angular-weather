import { Component } from '@angular/core';
import { WeatherForecastItem } from 'src/app/shared/interfaces';
import { WeatherService } from 'src/app/shared/weather.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent{
  cityWeather: WeatherForecastItem[] = [];
  error = true;

  constructor(private weatherService: WeatherService) {
    this.weatherService.cityWeather.subscribe(cityWeather => {
      this.cityWeather = cityWeather;
      this.error = false;
    });
    this.weatherService.errorEm.subscribe(() => this.error = true);
  }
}


