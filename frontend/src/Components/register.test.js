import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './Register.js'

test('register page renders correctly', () => {
  const { getByLabelText, getByText} = render(<Register />)

  const nameLabel = getByLabelText('Username:')
  const pwdLabel = getByLabelText('Password:')
  const pwdRptLabel = getByLabelText('Please repeat the password:')
  const welcomeMsg = getByText('Register a new user')

  expect(nameLabel).toBeInTheDocument()
  expect(pwdLabel).toBeInTheDocument()
  expect(pwdRptLabel).toBeInTheDocument()
  expect(welcomeMsg).toBeVisible()
})

/* test('onsubmit handler gets called when submit button is pressed', async () => {
  const handleSubmit = jest.fn();

  render(<Register onSubmit={handleSubmit}/>)
  const user = userEvent.setup()
  const button = screen.getByTestId('registerBtn')

  await user.click(button)

  expect(handleSubmit).toBeCalledTimes(1)
})
 */
test('demo', async () => {
  const user = userEvent.setup();

  const onClick = jest.fn();
  const subject = (<button onClick={onClick}>testButton</button>);

  render(subject);

  await user.click(screen.getByText('testButton'));

  expect(onClick).toBeCalledTimes(1);
});