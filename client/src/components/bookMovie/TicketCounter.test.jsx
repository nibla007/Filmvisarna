// import { render, fireEvent, screen } from "@testing-library/react";
// import TicketCounter from "./TicketCounter";
// import renderer from "react-test-renderer";

// jest.mock('../../react-easier', () => ({
//   useStates: jest.fn(() => ({ adult: 0, child: 1, senior: 2})), // Sets value of the amount of people (mockdata)
// }));

//   describe('TicketCounter', () => {
//     test('renders with initial values', () => {
//       const setSeatsMock = jest.fn();
//       render(
//         <TicketCounter
//           screening={{}}
//           movie={{}}
//           seats={[]}
//           setSeats={setSeatsMock}
//         />
//       );
//       // get mockdata text
//       let adult = screen.getByText('0');
//       let child = screen.getByText('1');
//       let senior = screen.getByText('2');

//       // Check if mockdata values are in the document
//       expect(adult).toBeInTheDocument(); 
//       expect(child).toBeInTheDocument(); 
//       expect(senior).toBeInTheDocument();
//     });

//     test("snapshot testing", () => {
//       const setSeatsMock = jest.fn();
//       const snap = renderer.create(<TicketCounter
//           screening={{}}
//           movie={{}}
//           seats={[]}
//           setSeats={setSeatsMock}
//         />).toJSON();
//       expect(snap).toMatchSnapshot("");
//     });
//   });

  


