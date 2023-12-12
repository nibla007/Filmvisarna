import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingTicketsForm from "./BookingTicketsForm";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('BookingTicketsForm', () => {
  test('renders the form correctly', () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('re-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bli medlem' })).toBeInTheDocument();
  });

  test('updates input values correctly', () => {
    const setInputValues = jest.fn();
    render(<BookingTicketsForm inputValues={{}} setInputValues={setInputValues} />);

    // Simulate user input
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('re-email-input'), { target: { value: 'test@example.com' } });

    // Assert that the input values are updated correctly
    expect(setInputValues).toHaveBeenCalledWith({ email: 'test@example.com', });
    expect(setInputValues).toHaveBeenCalledWith({ reEmail: 'test@example.com', });
    expect(setInputValues).toHaveBeenCalledWith({ phone: '1234567890', });
  });

  test('navigates to registration page when "Bli medlem" button is clicked', () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);
    fireEvent.click(screen.getByRole('button', { name: /bli medlem/i }));
    waitFor(() => expect(setInputValues).toHaveBeenCalledWith('/registrera'));
  });
});