# Test Design: Booking search by guest name

**Requirement (verbatim):** As a hotel manager, I can search bookings by guest first name and last name, so I can find a guest's reservation.
**Restated:** GET /booking with firstname/lastname filters returns the booking IDs of matching guests.
**Date:** 2026-07-07 · **Status:** APPROVED (demo)

## Open questions

- Is matching case-sensitive? Requirement silent; restful-booker matches exactly. Not blocking — SEARCH-04 parked as manual until answered.
- Is partial-name matching expected? Assumed no (exact match). Not blocking.

## Scenarios

### SEARCH-01 · existing guest found by full name · P1 · API · @smoke

- **Given** a booking exists for a guest with a unique first and last name
- **When** bookings are searched with that exact firstname and lastname
- **Then** the result list contains that booking's ID
- **Automate:** yes · **Needs:** new client method `searchByName` (reuses existing `BookingIdListSchema`)

### SEARCH-02 · no match returns empty list · P2 · API · @regression

- **Given** no booking exists for a random, never-used guest name
- **When** bookings are searched with that name
- **Then** the result is an empty list (not an error)
- **Automate:** yes · **Needs:** nothing new beyond SEARCH-01

### SEARCH-03 · first-name-only filter · P2 · API · @regression

- **Given** a booking exists for a guest
- **When** bookings are searched by firstname only
- **Then** the result list contains that booking's ID
- **Automate:** yes · **Needs:** nothing new

### SEARCH-04 · case-insensitive match · P3 · API · —

- **Given** a booking for "Anna Smith"
- **When** searched as "anna smith"
- **Then** behavior TBD (open question above)
- **Automate:** no — manual until product answers the open question

## Coverage summary

| ID        | Priority | Layer | Tag         | Automate                          |
| --------- | -------- | ----- | ----------- | --------------------------------- |
| SEARCH-01 | P1       | API   | @smoke      | yes                               |
| SEARCH-02 | P2       | API   | @regression | yes                               |
| SEARCH-03 | P2       | API   | @regression | yes                               |
| SEARCH-04 | P3       | API   | —           | manual (blocked on open question) |

## Traceability

Implemented specs must include `// covers: SEARCH-NN`.
