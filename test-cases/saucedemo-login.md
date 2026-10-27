# Sauce Demo – Login Test Cases

**URL:** https://www.saucedemo.com/

## Requirements
- R1: A user with valid credentials can log in and land on the products page.
- R2: Invalid credentials show an error and keep the user on the login page.
- R3: Username and password are required.
- R4: A locked-out user cannot log in.

## Open questions
- Is the error message text part of the contract, or just "an error is shown"?

---

### TC-LOGIN-001: Valid user logs in
- **Priority:** High
- **Type:** Positive
- **Preconditions:** User is on the login page.
- **Test data:** `standard_user` / `secret_sauce`
- **Steps:**
  1. Enter the username.
  2. Enter the password.
  3. Click Login.
- **Expected result:** URL contains `inventory.html`; "Products" title is visible; 6 products are listed.
- **Automate?:** Yes (already in `tests/saucedemo-login.spec.ts`)

### TC-LOGIN-002: Wrong password shows an error
- **Priority:** High
- **Type:** Negative
- **Preconditions:** User is on the login page.
- **Test data:** `standard_user` / `wrong_password`
- **Steps:**
  1. Enter the username.
  2. Enter the wrong password.
  3. Click Login.
- **Expected result:** User stays on the login page; error contains "Username and password do not match".
- **Automate?:** Yes (already in `tests/saucedemo-login.spec.ts`)

### TC-LOGIN-003: Empty username
- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** User is on the login page.
- **Test data:** username empty / `secret_sauce`
- **Steps:**
  1. Leave username empty.
  2. Enter the password.
  3. Click Login.
- **Expected result:** Error "Username is required"; user stays on the login page.
- **Automate?:** Yes

### TC-LOGIN-004: Empty password
- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** User is on the login page.
- **Test data:** `standard_user` / password empty
- **Steps:**
  1. Enter the username.
  2. Leave password empty.
  3. Click Login.
- **Expected result:** Error "Password is required"; user stays on the login page.
- **Automate?:** Yes

### TC-LOGIN-005: Locked-out user cannot log in
- **Priority:** High
- **Type:** Negative
- **Preconditions:** User is on the login page.
- **Test data:** `locked_out_user` / `secret_sauce`
- **Steps:**
  1. Enter the username.
  2. Enter the password.
  3. Click Login.
- **Expected result:** Error "Sorry, this user has been locked out."; user stays on the login page.
- **Automate?:** Yes

---

## Coverage

| Requirement | Test cases |
|---|---|
| R1 | TC-LOGIN-001 |
| R2 | TC-LOGIN-002 |
| R3 | TC-LOGIN-003, TC-LOGIN-004 |
| R4 | TC-LOGIN-005 |
