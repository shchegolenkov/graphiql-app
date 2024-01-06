import { it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { RouteLinks } from '../../utils/types';
import { SignUp } from './Signup';

beforeEach(cleanup);

it('renders SignUp component correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </BrowserRouter>
  );

  expect(container.innerHTML).toBeTruthy();
});

it('submits form with valid data and redirects to Main', async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </BrowserRouter>
  );

  fireEvent.input(getByLabelText('Email'), {
    target: { value: 'example@mail.com' },
  });
  fireEvent.input(getByLabelText('Password'), {
    target: { value: 'Qwert12!' },
  });
  fireEvent.input(getByLabelText('Confirm Password'), {
    target: { value: 'Qwert12!' },
  });

  fireEvent.submit(getByText('Sign up'));

  vi.waitFor(() => {
    expect(window.location.pathname).toBe(RouteLinks.Main);
  });
});

it('shows error message when passwords do not match', async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </BrowserRouter>
  );

  fireEvent.input(getByLabelText('Email'), {
    target: { value: 'example@mail.com' },
  });
  fireEvent.input(getByLabelText('Password'), {
    target: { value: 'Qwert12!' },
  });
  fireEvent.input(getByLabelText('Confirm Password'), {
    target: { value: 'Qwert123!' },
  });

  vi.waitFor(() => {
    expect(getByText(/Passwords do not match/g)).toBeTruthy();
  });
});
