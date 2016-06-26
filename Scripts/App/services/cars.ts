import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CarsData {

	options: RequestOptions = new RequestOptions({ headers: new Headers({
		"Content-Type": "application/json"
	})});

	constructor(private http: Http) { }

	getAll(): Observable<Object[]> {
		return this.http.get('/api/cars').map(res => res.json());
		// return this.http.get('/api/cars').map(res => {
		// 	return res.json()
		// });
		// return this.http.get('/api/cars').map(function(res) {
		// 	return res.json()
		// });
	}

	// getAll(): Promise<Object[]> {
	// 	return this.http.get('/api/cars').toPromise().then(res => res.json());
	// }

	get(carId: number): Observable<Object> {
		return this.http.get('/api/cars/' + encodeURIComponent(carId.toString()))
			.map(res => res.json());
	}

	insert(car: Object): Observable<Object> {
		return this.http.post('/api/cars', JSON.stringify(car), this.options)
			.map(res => res.json());
	}

	replace(car: any): Observable<Object> {
		return this.http.put('/api/cars/' + encodeURIComponent(car.id.toString()),
			JSON.stringify(car), this.options).map(res => res.json());
	}

	delete(carId: number): Observable<Object> {
		return this.http.delete('/api/cars/' + encodeURIComponent(carId.toString()))
			.map(res => res.json());
	}

}