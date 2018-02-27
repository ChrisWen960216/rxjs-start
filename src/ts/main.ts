import '../css/normalize.css';
import '../css/index.css';

import { Observable } from 'rxjs';

const $input: HTMLInputElement | null = <HTMLInputElement> document.querySelector('.input-text');
const _input: any = Observable.fromEvent<KeyboardEvent>($input, 'keydown').do((event: KeyboardEvent): void => console.dir(event));
const $app: any = _input;
$app.subscribe();