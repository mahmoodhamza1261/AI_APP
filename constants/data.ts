import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PaymentMethodId } from '../context/AppContext';

type IconName = ComponentProps<typeof Ionicons>['name'];

export interface PaymentMethodMeta {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: IconName;
  color: string;
}

export const paymentMethods: PaymentMethodMeta[] = [
  {
    id: 'abs-api',
    label: 'ABS Payment',
    description: 'Pay directly through ABS secure portal',
    icon: 'globe-outline',
    color: '#0A2540',
  },
  {
    id: 'bank-transfer',
    label: 'Bank Transfer',
    description: 'Pay via any bank account or digital wallet',
    icon: 'swap-horizontal-outline',
    color: '#1565C0',
  },
  {
    id: 'qr',
    label: 'QR Code',
    description: 'Scan QR code with any banking or wallet app',
    icon: 'qr-code-outline',
    color: '#0A8F5B',
  },
  {
    id: 'create-wallet',
    label: 'ABS Wallet',
    description: 'Create your ABS digital wallet to pay instantly',
    icon: 'wallet-outline',
    color: '#6C63FF',
  },
];

export interface BankOption {
  id: string;
  name: string;
  icon: IconName;
  color: string;
}

export const banks: BankOption[] = [
  { id: 'meezan', name: 'Meezan Bank', icon: 'business-outline', color: '#1B6B3A' },
  { id: 'hbl', name: 'HBL (Habib Bank)', icon: 'business-outline', color: '#CE1126' },
  { id: 'ubl', name: 'UBL (United Bank)', icon: 'business-outline', color: '#0067B1' },
  { id: 'allied', name: 'Allied Bank', icon: 'business-outline', color: '#EE2D23' },
  { id: 'mcb', name: 'MCB Bank', icon: 'business-outline', color: '#006D38' },
  { id: 'alfalah', name: 'Bank Alfalah', icon: 'business-outline', color: '#0060A9' },
  { id: 'faysal', name: 'Faysal Bank', icon: 'business-outline', color: '#004B23' },
  { id: 'js', name: 'JS Bank', icon: 'business-outline', color: '#C6A200' },
  { id: 'habibmetro', name: 'Habib Metro Bank', icon: 'business-outline', color: '#204483' },
  { id: 'sc', name: 'Standard Chartered', icon: 'business-outline', color: '#00853F' },
  { id: 'bankislami', name: 'Bank Islami', icon: 'business-outline', color: '#007A3D' },
  { id: 'dib', name: 'Dubai Islamic Bank', icon: 'business-outline', color: '#B8863B' },
  { id: 'albaraka', name: 'Al Baraka Bank', icon: 'business-outline', color: '#005A30' },
];

export const wallets: BankOption[] = [
  { id: 'easypaisa', name: 'Easypaisa', icon: 'wallet-outline', color: '#1C9A45' },
  { id: 'jazzcash', name: 'JazzCash', icon: 'phone-portrait-outline', color: '#D8232A' },
  { id: 'sadapay', name: 'SadaPay', icon: 'card-outline', color: '#FF4B2B' },
  { id: 'nayapay', name: 'NayaPay', icon: 'card-outline', color: '#FE6B01' },
  { id: 'ublomni', name: 'UBL Omni', icon: 'storefront-outline', color: '#0067B1' },
];

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export const services: ServiceItem[] = [
  {
    id: 'finance-management',
    title: 'Financial Management',
    description: 'Investment consultancy, tax & compliance',
    icon: 'trending-up-outline',
  },
  {
    id: 'business-consulting',
    title: 'Business Consulting',
    description: 'Project development & licensing',
    icon: 'briefcase-outline',
  },
  {
    id: 'legal-services',
    title: 'Legal Services',
    description: 'Corporate advisory & documentation',
    icon: 'document-text-outline',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Management',
    description: 'Property buying, selling & rentals',
    icon: 'home-outline',
  },
  {
    id: 'it-services',
    title: 'IT Solutions',
    description: 'Web, software & IT support',
    icon: 'laptop-outline',
  },
  {
    id: 'digital-asset',
    title: 'Digital Asset Consultancy',
    description: 'Blockchain, fintech & crypto regulation',
    icon: 'cube-outline',
  },
  {
    id: 'import-export',
    title: 'Import & Export',
    description: 'Customs, trade finance & supply chain',
    icon: 'boat-outline',
  },
  {
    id: 'energy',
    title: 'Energy Solutions',
    description: 'Renewable & conventional energy advisory',
    icon: 'flash-outline',
  },
];
