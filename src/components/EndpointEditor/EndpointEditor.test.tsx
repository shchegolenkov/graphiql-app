import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../store/store';
import { LanguageProvider } from '../../context/langContext';

import { EndpointEditor } from './index';

describe('EndpointEditor', () => {
  it('renders without errors', () => {
    // Arrange
    const component = render(
      <Provider store={store}>
        <LanguageProvider>
          <EndpointEditor />
        </LanguageProvider>
      </Provider>
    );

    // Assert
    expect(component).not.toBe(null);
  });
});
