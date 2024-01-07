import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { Main } from './Main';
import { defaultHeaders } from '../../utils/utils';
import { LangContext } from '../../context/langContext';

describe('Main', () => {
  it('renders without errors', () => {
    // Arrange
    const component = render(
      <Provider store={store}>
        <LangContext.Provider
          value={{ language: 'en', switchLanguage: () => {} }}
        >
          <Main />
        </LangContext.Provider>
      </Provider>
    );

    // Assert
    expect(component).not.toBe(null);
  });

  it('handles the "Run" button click changes the output textarea', async () => {
    // Arrange
    const component = render(
      <Provider store={store}>
        <LangContext.Provider
          value={{ language: 'en', switchLanguage: () => {} }}
        >
          <Main />
        </LangContext.Provider>
      </Provider>
    );

    const headersTextarea = component.container.querySelector(
      'textarea[name="headers"]'
    )!;
    const runButton = component.getByRole('button', { name: 'Run' });

    // Act
    act(() => {
      fireEvent.click(runButton);
    });

    // Assert
    expect(headersTextarea).not.toEqual(
      JSON.stringify(defaultHeaders, null, 2)
    );
  });

  it('opens the EndpointEditor modal when "Edit" button is clicked', async () => {
    // Arrange
    const component = render(
      <Provider store={store}>
        <LangContext.Provider
          value={{ language: 'en', switchLanguage: () => {} }}
        >
          <Main />
        </LangContext.Provider>
      </Provider>
    );

    const editButton = component.getByAltText('Edit');

    // Act
    act(() => {
      fireEvent.click(editButton);
    });

    // Assert
    const endpointEditorModal = component.getByLabelText('Change endpoint');
    expect(endpointEditorModal).toBeTruthy();
  });
});
