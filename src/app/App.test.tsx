import { describe, it, expect } from 'vitest/dist';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    //Arrange
    render(<App />);
    //Act
    //Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World!');
  });
});
