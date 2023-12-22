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
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => {}} />);
    //Gets the text and puts them into variable...
    let member = screen.getByText("Är du medlem? (valfritt)");
    let forhands = screen.getByText("Förhandsvisningar & medlemskvällar.");
    let rabatt = screen.getByText("Rabatt på dryck och snacks");
    let emailText = screen.getByText("Fyll i mailadress");
    let emailAgaintext = screen.getByText("Bekräfta mailadress");
    let phone = screen.getByText("Mobiltelefon");
    let something = screen.getByLabelText
    
    // Expects text to be the expected text...
    expect(member.textContent).toBe("Är du medlem? (valfritt)");
    expect(forhands.textContent).toBe("Förhandsvisningar & medlemskvällar.");
    expect(rabatt.textContent).toBe("Rabatt på dryck och snacks");
    expect(emailText.textContent).toBe("Fyll i mailadress");
    expect(emailAgaintext.textContent).toBe("Bekräfta mailadress");
    expect(phone.textContent).toBe("Mobiltelefon");
  });
  // takes a screenshot of the site... kinda
  test("Snapshot testing", () => {
    let setInputValues = jest.fn();
    const snap = renderer.create(<BookingTicketsForm inputValues={{}} setInputValues={setInputValues} />).toJSON();
    expect(snap).toMatchSnapshot("");
  });

  test("Testing BookingTicketsForm input", () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => {}} />)
    let emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    let emailAgainInput = screen.getByTestId("email-again");
    fireEvent.change(emailAgainInput, { target: { value: "test@gmail.com" } });
    let phoneInput = screen.getByTestId("phone");
    fireEvent.change(phoneInput, { target: { value: "0703334477" } });

    expect(emailInput.value).toBe("test@gmail.com");
    expect(emailAgainInput.value).toBe("test@gmail.com");
    expect(phoneInput.value).toBe("0703334477");
  });

  test("Clicking the 'Bli medlem' button navigates to '/registrera' and expects the 'Bli medlem' text", () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => {}} />)

    let bliMedlemButton = screen.getByRole('button', { name: 'Bli medlem' });
    
    fireEvent.click(bliMedlemButton);

    let bliMedlemText = screen.getByText("Bli medlem"); 
    expect(mockUsedNavigate).toHaveBeenCalledWith('/registrera');
    expect(bliMedlemText).toBeInTheDocument();
  });
});

  



