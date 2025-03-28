import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { error } from 'protractor';

@Component({
    selector: 'app-weather-app',
    templateUrl: './weather_app.component.html',
    styleUrls: ['./weather_app.component.scss']
})
export class WeatherAppComponent {
    city: string = '';
    weatherData: any;

    constructor(private weatherService: WeatherService) {}

    getWeather() {
        if (this.city) {
            this.weatherService.getWeather(this.city).subscribe(
                data => {
                    console.log('API Response:', data);
                    this.weatherData = {
                        name: data.location.name,
                        main: {
                            temp: data.current.temp_c,
                            humidity: data.current.humidity
                        },
                        weather: [{ 
                            description: data.current.condition.text,
                            icon: `https:${data.current.condition.icon}` 
                        }]
                    };
                },
                error => {
                    console.error('Error fetching weather data', error);
                    alert('Không tìm thấy thành phố hoặc có lỗi xảy ra');
                }
            );
        }
    }
}