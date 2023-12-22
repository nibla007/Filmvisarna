import { render, fireEvent, screen } from "@testing-library/react";
import BookingTicketsForm from "./BookingTicketsForm";
import renderer from "react-test-renderer";

global.scrollTo = jest.fn();

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe("BookingTicketsForm", () => {

  test("Getting text values", () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);
    // Expects labels to exist
    expect(screen.getByText("Är du medlem? (valfritt)")).toBeInTheDocument();
    expect(screen.getByText("Förhandsvisningar & medlemskvällar.")).toBeInTheDocument();
    expect(screen.getByText("Rabatt på dryck och snacks")).toBeInTheDocument();
    expect(screen.getByText("Fyll i mailadress")).toBeInTheDocument();
    expect(screen.getByText("Bekräfta mailadress")).toBeInTheDocument();
    expect(screen.getByText("Mobiltelefon")).toBeInTheDocument();
  });

  // takes a screenshot of the site... kinda
  test("Snapshot testing", () => {
    let setInputValues = jest.fn();
    const snap = renderer.create(<BookingTicketsForm inputValues={{}} setInputValues={setInputValues} />).toJSON();
    expect(snap).toMatchSnapshot("");
  });

  test('Updates input values correctly', () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={mockUsedNavigate} />);

    // Simulate user input
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('re-email-input'), { target: { value: 'test@example.com' } });

    // Assert that the input values are updated correctly
    expect(mockUsedNavigate).toHaveBeenCalledWith({ email: 'test@example.com', });
    expect(mockUsedNavigate).toHaveBeenCalledWith({ reEmail: 'test@example.com', });
    expect(mockUsedNavigate).toHaveBeenCalledWith({ phone: '1234567890', });
  });

  test('Navigates to registration page when "Bli medlem" button is clicked', () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Bli medlem' }));
    expect(mockUsedNavigate).toHaveBeenLastCalledWith('/registrera');
    expect(screen.getByText("Bli en del av familjen!")).toBeInTheDocument();
  });
});