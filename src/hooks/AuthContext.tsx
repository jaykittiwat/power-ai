import React, { createContext, useContext, useState, ReactNode } from 'react';

// สร้าง type สำหรับ context

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// สร้าง context สำหรับ auth
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component สำหรับครอบแอป เพื่อให้ทุกหน้าสามารถเข้าถึง auth state ได้
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // state สำหรับเก็บสถานะล็อกอิน
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ฟังก์ชัน login (demo: ล็อกอินสำเร็จเสมอ)
  const login = (username: string, password: string) => {
    setIsAuthenticated(true);
  };

  // ฟังก์ชัน logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // ส่งค่าผ่าน context
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook สำหรับใช้งาน context ได้ง่ายขึ้น
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
