import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'car-table',
	template: `<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Make</th>
				<th>Model</th>
				<th>Year</th>
				<th>Color</th>
				<th>Price</th>
			</tr>
		</thead>
		<tbody>
		<tr *ngFor='let car of cars; let carIndex = index'>
			<td>{{carIndex + 1}}</td>
			<td>{{car.make}}</td>
			<td>{{car.model}}</td>
			<td>{{car.year}}</td>
			<td>{{car.color}}</td>
			<td>{{car.price}}</td>
			<td>
				<button type="button" (click)="carViewButton(car.id)">View</button>
				<button type="button" (click)="carEditButton(car.id)">Edit</button>
			</td>
		</tr>
		</tbody>
	</table>`
})
export class CarTableComponent {

	@Input('the-cars')
	cars: Object[];

	@Output()
	carView: EventEmitter<number> = new EventEmitter<number>();

	@Output()
	carEdit: EventEmitter<number> = new EventEmitter<number>();

	carViewButton(carId: number) {
		this.carView.emit(carId);
	}

	carEditButton(carId) {
		this.carEdit.emit(carId);
	}

}


// @Component({
// 	selector: 'paginated-car-table',
// 	template: `<car-table [cars]='paginatedCars'></car-table>
// 		<div><button>Previous></button><button>Previous></button>`
// })
// export class PaginatedCarTable {
//
// 	@Input()
// 	cars
//
// 	get paginatedCars() {
// 		return cars.slice()
// 	}
//
// }