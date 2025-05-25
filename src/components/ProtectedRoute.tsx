import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

const ProtectedRoute: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
        return;
      }
      setSession(currentSession);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return session ? <Outlet /> : <Navigate to="/authenticate?mode=login" replace />;
};

export default ProtectedRoute; 