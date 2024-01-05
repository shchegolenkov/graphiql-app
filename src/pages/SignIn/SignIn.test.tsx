import { it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { RouteLinks } from '../../utils/types';
import { SignIn } from './Signin';

beforeEach(cleanup);

it('renders SignIn component correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SignIn />
      </Provider>
    </BrowserRouter>
  );

  expect(container.innerHTML).toBeTruthy();
});

it('submits form with valid data and redirects to Main', async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SignIn />
      </Provider>
    </BrowserRouter>
  );

  fireEvent.input(getByLabelText('Email'), {
    target: { value: 'be@tester.ru' },
  });
  fireEvent.input(getByLabelText('Password'), {
    target: { value: 'Qwert12!' },
  });

  fireEvent.submit(getByText('Sign in'));

  vi.waitFor(() => {
    expect(window.location.pathname).toBe(RouteLinks.Main);
  });
});
