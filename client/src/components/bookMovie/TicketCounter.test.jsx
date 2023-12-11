import { render, fireEvent, screen } from "@testing-library/react";
import TicketCounter from "./TicketCounter";
import renderer from "react-test-renderer";

jest.mock('../../react-easier', () => ({
  useStates: jest.fn(() => ({ adult: 0, child: 1, senior: 2})), // Sets value of the amount of people
}));

  describe('TicketCounter', () => {
    test('renders with initial values', () => {
      const setSeatsMock = jest.fn();
      render(
        <TicketCounter
          screening={{}}
          movie={{}}
          seats={[]}
          setSeats={setSeatsMock}
        />
      );

      // Check if mockdata values are in the document
      expect(screen.getByText('0')).toBeInTheDocument(); // adult
      expect(screen.getByText('1')).toBeInTheDocument(); // child
      expect(screen.getByText('2')).toBeInTheDocument(); // senior
    });

    test("snapshot testing", () => {
      const setSeatsMock = jest.fn();
      const snap = renderer.create(<TicketCounter
          screening={{}}
          movie={{}}
          seats={[]}
          setSeats={setSeatsMock}
        />).toJSON();
      expect(snap).toMatchSnapshot("");
    });
  });

  


