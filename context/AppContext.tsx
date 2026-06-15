import React, { createContext, useContext, useState } from 'react';

export type PaymentMethodId =
  | 'bank'
  | 'easypaisa'
  | 'jazzcash'
  | 'card'
  | 'qr'
  | 'raast'
  | 'counter';

export interface UserProfile {
  fullName: string;
  cnic: string;
  dateOfBirth: string; // ISO date string
}

export interface PaymentRecord {
  id: string;
  service: string;
  amount: string;
  method: PaymentMethodId;
  date: string;
  status: 'success' | 'pending' | 'failed';
  reference: string;
}

export interface PendingPayment {
  service: string;
  amount: string;
  method: PaymentMethodId | null;
  accountDetail: string;
}

interface AppContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  isOnboarded: boolean;

  pendingPayment: PendingPayment;
  setPendingPayment: (update: Partial<PendingPayment>) => void;
  resetPendingPayment: () => void;

  paymentHistory: PaymentRecord[];
  addPaymentRecord: (record: PaymentRecord) => void;
}

const emptyPendingPayment: PendingPayment = {
  service: '',
  amount: '',
  method: null,
  accountDetail: '',
};

const initialHistory: PaymentRecord[] = [
  {
    id: 'TXN-100231',
    service: 'Financial Management Fee',
    amount: '15,000',
    method: 'easypaisa',
    date: '2026-06-02',
    status: 'success',
    reference: 'EP-88213940',
  },
  {
    id: 'TXN-100198',
    service: 'Legal Documentation Service',
    amount: '8,500',
    method: 'bank',
    date: '2026-05-21',
    status: 'success',
    reference: 'BNK-23410988',
  },
  {
    id: 'TXN-100177',
    service: 'Business Consulting Retainer',
    amount: '25,000',
    method: 'jazzcash',
    date: '2026-05-08',
    status: 'pending',
    reference: 'JC-77129003',
  },
];

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [pendingPayment, setPendingPaymentState] = useState<PendingPayment>(emptyPendingPayment);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>(initialHistory);

  const setProfile = (newProfile: UserProfile) => setProfileState(newProfile);
  const clearProfile = () => setProfileState(null);

  const setPendingPayment = (update: Partial<PendingPayment>) =>
    setPendingPaymentState((prev) => ({ ...prev, ...update }));

  const resetPendingPayment = () => setPendingPaymentState(emptyPendingPayment);

  const addPaymentRecord = (record: PaymentRecord) =>
    setPaymentHistory((prev) => [record, ...prev]);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        clearProfile,
        isOnboarded: profile !== null,
        pendingPayment,
        setPendingPayment,
        resetPendingPayment,
        paymentHistory,
        addPaymentRecord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
