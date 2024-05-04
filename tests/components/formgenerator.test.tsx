import React from 'react';
import { fireEvent, render, screen  } from '@testing-library/react';
import BasicFormGeneration from '../mocks/BasicFormGeneration';
import userEvent from '@testing-library/user-event'; // To simulate user interactions
import ConditionalFormGeneration from '../mocks/ConditionalFormGeneration';


describe('BasicFormGeneration', () => {
  const promise = Promise.resolve();
  const mockSubmit = jest.fn(() => promise);
  beforeEach(() => {
    render(<BasicFormGeneration onSubmit={mockSubmit} />);
  });

  it('should render inputs', () => {

    // Check form inputs are present
    expect(screen.getByTestId('username-input')).toBeTruthy();
    expect(screen.getByTestId('email-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
  });

  it('should handle user input', () => {
    // Check form inputs are present
    const usernameInput = screen.getByTestId<HTMLInputElement>('username-input');
    const emailInput = screen.getByTestId<HTMLInputElement>('email-input');
    const passwordInput = screen.getByTestId<HTMLInputElement>('password-input');
    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } }); 
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    // Check that the internal state has been updated with the input values
    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@email.com');
    expect(passwordInput.value).toBe('mypassword');    
  });

  it('should render a submit button', () => {
    // Check submit button is present
    expect(screen.getByTestId('submit-button')).toBeTruthy();
  });

  it('should submit the form', async () => {

    // Check form inputs are present
    const usernameInput = screen.getByTestId<HTMLInputElement>('username-input');
    const emailInput = screen.getByTestId<HTMLInputElement>('email-input');
    const passwordInput = screen.getByTestId<HTMLInputElement>('password-input');
    const form = screen.getByTestId('user-form');
    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } }); 
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    
    fireEvent.submit(form);

    // Check that the form has been submitted
    expect(mockSubmit).toHaveBeenCalled();

  });

});

describe('ConditionalFormGeneration', () => {
  const promise = Promise.resolve();
  const mockSubmit = jest.fn(() => promise);
  beforeEach(() => {
    render(<ConditionalFormGeneration onSubmit={mockSubmit} />);
  });
  
  it('should dynamically render and remove new-input', () => {
    // Check form inputs are present
    const toggleInput = screen.getByTestId<HTMLInputElement>('toggle-input');
    // Simulate user input
    fireEvent.click(toggleInput)
    
    setTimeout(() => {
      const newInput = screen.getByTestId<HTMLInputElement>('new-input');

      expect(screen.getByTestId('new-input')).toBeTruthy();
      fireEvent.change(newInput, { target: { value: 'new value' } });

      expect(newInput).toBeTruthy();
      expect(newInput.value).toBe('new value');
  
      fireEvent.click(toggleInput);
  
      expect(newInput).toBeFalsy();
    }, 1000);

  });
});