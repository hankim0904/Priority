import { createContext, useState, useContext, ReactNode } from 'react';

interface CardIdContextProps {
  focusedCardId: string;
  setFocusedCardId: (value: string) => void;
}

const CardIdContext = createContext<CardIdContextProps | undefined>(undefined);

interface CardIdProviderProps {
  children: ReactNode;
}

export const CardIdProvider = ({ children }: CardIdProviderProps) => {
  const [focusedCardId, setFocusedCardId] = useState<string>('');

  return (
    <CardIdContext.Provider value={{ focusedCardId, setFocusedCardId }}>
      {children}
    </CardIdContext.Provider>
  );
};

export const useCardId = () => {
  const context = useContext(CardIdContext);
  if (!context) {
    throw new Error('useCardId must be used within a CardIdProvider');
  }
  return context;
};
