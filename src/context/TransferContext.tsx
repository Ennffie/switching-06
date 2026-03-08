import { createContext, useContext, useState, type ReactNode } from 'react';

interface PlanData {
  planName: string;
  trustee: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  employerName: string;
  icon: string;
}

interface FundAllocation {
  name: string;
  percentage: number;
}

interface TransferSection {
  title: string;
  funds: FundAllocation[];
}

interface TransferData {
  step1: PlanData | null;
  transferOut: TransferSection[];
  transferIn: TransferSection[];
}

interface TransferContextType {
  transferData: TransferData;
  setStep1Data: (data: PlanData) => void;
  setTransferOutData: (data: TransferSection[]) => void;
  setTransferInData: (data: TransferSection[]) => void;
  resetTransferData: () => void;
}

const defaultData: TransferData = {
  step1: {
    planName: '友邦強積金優選計劃',
    trustee: '友邦(信託)有限',
    accountNumber: '56442131',
    accountType: '一般僱員',
    balance: 128396.91,
    employerName: '實力有限公司',
    icon: './icons/aia-logo-new.jpg',
  },
  transferOut: [],
  transferIn: [],
};

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export function TransferProvider({ children }: { children: ReactNode }) {
  const [transferData, setTransferData] = useState<TransferData>(defaultData);

  const setStep1Data = (data: PlanData) => {
    setTransferData(prev => ({ ...prev, step1: data }));
  };

  const setTransferOutData = (data: TransferSection[]) => {
    setTransferData(prev => ({ ...prev, transferOut: data }));
  };

  const setTransferInData = (data: TransferSection[]) => {
    setTransferData(prev => ({ ...prev, transferIn: data }));
  };

  const resetTransferData = () => {
    setTransferData(defaultData);
  };

  return (
    <TransferContext.Provider
      value={{
        transferData,
        setStep1Data,
        setTransferOutData,
        setTransferInData,
        resetTransferData,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
}