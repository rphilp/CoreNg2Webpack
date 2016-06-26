import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { CarForm } from './car-form.ts';
import { CarsData } from '../services/cars.ts';
import { Subscription } from 'rxjs/Rx';

@Component({
	template: `<h2>Car Form</h2>
		<car-form [car]="car" (save)="saveCar($event)"
			(cancel)="cancelCar()" (delete)="deleteCar($event)"></car-form>
	`,
	directives: [ CarForm ],
	providers: [ CarsData ]
})
export class CarFormView implements OnInit, OnDestroy {

	car: Object = {};
	sub: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private carsData: CarsData
	) { }

	ngOnInit() {

		this.route.params.subscribe(params => {
			if (params['id']) {
				this.sub = this.carsData.get(params['id'])
					.subscribe(car => this.car = car);
			}
		});

	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	saveCar(car) {
		console.dir(car);
		if (car.id) {
			this.carsData.replace(car).subscribe(() => {
				this.router.navigate(['/']);
			});
		} else {
			this.carsData.insert(car).subscribe(() => {
				this.router.navigate(['/']);
			});
		}
	}

	deleteCar(carId) {
		this.carsData.delete(carId).subscribe(() => {
			this.router.navigate(['/']);
		});
	}

	cancelCar() {
		this.router.navigate(['/']);
	}
}