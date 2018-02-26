/** Created By ChrisWen
 *  Observe Mode.
 */
import Observer from './listener';

const observeBtn = document.getElementById('observe-btn');
const observeDesc = document.getElementById('observe-desc');
const observe = new Observer();

// DOM event
// observeBtn.addEventListener('click', () => {
//   console.log('click');
// }, false);

// Custom event
// observeBtn.addEventListener('click', () => {
//   observe.trigger('click', 'Hello World');
//   observe.listen('click', (data) => {
//     observeDesc.innerHTML = data;
//     alert(data);
//   });
// }, false);
observeBtn.addEventListener('click', () => {
  observeDesc.innerHTML = 'haha';
}, false);
observeBtn.addEventListener('click', () => {
  alert('haha');
}, false);
// observeBtn.addEventListener('click', () => {
//   observe.listen('click', (data) => {
//     alert(data);
//   });
// }, false);
