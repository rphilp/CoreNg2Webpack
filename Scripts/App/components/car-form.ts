import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'car-form',
	template: `<form>
			<div>Make: <input type="text" [(ngModel)]="car.make" name="carMake"></div>
			<div>Model: <input type="text" [(ngModel)]="car.model" name="carModel"></div>
			<div>Year: <input type="text" [(ngModel)]="car.year" name="carYear"></div>
			<div>Color: <input type="text" [(ngModel)]="car.color" name="carColor"></div>
			<div>Price: <input type="text" [(ngModel)]="car.price" name="carPrice"></div>
			<button type="button" (click)="saveCarButton(car)">Save</button>
			<button type="button" (click)="cancelCarButton()">Cancel</button>
			<button type="button" (click)="deleteCarButton(car.id)" *ngIf="!!car.id">Delete</button>
		</form>`

})
export class CarForm {

	@Input()
	car: Object = {};

	@Output('save')
	saveCar: EventEmitter<Object> = new EventEmitter<Object>();

	@Output('cancel')
	cancelCar: EventEmitter<void> = new EventEmitter<void>();

	@Output('delete')
	deleteCar: EventEmitter<number> = new EventEmitter<number>();

	saveCarButton(car) {
		this.saveCar.emit(car);
	}

	cancelCarButton() {
		this.cancelCar.emit(null);
	}

	deleteCarButton(carId) {
		if (confirm('Are you sure?')) {
			this.deleteCar.emit(carId);
		}
	}
}