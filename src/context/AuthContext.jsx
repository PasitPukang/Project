import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../mockData';

const AuthContext = createContext();

const ADMIN_MASTER_PASSCODE = 'ADMIN1234';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mr_auth_user_v2');
    return saved ? JSON.parse(saved) : INITIAL_USERS[1]; // default to Pasit (Regular User)
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('mr_auth_user_v2', JSON.stringify(user));
    } else {
      localStorage.removeItem('mr_auth_user_v2');
    }
  }, [user]);

  // Secure Login Verification
  const login = (username, password) => {
    setAuthError('');
    const cleanUsername = username.trim().toLowerCase();

    // Check admin credentials
    if (cleanUsername === 'admin') {
      if (password === 'admin1234' || password === 'admin') {
        const adminUser = INITIAL_USERS[0]; // Admin user
        setUser(adminUser);
        return { success: true, message: 'เข้าสู่ระบบในฐานะผู้ดูแลระบบสำเร็จ' };
      } else {
        setAuthError('รหัสผ่านผู้ดูแลระบบ (Admin) ไม่ถูกต้อง');
        return { success: false, message: 'รหัสผ่านผู้ดูแลระบบไม่ถูกต้อง' };
      }
    }

    // Check normal user credentials
    const found = INITIAL_USERS.find(u => u.username.toLowerCase() === cleanUsername);
    if (found) {
      setUser(found);
      return { success: true, message: `เข้าสู่ระบบสำเร็จ คุณ ${found.name}` };
    }

    // Register new user (Strictly assigned 'user' role ONLY)
    const newUser = {
      id: Date.now(),
      username: cleanUsername,
      name: username,
      role: 'user', // NEVER assign admin automatically!
      tel: '081-111-2222'
    };
    setUser(newUser);
    return { success: true, message: `สมัครสมาชิกและเข้าสู่ระบบสำเร็จในฐานะผู้ใช้งานทั่วไป (User)` };
  };

  // Secure Admin Authorization Elevate with Passcode
  const elevateToAdminWithPin = (passcode) => {
    if (passcode === ADMIN_MASTER_PASSCODE) {
      const adminUser = { ...INITIAL_USERS[0], name: user?.name ? `${user.name} (Admin Authorized)` : 'ผู้ดูแลระบบ' };
      setUser(adminUser);
      setIsAdminPinModalOpen(false);
      return { success: true, message: 'การยืนยันสิทธิ์แอดมินสำเร็จ' };
    }
    return { success: false, message: 'รหัสลับความปลอดภัยแอดมินไม่ถูกต้อง' };
  };

  const logout = () => {
    // Reset back to regular user state or clear
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      elevateToAdminWithPin,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isAdminPinModalOpen,
      setIsAdminPinModalOpen,
      authError,
      setAuthError,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
