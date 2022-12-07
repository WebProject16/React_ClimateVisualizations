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

test('onsubmit handler gets called when submit button is pressed', () => {
    const mockHandler = jest.fn()
    render(<Register handleSubmit={mockHandler}/>)
    const button = screen.getByRole('button')
    userEvent.click(button)
    
    expect(mockHandler.mock.calls.length).toBe(1)
})
