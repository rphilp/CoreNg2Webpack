import { RouterConfig, provideRouter } from '@angular/router';

import { CarTableView } from './components/car-table-view.ts';
import { CarReadOnlyView } from './components/car-read-only-view.ts';
import { CarFormView } from './components/car-form-view.ts';

const routes: RouterConfig = [
	{ path: '', component: CarTableView },
	{ path: 'car/:id', component: CarReadOnlyView },
	{ path: 'caredit/:id', component: CarFormView },
	{ path: 'carnew', component: CarFormView }
];

export const APP_ROUTER_PROVIDER = [
	provideRouter(routes)
];