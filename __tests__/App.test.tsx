import {render, cleanup} from '@testing-library/react';
import App from '../src/App';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})

test('Тесты вообще работают?', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('Приложение отрисовывается', () => {
  render(<App/>);
});

test('В приложении нет пользователей', () => {
  const app = render(<App/>);
  app.findByText('Пока никого нет(');
});
