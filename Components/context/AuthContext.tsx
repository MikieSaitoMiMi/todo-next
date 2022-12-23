import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { app } from '../../lib/firebase';


export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
}

export type AuthProps = {
  children: ReactNode;
}

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing = 
    router.pathname === '/signin' ||
    router.pathname === '/signup';
  const value = {
    user,
  }

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async(user) => {
      setUser(user)
      !user && !isAvailableForViewing && (await router.push('/signin'))
    });
    return () => {
      authStateChanged();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}