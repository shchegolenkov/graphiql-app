import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { LangContext } from '../../context/langContext';
import { RouteLinks } from '../../utils/types';
import Modal from './Modal';

describe('Modal component', () => {
  beforeEach(cleanup);

  it('redirects to Main when the "Start GraphQL`ing!" button is clicked', () => {
    const component = render(
      <BrowserRouter>
        <Provider store={store}>
          <LangContext.Provider
            value={{ language: 'en', switchLanguage: () => {} }}
          >
            <Modal />
          </LangContext.Provider>
        </Provider>
      </BrowserRouter>
    );

    const startButton = component.getByRole('button', {
      name: /Start GraphQL`ing!/,
    });

    fireEvent.click(startButton);

    expect(window.location.pathname).toBe(RouteLinks.Main);
  });
});
