import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { CarDetails } from '../components/car-details.ts';
import { CarsData } from '../services/cars.ts';
import { Subscription } from 'rxjs/Rx';

@Component({
	template: `<h2>Car Details</h2>
		<car-details [car]="car"></car-details>
		<button type="button" (click)="returnToList()">Return to List</button>`,
	directives: [ CarDetails ],
	providers: [ CarsData ]
})
export class CarReadOnlyView implements OnInit, OnDestroy {

	car: Object;
	sub: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private carsData: CarsData
	) { }

	ngOnInit() {

		this.route.params.subscribe(params => {
			this.sub = this.carsData.get(params['id'])
				.subscribe(car => this.car = car);
		});

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	returnToList() {
		this.router.navigate(['/']);
	}
}