import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { LoginContext } from '../LoginContext.js'
import userEvent from '@testing-library/user-event'
import Login from '../Login.js'

afterEach(() => cleanup())
beforeEach(() => { 
    render(<LoginContext.Provider value={false}><Login /></LoginContext.Provider>)
})

test('login renders correctly', () => {
    const name = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
    const welcomeMsg = screen.getByText('Kirjaudu sisään')

    expect(name).toBeVisible()
    expect(pwd).toBeVisible()
    expect(welcomeMsg).toBeVisible()
})

test('attempt to submit empty', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
})

test('attempt to submit too long of an username', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    await user.type(pwd, "qweqwe1")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit too short of an username', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "A")
    await user.type(pwd, "qweqwe1")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit invalid username', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "A123_ !")
    await user.type(pwd, "qweqwe1")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit invalid password', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo22")
    await user.type(pwd, "qweqwe1<")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit only numbers pwd', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo22")
    await user.type(pwd, "123123123")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit only letters pwd', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo22")
    await user.type(pwd, "qweqweqwe")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit too short pwd', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo22")
    await user.type(pwd, "1q")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit too long pwd', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo22")
    await user.type(pwd, "1q9w9w9w9w9w99w9w99w99w9w9w9e9qww8rreyqw89ryqw870rtqw78rtq8w7rtq87wrtg87qwtr987qwt87r")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).not.toBeEmptyDOMElement()
  })

  test('attempt to submit valid', async () => {
    const user = userEvent.setup()
  
    const username = screen.getByPlaceholderText("Käyttäjänimi")
    const pwd = screen.getByPlaceholderText("Salasana")
  
    await user.type(username, "Kimmo1")
    await user.type(pwd, "qweqwe1")
  
    await user.click(screen.getByTestId('loginBtn'))
    expect(screen.getByTestId('errMsg')).toBeEmptyDOMElement()
  })