import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css']
})
export class AirQualityComponent {
  searchTerm!: string;
  searchedData: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.searchTerm) {
      this.http.get(`https://api.openaq.org/v1/latest?country=${this.searchTerm}`)
        .subscribe((response: any) => {
          if (response.results.length > 0) {
            const data = response.results[0];
            this.searchedData = {
              country: data.country,
              airQuality: data.measurements[0].value,
              pollution: data.measurements[0].parameter
            };
            this.errorMessage = '';
          } else {
            this.searchedData = null;
            this.errorMessage = 'Invalid country code. Please enter a valid country code.'; 
          }
        });
    } else {
      this.searchedData = null;
      this.errorMessage = 'Please enter a country code.'; 
    }
  }
}