export const createTodoItem: (value: string | number) => Element | null = (value: string | number): Element | null => {
  const result: Element | null = <HTMLElement> document.createElement('LI');
  result.classList.add('list-group-item');
  const innerHTML: string = `${value}
  <button type="button" class="btn btn-default button-remove" aria-label="right Align">
                             删除
                            </button>`;
  result.innerHTML = innerHTML;
  return result;
};