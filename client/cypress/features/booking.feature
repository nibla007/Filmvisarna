Feature: Booking

  Background: Ticket page
    Given I am on the ticket page


  Scenario: Ticket Counter
    When I click on the + buttons
    Then the counter should have increased by one

  Scenario: Login Choose seats book a movie and log out
    Given that I am logged in
    When I have clicked on a place to sit
    When I click on '[data-cy="continue"]'
    When I click on '[data-cy="book-movie"]'
    When I have seen '[data-cy="thank-you"]'
    When I have canceled the booking
    When I have logged out
    Then I should see 'Just nu på bio'

