import { it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import * as useAuthModule from '../../hooks/useAuth';
import * as firebaseModule from '../../firebase';
import { Header } from './index';
import { LanguageProvider } from '../../context/langContext';

beforeEach(cleanup);

it('renders Header component correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  expect(container.innerHTML).toBeTruthy();
});

it('logs out user when Logout button is clicked', async () => {
  const useAuthMock = vi.spyOn(useAuthModule, 'useAuth');
  const logoutMock = vi.spyOn(firebaseModule, 'logout');

  useAuthMock.mockReturnValue({
    isAuth: true,
    email: 'example@mail.com',
    id: '123',
  });

  const { getByLabelText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  fireEvent.click(getByLabelText('Logout'));

  expect(logoutMock).toHaveBeenCalled();
});

it('renders Sign In link correctly when user is not authenticated', () => {
  const useAuthMock = vi.spyOn(useAuthModule, 'useAuth');
  useAuthMock.mockReturnValue({
    isAuth: false,
    email: '',
    id: '',
  });

  const { getByLabelText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  const signInLink = getByLabelText(/Sign In/);

  expect(signInLink).toBeTruthy();
});

it('renders Logout link correctly when user is authenticated', () => {
  const useAuthMock = vi.spyOn(useAuthModule, 'useAuth');
  useAuthMock.mockReturnValue({
    isAuth: true,
    email: 'example@mail.com',
    id: '123',
  });

  const { getByLabelText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </Provider>
    </BrowserRouter>
  );

  const logoutLink = getByLabelText(/Logout/);

  expect(logoutLink).toBeTruthy();
});
