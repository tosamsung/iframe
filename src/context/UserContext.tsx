import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { checkScreenSize } from '../util/Utils';

// Define the context value type
interface UserContextType {
  name: string;
  location: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  screenSizeDevice: string|null
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the type for the provider's props
interface UserProviderProps {
  children: ReactNode;
}

// Provide Context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>('Trà Xanh');
  const [location, setLocation] = useState<string>('Thái Nguyên');
  const [id, setId] = useState<number | null>(null); // Correct the initial state for id
  const { ownerId } = useParams<{ ownerId: string }>();
  const [screenSizeDevice, setScreenSizeDevice] = useState<string | null>(null)
  useEffect(() => {

    if (ownerId) {
      // Update id using the previous value with the correct updater function
      setId(prev => (prev !== Number(ownerId) ? Number(ownerId) : prev));
    }
  }, [ownerId]);
  useEffect(() => {
    WA.player.state.screen=checkScreenSize()
    setScreenSizeDevice(checkScreenSize())

  }, [])
  const contextValue = {
    name,
    location,
    setName,
    setLocation,
    id,
    setId,
    screenSizeDevice,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
