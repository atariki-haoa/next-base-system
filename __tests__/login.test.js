import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../pages/Login';

jest.mock('axios');

test('logs in successfully', async () => {
  axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

  const { getByLabelText, getByText } = render(<Login />);

  fireEvent.change(getByLabelText(/usuario:/i), { target: { value: 'usuario' } });
  fireEvent.change(getByLabelText(/contraseña:/i), { target: { value: 'asder123' } });
  fireEvent.click(getByText(/iniciar sesión/i));

  await waitFor(() => {
    expect(window.localStorage.getItem('token')).toEqual('fake-token');
  });
});
