import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import App from './App';

describe('App', () => {
  it('Renders Welcome link and Translate button', () => {
    //Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    //Act
    //Expect
    expect(
      screen.getByRole('link', {
        name: /Welcome/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /Translate/i,
      })
    ).toBeInTheDocument();
  });
});
