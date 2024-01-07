import { it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { RouteLinks } from '../../utils/types';
import { LanguageProvider } from '../../context/langContext';
import { SignIn } from './Signin';

beforeEach(cleanup);

it('renders SignIn component correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <SignIn />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  expect(container.innerHTML).toBeTruthy();
});

it('submits form with valid data and redirects to Main', async () => {
  const { getByLabelText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <SignIn />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  const inputEmail = getByLabelText('Email').querySelector('input');
  const inputPassword = getByLabelText('Password').querySelector('input');

  if (inputEmail) {
    fireEvent.change(inputEmail, {
      target: { value: 'be@tester.ru' },
    });
  }

  if (inputPassword) {
    fireEvent.change(inputPassword!, {
      target: { value: 'Qwert12!' },
    });
  }

  fireEvent.submit(getByLabelText('Sign in'));

  vi.waitFor(() => {
    expect(window.location.pathname).toBe(RouteLinks.Main);
  });
});
