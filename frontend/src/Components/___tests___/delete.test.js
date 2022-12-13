import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginContext } from '../LoginContext.js'
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile'

afterEach(() => cleanup())
beforeEach(() => { 
    render(<LoginContext.Provider value={false}><BrowserRouter><Profile /></BrowserRouter></LoginContext.Provider>)
})

test('delete renders correctly', () => {

  const deleteBtn = screen.getByText('Delete user')
  expect(deleteBtn).toBeInTheDocument()

})

test('Press the delete user button', async () => {
  
  const user = userEvent.setup();
  
  await user.click(screen.getByText('Delete user'));

  const name = screen.getByPlaceholderText("Käyttäjänimi")
  const pwd = screen.getByPlaceholderText("Salasana")
  expect(name).toBeInTheDocument();
  expect(pwd).toBeInTheDocument();
})

test('attempt to delete user without values', async () => {

    const user = userEvent.setup();

    await user.click(screen.getByText('Delete user'));
    const name = screen.getByPlaceholderText("Käyttäjänimi");
    const pwd = screen.getByPlaceholderText("Salasana");


  	await user.click(screen.getByText('Delete user?'));

})

test('attempt to delete user with incorrect values', async () => {

  const user = userEvent.setup();

  await user.click(screen.getByText('Delete user'));
  const name = screen.getByPlaceholderText("Käyttäjänimi");
  const pwd = screen.getByPlaceholderText("Salasana");

  await user.type(name, "q");
  await user.type(pwd, "q");

  await user.click(screen.getByText('Delete user?'));

})


