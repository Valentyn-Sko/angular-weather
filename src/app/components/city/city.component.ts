import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/shared/weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent{
  form: FormGroup;
  errors = '';


  constructor(private weatherService: WeatherService) {

    this.form = new FormGroup({
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });

    this.weatherService.errorEm.subscribe(err => {
      this.errors = err;
    });
  }

  findCity(): void {
    if (this.form.valid) {
      this.errors = '';
      const formData = { ...this.form.value };
      this.weatherService.getWeatherForCity(formData.city);
    }
  }
}
