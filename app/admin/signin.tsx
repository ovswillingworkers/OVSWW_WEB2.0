'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      await signIn('credentials', { email, password, redirect: false });
    } catch (error) {
      setError('Failed to sign in');
      console.error('Failed to sign in:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Sign in</button>
    </form>
  );
}

export default SignIn;
