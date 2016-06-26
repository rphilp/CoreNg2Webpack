import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router';
import { CarTableComponent } from '../components/car-table.ts';
import { CarsData } from '../services/cars.ts';
import { Subscription } from 'rxjs/Rx';

@Component({
	template: `<h2>Car Table</h2>
		<car-table [the-cars]="carList"
			(carView)="carView($event)" (carEdit)="carEdit($event)"></car-table>
		<button (click)="createCar()">Create Car</button>
	`,
	directives: [ CarTableComponent ],
	providers: [ CarsData ]
})
export class CarTableView implements OnInit, OnDestroy {

	carList: Object[];
	sub: Subscription;

	constructor(
		private router: Router,
		private carsData: CarsData
	) { }

	ngOnInit() {
		this.sub = this.carsData.getAll().subscribe(cars => this.carList = cars);
		//this.carsData.getAll().then(cars => this.carList = cars);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	carView(carId: number) {
		console.log('view', carId);
		this.router.navigate(['/car', carId]);
	}

	carEdit(carId: number) {
		console.log('edit', carId);
		this.router.navigate(['/caredit', carId]);
	}

	createCar() {
		this.router.navigate(['/carnew']);
	}

}