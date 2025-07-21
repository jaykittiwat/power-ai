import { useState } from 'react';

// ตัวแปร auth สำหรับเก็บสถานะและฟังก์ชัน login/logout แบบ mock (ไม่มี backend จริง)

let auth = {
  isAuthenticated: false, // สถานะล็อกอิน
  login(cb: () => void) {
    auth.isAuthenticated = true; // เปลี่ยนสถานะเป็นล็อกอิน
    setTimeout(cb, 100); // จำลอง async callback
  },
  logout(cb: () => void) {
    auth.isAuthenticated = false; // เปลี่ยนสถานะเป็น logout
    setTimeout(cb, 100);
  }
};

// custom hook สำหรับจัดการสถานะล็อกอิน (mock)
export function useAuth() {
  // state สำหรับเก็บสถานะล็อกอิน
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);

  // ฟังก์ชัน login (mock)
  function login(username: string, password: string) {
    // สามารถเพิ่ม logic ตรวจสอบจริงได้ที่นี่
    auth.login(() => setIsAuthenticated(true));
  }

  // ฟังก์ชัน logout
  function logout() {
    auth.logout(() => setIsAuthenticated(false));
  }

  // คืนค่า object สำหรับใช้งานใน component
  return { isAuthenticated, login, logout };
}
