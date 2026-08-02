import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User 
} from 'firebase/auth';
import { UserRole } from '../components/RoleGuard';

const ADMIN_EMAIL = 'musclehed03@gmail.com'; 

export type AuthUser = User & { role?: UserRole };

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  isAgeVerified: boolean;
  verifyAge: () => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  isAgeVerified: false,
  verifyAge: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    const storedVerification = localStorage.getItem('dd_age_verified');
    if (storedVerification === 'true') {
      setIsAgeVerified(true);
    }

  if (!isFirebaseConfigured || !auth || !db) {
  localStorage.removeItem('dd_mock_session');
  setUser(null);
  setLoading(false);
  return;
}

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 1. PULL USER DATA FROM FIRESTORE
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          // Force 'architect' role if admin email to prevent lockouts, otherwise pull DB role
          const computedRole = currentUser.email === ADMIN_EMAIL 
            ? 'architect' 
            : (userSnap.exists() ? userSnap.data().role || 'deviant' : 'deviant');
setUser(
  Object.assign(currentUser, {
    role: computedRole,
  }) as AuthUser,
);
        } catch (error) {
          console.error("Failed to fetch user roles:", error);
         setUser(
  Object.assign(currentUser, {
    role:
      currentUser.email === ADMIN_EMAIL
        ? 'architect'
        : 'deviant',
  }) as AuthUser,
);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const verifyAge = () => {
    setIsAgeVerified(true);
    localStorage.setItem('dd_age_verified', 'true');
  };

  const loginWithGoogle = async () => {
if (!isFirebaseConfigured || !auth) {
  localStorage.removeItem('dd_mock_session');
  alert(
    'Authentication is temporarily unavailable. Please try again shortly.',
  );
  return;
}
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' }); 
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        // User intentionally closed the popup or multiple popups were triggered. 
        // We can safely ignore this or show a mild notification.
        console.log('Authentication aborted by user.');
      } else {
        console.error('Authentication Protocol Failed:', error);
        alert(`Authentication Failed: ${error.message}`);
      }
    }
  };

  const logout = async () => {
  if (!isFirebaseConfigured || !auth) {
    localStorage.removeItem('dd_mock_session');
    setUser(null);
    return;
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout Protocol Failed:', error);
  }
};
if (!isFirebaseConfigured || !auth) {
  localStorage.removeItem('dd_mock_session');
  setUser(null);
  return;
}
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, isAgeVerified, verifyAge, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
