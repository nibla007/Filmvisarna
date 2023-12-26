import { render, fireEvent, screen, getByText } from "@testing-library/react";
import CancelBooking from "./CancelBooking"


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
// Had to mock the window alert...
/*if(resp.message === "Din bokning är nu avbokad!") {
            window.location.reload();
        } else {
            alert("Något gick fel")
        }*/
window.alert = jest.fn();

describe('CancelBooking', () => {
  test('Checking text-content when canceling a show', () => {
    const setToggleMock = jest.fn();
    // Fake bookingInfo
    const bookingData = {
      movie: {
        title: 'Terminator 3',
        img_poster: 'sample-poster.jpg',
      },
      screening: {
        date: 'Torsdag 14:e december',
        time: 'Klockan 17:00',
        theaterName: 'Mini Salongen',
      },
      rows: [
        {row: "1"}
      ],
      seats: [
        { seatNumber: "1" },
        { seatNumber: "2" },
      ],
      bookingId: 'ABC123',
      price: 999,
      status: true,
      _id: 'some-unique-id',
    };

    render(<CancelBooking booking={bookingData} setToggle={setToggleMock} />);
    let titles = screen.getAllByText('Terminator 3');
    let youSureCancel = screen.getByText('Är du säker på att du vill avboka?');
    let date = screen.getByText('Torsdag 14:e december');
    let time = screen.getByText('Klockan 17:00');
    let bookNum = screen.getByText('ABC123');
    let saloon = screen.getByText('Mini Salongen');
    let row = screen.getByText(1);
    let seatNumber = screen.getByText('1');
    let goBack = screen.getByText('Tillbaka');
    let cancel = screen.getByText('Avboka');

    let price = screen.getByTestId('booking-price');
    let realPrice = screen.getByTestId('real-price');
    let status = screen.getByTestId('status');
    let realStatus = screen.getByTestId('real-status');

    expect(youSureCancel.textContent).toBe('Är du säker på att du vill avboka?');
    expect(titles.length).toBeGreaterThan(1);
    expect(date.textContent).toBe('Torsdag 14:e december');
    expect(time.textContent).toBe('Klockan 17:00');
    expect(bookNum.textContent).toBe('ABC123');
    expect(saloon.textContent).toBe('Mini Salongen');
    expect(row.textContent).toBe("1");
    expect(seatNumber.textContent).toBe('1');
    expect(status.textContent).toBe('Status:');
    expect(status).toBeInTheDocument();
    expect(price.textContent).toBe("Pris:");
    expect(realPrice.textContent).toBe("999 kr");
    expect(realStatus.textContent).toBe('Bokad');
    expect(goBack.textContent).toBe('Tillbaka');
    expect(cancel.textContent).toBe('Avboka');
  });
});
