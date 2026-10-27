# Sauce Demo – Checkout Test Cases

**URL:** https://www.saucedemo.com/
**Flow:** Products → Cart → Checkout: Your Information → Checkout: Overview → Complete

## Requirements
- R1: A logged-in user can check out items from the cart and complete an order.
- R2: Checkout information (first name, last name, postal code) is required.
- R3: The overview shows the selected items with correct item total, tax and total.
- R4: The user can cancel at any step and return to the previous page.
- R5: Payment can be made with Apple Pay. *(blocked)*
- R6: Payment can be made with Google Pay. *(blocked)*
- R7: Payment can be made with a Visa card. *(blocked)*
- R8: A Mastercard payment is declined. *(blocked)*

## Open questions
- **R5–R8 do not exist in the app.** Sauce Demo has no payment-method step. Is the target a different app, or a future feature? Test cases TC-CHECKOUT-009 to 012 stay blocked until there is a payment UI, test card numbers and a decline mechanism.
- Which payment test cards should be used for Visa and Mastercard (a sandbox gateway)?
- What exact decline message should be shown for Mastercard?
- What is the expected behavior when the cart is empty at checkout? (Sauce Demo currently allows it.)

## Preconditions (all cases)
User is logged in as `standard_user` / `secret_sauce` and on the Products page.

---

### TC-CHECKOUT-001: Complete checkout with one item
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Cart is empty.
- **Test data:** Item: Sauce Labs Backpack; `Jane` / `Doe` / `12345`
- **Steps:**
  1. Click Add to cart on Sauce Labs Backpack.
  2. Open the cart.
  3. Click Checkout.
  4. Enter first name, last name and postal code.
  5. Click Continue.
  6. Click Finish.
- **Expected result:** URL contains `checkout-complete.html`; "Thank you for your order!" is visible; cart badge is gone.
- **Automate?:** Yes

### TC-CHECKOUT-002: Complete checkout with multiple items
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Cart is empty.
- **Test data:** Items: Sauce Labs Backpack, Sauce Labs Bike Light; `Jane` / `Doe` / `12345`
- **Steps:**
  1. Add both items to the cart.
  2. Open the cart and click Checkout.
  3. Fill in the information and click Continue.
  4. Click Finish.
- **Expected result:** Overview lists both items; "Thank you for your order!" is visible after Finish.
- **Automate?:** Yes

### TC-CHECKOUT-003: First name is required
- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** One item in cart; user is on Checkout: Your Information.
- **Test data:** first name empty / `Doe` / `12345`
- **Steps:**
  1. Leave first name empty.
  2. Fill in last name and postal code.
  3. Click Continue.
- **Expected result:** Error "Error: First Name is required"; user stays on the information page.
- **Automate?:** Yes

### TC-CHECKOUT-004: Last name is required
- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** One item in cart; user is on Checkout: Your Information.
- **Test data:** `Jane` / last name empty / `12345`
- **Steps:**
  1. Fill in first name and postal code.
  2. Leave last name empty.
  3. Click Continue.
- **Expected result:** Error "Error: Last Name is required"; user stays on the information page.
- **Automate?:** Yes

### TC-CHECKOUT-005: Postal code is required
- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** One item in cart; user is on Checkout: Your Information.
- **Test data:** `Jane` / `Doe` / postal code empty
- **Steps:**
  1. Fill in first and last name.
  2. Leave postal code empty.
  3. Click Continue.
- **Expected result:** Error "Error: Postal Code is required"; user stays on the information page.
- **Automate?:** Yes

### TC-CHECKOUT-006: Overview totals are correct
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Cart is empty.
- **Test data:** Items: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99); `Jane` / `Doe` / `12345`
- **Steps:**
  1. Add both items and go to the checkout overview.
  2. Read item total, tax and total.
- **Expected result:** Item total is $39.98; tax is 8% of the item total (rounded to cents); total equals item total + tax.
- **Automate?:** Yes

### TC-CHECKOUT-007: Cancel from the information page returns to the cart
- **Priority:** Low
- **Type:** Edge
- **Preconditions:** One item in cart; user is on Checkout: Your Information.
- **Steps:**
  1. Click Cancel.
- **Expected result:** User is on the cart page; the item is still in the cart.
- **Automate?:** Yes

### TC-CHECKOUT-008: Cancel from the overview returns to products
- **Priority:** Low
- **Type:** Edge
- **Preconditions:** One item in cart; user is on Checkout: Overview.
- **Steps:**
  1. Click Cancel.
- **Expected result:** User is on the Products page; the item is still in the cart.
- **Automate?:** Yes

### TC-CHECKOUT-009: Pay with Apple Pay *(blocked)*
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Payment step exists; Apple Pay is available.
- **Steps:** To be defined once the payment UI exists.
- **Expected result:** Payment succeeds and the order is confirmed.
- **Automate?:** No – blocked, feature not present in app

### TC-CHECKOUT-010: Pay with Google Pay *(blocked)*
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Payment step exists; Google Pay is available.
- **Steps:** To be defined once the payment UI exists.
- **Expected result:** Payment succeeds and the order is confirmed.
- **Automate?:** No – blocked, feature not present in app

### TC-CHECKOUT-011: Pay with a Visa card *(blocked)*
- **Priority:** High
- **Type:** Positive
- **Preconditions:** Payment step exists; a Visa test card number is provided.
- **Steps:** To be defined once the payment UI exists.
- **Expected result:** Payment succeeds and the order is confirmed.
- **Automate?:** No – blocked, feature not present in app

### TC-CHECKOUT-012: Mastercard is declined *(blocked)*
- **Priority:** High
- **Type:** Negative
- **Preconditions:** Payment step exists; a Mastercard test card number is provided.
- **Steps:** To be defined once the payment UI exists.
- **Expected result:** Payment is declined with an error message; no order is created; user can retry with another method.
- **Automate?:** No – blocked, feature not present in app

---

## Coverage

| Requirement | Test cases |
|---|---|
| R1 | TC-CHECKOUT-001, TC-CHECKOUT-002 |
| R2 | TC-CHECKOUT-003, TC-CHECKOUT-004, TC-CHECKOUT-005 |
| R3 | TC-CHECKOUT-006 |
| R4 | TC-CHECKOUT-007, TC-CHECKOUT-008 |
| R5 | TC-CHECKOUT-009 (blocked) |
| R6 | TC-CHECKOUT-010 (blocked) |
| R7 | TC-CHECKOUT-011 (blocked) |
| R8 | TC-CHECKOUT-012 (blocked) |
