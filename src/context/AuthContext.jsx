import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { INITIAL_USERS } from '../mockData';

const AuthContext = createContext();
const ADMIN_MASTER_PASSCODE = 'ADMIN1234';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mr_auth_user_v4');
    return saved ? JSON.parse(saved) : INITIAL_USERS[1];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mr_auth_user_v4', JSON.stringify(user));
    } else {
      localStorage.removeItem('mr_auth_user_v4');
    }
  }, [user]);

  // Listen to Supabase Auth State Changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const suUser = session.user;
        const meta = suUser.user_metadata || {};
        const formattedUser = {
          id: suUser.id,
          email: suUser.email,
          username: meta.username || suUser.email.split('@')[0],
          name: meta.full_name || meta.name || suUser.email.split('@')[0],
          role: meta.role || (suUser.email.includes('admin') ? 'admin' : 'user'),
          tel: meta.tel || '081-234-5678'
        };
        setUser(formattedUser);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // 1. Register (สมัครสมาชิกใหม่) - Seamless Login
  const register = async ({ email, password, fullName, username, tel }) => {
    setAuthError('');
    setAuthSuccessMsg('');
    setLoading(true);

    const newUser = {
      id: Date.now(),
      email,
      username: username || email.split('@')[0],
      name: fullName || username || 'ผู้ใช้งานใหม่',
      role: 'user', // Always user by default for security
      tel: tel || '081-000-0000'
    };

    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        // Attempt Supabase Cloud SignUp
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username || email.split('@')[0],
              tel,
              role: 'user'
            }
          }
        });

        if (error) {
          console.warn('Supabase SignUp Note:', error.message);
        } else if (data?.user) {
          newUser.id = data.user.id;
        }
      }

      // Log in user immediately on frontend
      setUser(newUser);
      setLoading(false);
      setAuthSuccessMsg('สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!');
      return { success: true };

    } catch (err) {
      // Fallback log in user on frontend so user is never blocked
      setUser(newUser);
      setLoading(false);
      setAuthSuccessMsg('สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!');
      return { success: true };
    }
  };

  // 2. Login (เข้าสู่ระบบ)
  const login = async (emailOrUsername, password) => {
    setAuthError('');
    setAuthSuccessMsg('');
    setLoading(true);

    const input = emailOrUsername.trim().toLowerCase();

    // Admin Login Check
    if (input === 'admin') {
      if (password === 'admin1234' || password === 'admin') {
        setUser(INITIAL_USERS[0]);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        setAuthError('รหัสผ่านผู้ดูแลระบบ (Admin) ไม่ถูกต้อง');
        return { success: false };
      }
    }

    try {
      if (import.meta.env.VITE_SUPABASE_URL && input.includes('@')) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: input,
          password
        });
        if (!error && data?.user) {
          setLoading(false);
          return { success: true };
        }
      }

      // Normal Login Fallback
      const found = INITIAL_USERS.find(u => u.username.toLowerCase() === input || u.email?.toLowerCase() === input);
      const customUser = found || {
        id: Date.now(),
        email: input.includes('@') ? input : `${input}@example.com`,
        username: input,
        name: input,
        role: 'user',
        tel: '081-234-5678'
      };

      setUser(customUser);
      setLoading(false);
      return { success: true };

    } catch (err) {
      const customUser = {
        id: Date.now(),
        email: input.includes('@') ? input : `${input}@example.com`,
        username: input,
        name: input,
        role: 'user',
        tel: '081-234-5678'
      };
      setUser(customUser);
      setLoading(false);
      return { success: true };
    }
  };

  // 3. Elevate to Admin with Master Passcode
  const elevateToAdminWithPin = (passcode) => {
    if (passcode === ADMIN_MASTER_PASSCODE) {
      const adminUser = {
        ...user,
        role: 'admin',
        name: user?.name ? `${user.name} (Admin)` : 'ผู้ดูแลระบบ'
      };
      setUser(adminUser);
      setIsAdminPinModalOpen(false);
      return { success: true, message: 'ยืนยันสิทธิ์แอดมินสำเร็จ' };
    }
    return { success: false, message: 'รหัสแอดมินไม่ถูกต้อง' };
  };

  const logout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      elevateToAdminWithPin,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isAdminPinModalOpen,
      setIsAdminPinModalOpen,
      authError,
      setAuthError,
      authSuccessMsg,
      setAuthSuccessMsg,
      loading,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
