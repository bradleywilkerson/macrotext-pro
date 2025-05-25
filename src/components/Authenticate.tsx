import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Authenticate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = new URLSearchParams(location.search).get('mode') === 'signup';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let authResponse;
      if (isSignup) {
        authResponse = await supabase.auth.signUp({ email, password });
      } else {
        authResponse = await supabase.auth.signInWithPassword({ email, password });
      }

      if (authResponse.error) {
        setError(authResponse.error.message);
      } else if (!authResponse.data.session && isSignup) {
        //This case should ideally not happen if email confirmation is off
        //If email confirmation is on, you'd tell the user to check their email
        setError('Signup successful, but no session created. Please try logging in or check email for confirmation.');
      } else if (authResponse.data.session) {
        navigate('/dashboard');
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleAuth}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {isSignup ? (
        <p>Already have an account? <button onClick={() => navigate('/authenticate?mode=login')}>Sign In</button></p>
      ) : (
        <p>Don't have an account? <button onClick={() => navigate('/authenticate?mode=signup')}>Sign Up</button></p>
      )}
    </div>
  );
};

export default Authenticate; 