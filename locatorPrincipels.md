Locator	Finds an element by...	Example
getByRole	its role + visible name	page.getByRole('button', { name: 'Submit' })
getByLabel	the label of a form field	page.getByLabel('Email')
getByPlaceholder	the grey hint text in an input	page.getByPlaceholder('Search')
getByText	visible text	page.getByText('Welcome back')
getByTestId	a data-testid attribute	page.getByTestId('todo-title')
locator	a CSS selector (last resort)	page.locator('.todo-list li')

Why is getByRole first? Because it describes the element like a user would: “the button called Submit”. If a developer changes the button’s color, class name, or position, the test still works. A CSS selector like div > div:nth-child(3) > button breaks on almost any change.

Common roles: button, link, heading, checkbox, textbox, listitem, combobox (dropdown).