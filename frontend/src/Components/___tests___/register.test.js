import React from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from '../Register.js'

afterEach(() => cleanup())

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

test('attempt to submit empty', async () => {
  const user = userEvent.setup()
  render(<Register />)
  await user.click(screen.getByTestId('registerBtn'))

  expect(screen.getByTestId('errMsg')).not.toHaveTextContent('')
})

test('attempt to submit valid', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aapeli_2")
  await user.type(pwd, "qweqwe1")
  await user.type(pwdRpt, "qweqwe1")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).toBeEmptyDOMElement()
})

test('attempt to submit too long of an username', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  await user.type(pwd, "qweqwe1")
  await user.type(pwdRpt, "qweqwe1")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit too short of an username', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "A")
  await user.type(pwd, "qweqwe1")
  await user.type(pwdRpt, "qweqwe1")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit invalid username', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "A1_! %")
  await user.type(pwd, "qweqwe1")
  await user.type(pwdRpt, "qweqwe1")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit different password', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "qweqwe1")
  await user.type(pwdRpt, "qweqwe12")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit invalid password chars', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "qweqwe1>")
  await user.type(pwdRpt, "qweqwe1>")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit only pwd letters', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "qweqwe")
  await user.type(pwdRpt, "qweqwe")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit only pwd numbers', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "123123123")
  await user.type(pwdRpt, "123123123")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit too long pwd', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "qw1")
  await user.type(pwdRpt, "qw1")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit too short pwd', async () => {
  const user = userEvent.setup()
  render(<Register />)

  const username = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  const pwdRpt = screen.getByPlaceholderText("Toista salasana")

  await user.type(username, "Aasd_2")
  await user.type(pwd, "qweqweqweqweqweqweqweqweqweqweqweqwee123123123312312312312331231233")
  await user.type(pwdRpt, "qweqweqweqweqweqweqweqweqweqweqweqwee123123123312312312312331231233")

  await user.click(screen.getByTestId('registerBtn'))
  expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})