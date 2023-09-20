import {render, cleanup} from '@testing-library/react';
import App from '../src/App';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})

test('Тесты вообще работают?', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('В приложении нет пользователей', async () => {
  const app = render(<App/>);
  expect(app.getByText('Пока никого нет(')).toBeTruthy();

  let isError = false;
  try {
    // Не совсем пока разобрался, но падают тесты, если не найден элемент
    app.getByText('Пока ник23ого нет(')
  } catch(e) {
    isError = true;
  }
  expect(isError).toBeTruthy();
});
