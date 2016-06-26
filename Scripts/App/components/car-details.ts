import { Component, Input } from '@angular/core'

@Component({
	selector: 'car-details',
	template: `<div>
			<div>Make: {{car?.make}}</div>
			<div>Model: {{car?.model}}</div>
			<div>Year: {{car?.year}}</div>
			<div>Color: {{car?.color}}</div>
			<div>Price: {{car?.price}}</div>
		</div>`

})
export class CarDetails {

	@Input()
	car: Object;

}