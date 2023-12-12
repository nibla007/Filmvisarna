import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChooseSeats from "./ChooseSeats";

describe("ChooseSeats component", () => {
  const screening = {
    seats: [
      [{ seat: true, seatNumber: 1 }, { seat: false, seatNumber: 2 }],
      [{ seat: false, seatNumber: 3 }, { seat: true, seatNumber: 4 }],
    ],
  };

  test("renders ChooseSeats component", () => {
    render(<ChooseSeats screening={screening} seats={[]} setSeats={() => { }} />);
    const chooseSeatsElement = screen.getByTestId("choose-seats");
    expect(chooseSeatsElement).toBeInTheDocument();
  });

  test("displays correct number of seats", () => {
    const seats = [
      { row: 1, seat: 1, seatNumber: 1, booked: true },
      { row: 2, seat: 2, seatNumber: 4, booked: true },
    ];
    render(<ChooseSeats screening={screening} seats={seats} setSeats={() => { }} />);
    const seatElements = screen.getAllByTestId("seats");
    expect(seatElements.length).toBe(4);
  });

  test("selects seats on click", () => {
    const setSeatsMock = jest.fn();
    render(<ChooseSeats screening={screening} seats={[]} setSeats={setSeatsMock} />);
    const seatElement = document.getElementById("row1seat-1");
    fireEvent.click(seatElement);
    waitFor(() => expect(setSeatsMock).toHaveBeenCalledWith([{ row: 1, seat: 1, seatNumber: 1, booked: true }]));
  });

  test("displays recommended seats", () => {
    const setSeatsMock = jest.fn();
    render(<ChooseSeats screening={screening} seats={[]} setSeats={setSeatsMock} />);
    waitFor(() => expect(setSeatsMock).toHaveBeenCalled());
  });
});