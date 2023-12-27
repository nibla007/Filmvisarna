import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmBooking from './ConfirmBooking';

global.scrollTo = jest.fn();

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ConfirmBooking component', () => {
  const mockBookingResult = {
    bookingId: '123456',
    ticketType: {
      adult: 2,
      child: 1,
      senior: 0,
    },
    rows: [{ row: 1 }, { row: 2 }],
    seats: [{ seatNumber: 3 }, { seatNumber: 4 }],
    customerEmail: 'test@example.com',
    price: 150,
  };

  const mockMovie = {
    title: 'Test Movie',
    img_poster: 'test-poster.jpg',
    genre: 'Action',
    ageRestriction: 16,
  };

  const mockScreening = {
    theaterName: 'Test Theater',
    date: '2023-12-07T12:00:00',
  };

  it('renders ConfirmBooking component with booking information', () => {
    render(
      <ConfirmBooking
        bookingResult={mockBookingResult}
        movie={mockMovie}
        screening={mockScreening}
      />
    );
    
    expect(screen.getByText('Tack för din bokning!')).toBeInTheDocument();
    expect(screen.getByText('Film:')).toBeInTheDocument();
    expect(screen.getByText('Epost:')).toBeInTheDocument();
    expect(screen.getByText('Rad:')).toBeInTheDocument();
    expect(screen.getByText('Plats:')).toBeInTheDocument();
    expect(screen.getByText('Datum:')).toBeInTheDocument();
    expect(screen.getByText('Salong:')).toBeInTheDocument();
    expect(screen.getByText('Pris:')).toBeInTheDocument();
    expect(screen.getByText('Bokningsnummer:')).toBeInTheDocument();
    expect(screen.getByText('En bokningsbekräftelse har nu skickats till din email!')).toBeInTheDocument();
  });

  it('calls navigate function when the "Hem" button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <ConfirmBooking
        bookingResult={mockBookingResult}
        movie={mockMovie}
        screening={mockScreening}
      />
    );

    fireEvent.click(screen.getByText('Hem'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
