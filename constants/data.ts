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
    id: 'bank',
    label: 'Bank Account',
    description: 'Direct transfer from your bank account',
    icon: 'business-outline',
    color: '#0A2540',
  },
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    description: 'Pay using your Easypaisa wallet',
    icon: 'wallet-outline',
    color: '#1C9A45',
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    description: 'Pay using your JazzCash wallet',
    icon: 'phone-portrait-outline',
    color: '#D8232A',
  },
  {
    id: 'card',
    label: 'Debit / Credit Card',
    description: 'Visa, Mastercard or UnionPay',
    icon: 'card-outline',
    color: '#6C63FF',
  },
  {
    id: 'qr',
    label: 'QR Payment',
    description: 'Scan QR code with any banking or wallet app',
    icon: 'qr-code-outline',
    color: '#0A8F5B',
  },
  {
    id: 'raast',
    label: 'Raast (Instant Payment)',
    description: 'Pay instantly using your CNIC or mobile number',
    icon: 'flash-outline',
    color: '#00A859',
  },
  {
    id: 'counter',
    label: 'Over the Counter',
    description: 'Pay cash at any Easypaisa shop or UBL branch',
    icon: 'storefront-outline',
    color: '#E67E22',
  },
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
