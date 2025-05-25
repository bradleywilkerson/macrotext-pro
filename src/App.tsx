import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Authenticate from './components/Authenticate';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import './App.css';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading app...</div>; // Or a global spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={session ? <Navigate to="/dashboard" /> : <Authenticate />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* You can add a 404 route here if needed */}
        {/* <Route path="*" element={<NotFoundComponent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
