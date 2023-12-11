import { render, fireEvent, screen } from "@testing-library/react";
import TicketCounter from "./TicketCounter";
import renderer from "react-test-renderer";

jest.mock('../../react-easier', () => ({
  useStates: jest.fn(() => ({ adult: 0, child: 0, senior: 0, total: 0 })), // Adjust the mock state as needed
}));



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


