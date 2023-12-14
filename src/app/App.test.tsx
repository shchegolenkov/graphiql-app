import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    //Arrange
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    //Act
    //Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Welcome');
  });
});
