# Backend-Frontend Connection Guide

This document explains how the `Banco-Universitario-LabII-EquipoIV` frontend connects to the backend in the main dashboard features:
- Contacts
- Transfers
- Movements
- Authentication

---

## 1. Axios and base API URL

The frontend uses a shared Axios instance in `src/services/api.js`:

- `baseURL` is set from `import.meta.env.VITE_API_URL`
- Every request includes `Content-Type: application/json`
- A request interceptor adds the JWT token automatically from localStorage:
  - `bu_token`
  - `auth_token`

This means every request sent by service modules uses the same backend base address and auth header.

```js
const API_URL = import.meta.env.VITE_API_URL || ''
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })
```

---

## 2. Authentication flow

### Service: `src/services/authService.js`

- Login: `POST /v1/public/client/user/login`
- Register: `POST /v1/public/client/user/register`
- Update profile: `PUT /v1/client/user/profile`
- Change password: `PATCH /v1/client/user/password`
- Logout: remove auth data from localStorage

When login succeeds, the service stores:
- `auth_token`
- `bu_token`
- `user_data`
- `bu_user`

The token is later attached by the Axios interceptor in `api.js`.

### Route guard: `src/router/index.js`

The router checks the token before entering `/dashboard` routes:

- if a route requires auth and no token exists, it redirects to `/`

So all dashboard views rely on login state stored in localStorage.

---

## 3. Contacts

### Service: `src/services/contactService.js`

Contacts are handled through these backend endpoints:

- `GET /v1/client/contact` → load all contacts
- `GET /v1/client/contact/:id` → load one contact
- `POST /v1/client/contact` → create a new contact
- `PATCH /v1/client/contact/:id` → update a contact
- `DELETE /v1/client/contact/:id` → remove a contact

The frontend does this in `src/views/dashboard/Contacts.vue`.

### Component flow

1. `onMounted()` calls `loadContacts()`.
2. `loadContacts()` calls `contactService.getContacts()`.
3. The response is normalized and stored in `contacts.value`.
4. The UI renders `filteredContacts` from `contacts.value`.

### Create / update / delete

- `saveContact()` uses `contactService.createContact()` or `contactService.updateContact()`.
- `deleteContact()` calls `contactService.deleteContact()`.
- After any change, `loadContacts()` is called again to refresh the data.

### Transfer from contact

The contact screen also has a quick transfer shortcut:

- `transferToContact(contact)` pushes the user to `/dashboard/transfers` with query params:
  - `account`
  - `alias`

This auto-fills the transfer form on the Transfers screen.

---

## 4. Transfers

### Service: `src/services/transferService.js`

The frontend uses one endpoint for transfers:

- `POST /v1/client/movement`

This creates a movement in the backend that represents a transfer.

### Component flow

In `src/views/dashboard/Transfers.vue`:

1. The form collects:
   - destination account
   - amount
   - description
2. `handleTransfer()` validates the input.
3. On submit, it calls `transferService.createTransfer(transferForm.value)`.
4. The backend receives the payload with:
   - `account_number`
   - `amount`
   - `description`
5. After success, the UI shows a receipt modal and resets the form.

### Prefill from Contacts

If the user arrives from Contacts, the transfer view reads `route.query.account` and fills the destination input automatically.

---

## 5. Movements

### Service: `src/services/movementService.js`

Movements are loaded via:

- `GET /v1/client/movement`

This service sends query params for pagination:
- `page`
- `page_size`
- `multiplier` (optional, for incoming/outgoing filter)

It also reads pagination headers from the backend response:
- `X-pagination-total-count`
- `X-pagination-page-count`
- `X-pagination-current-page`
- `X-pagination-page-size`

The service returns:
- `data`: array of movements
- `pagination`: page metadata

### Component flow

In `src/views/dashboard/Movements.vue`:

1. The component loads the current page and page size.
2. It calls `movementService.getMovements(currentPage, pageSize, multiplier)`.
3. It stores the current page of movements in `allMovements.value`.
4. Pagination controls read the server total count and page count.
5. When the user changes page or page size, the component reloads the backend page.

This is the correct way to handle large user histories, because the frontend only loads one page at a time.

---

## 6. Shared behavior across features

### Token and auth header automatically applied

Because `api.js` injects the token in every request, all services work with authenticated backend endpoints.

### User info from localStorage

Many components use `authService.getCurrentUser()` to read the current user's account number or name.

### Error handling

Each feature catches backend errors and shows user-friendly messages.

### Reuse of services

- `contactService` handles all contact CRUD
- `transferService` handles transfer creation
- `movementService` handles movement listing and pagination
- `authService` handles login/register/profile/logout

---

## 7. Summary of connection points

| Feature | Frontend file | Backend endpoint | Notes |
|---|---|---|---|
| Auth login | `src/services/authService.js` | `POST /v1/public/client/user/login` | stores JWT in localStorage |
| Contacts list | `src/views/dashboard/Contacts.vue` | `GET /v1/client/contact` | loads contacts when mounted |
| Contact create | `src/services/contactService.js` | `POST /v1/client/contact` | sends alias, account_number, description |
| Contact update | `src/services/contactService.js` | `PATCH /v1/client/contact/:id` | updates alias/description |
| Contact delete | `src/services/contactService.js` | `DELETE /v1/client/contact/:id` | removes contact |
| Transfer | `src/views/dashboard/Transfers.vue` | `POST /v1/client/movement` | backend records it as movement |
| Movements list | `src/services/movementService.js` | `GET /v1/client/movement` | supports paging and filters |

---

## 8. Useful files

- `src/services/api.js` → common Axios client + auth header
- `src/services/authService.js` → login/register/logout + profile
- `src/services/contactService.js` → contact backend calls
- `src/services/transferService.js` → transfer backend call
- `src/services/movementService.js` → movements listing and pagination
- `src/views/dashboard/Contacts.vue` → contacts UI and CRUD flow
- `src/views/dashboard/Transfers.vue` → transfer UI and request flow
- `src/views/dashboard/Movements.vue` → movements UI, filters and pagination

---

## 9. How to read this in the code

If you want to follow the connection step-by-step:
1. Start at the view file (`Contacts.vue`, `Transfers.vue`, `Movements.vue`).
2. Find the service call like `contactService.getContacts()` or `transferService.createTransfer()`.
3. Open the corresponding service file.
4. Check the API endpoint string and payload.
5. Inspect `src/services/api.js` to confirm the base URL and authorization behavior.

That is the main path from UI to backend.
