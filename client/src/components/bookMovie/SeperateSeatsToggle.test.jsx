import { render, fireEvent } from "@testing-library/react";
import SeperateSeatsToggle from "./SeperateSeatsToggle";

describe('SeperateSeatsToggle', () => {
  test('Seperate seats toggle works', () => {
    const setSeatsMock = jest.fn();

    const { getByLabelText } = render(
      <SeperateSeatsToggle setSeats={setSeatsMock} />
    );

    // You can click on the checkbox by getting the label text
    const checkbox = getByLabelText("Välj separata platser");

    //console.log("checkbox boolean value before click: " + checkbox.checked);
    
    // Click on the checkbox
    fireEvent.click(checkbox);

    //console.log("checkbox boolean value after click: " + checkbox.checked);

    // Expects the seats to be empty after the handleChecked function is called
    expect(setSeatsMock).toHaveBeenCalledWith([]);
    // Expects checkbox to be true
    expect(checkbox.checked).toBe(true);
  });
});
