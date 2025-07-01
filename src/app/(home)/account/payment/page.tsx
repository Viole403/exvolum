'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ArrowLeft, Plus, Edit2, Trash2, Check, Shield, Eye, EyeOff } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { User as UserType, PaymentMethod } from '@/data/mockData';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

type UserWithPaymentMethods = UserType & {
  paymentMethods: PaymentMethod[];
};

export default function AccountPayment() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserWithPaymentMethods | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCardNumber, setShowCardNumber] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: 'CREDIT_CARD' as 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'DIGITAL_WALLET',
    provider: '',
    last4: '',
    expiryMonth: '',
    expiryYear: '',
    holderName: '',
    isDefault: false
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // Find user in mock data
      const foundUser = mockData.users.find((u: UserType) => u.email === user.email) as UserWithPaymentMethods;
      if (foundUser) {
        // Get user's payment methods
        const userPaymentMethods = mockData.paymentMethods.filter((pm: PaymentMethod) => pm.userId === foundUser.id);
        setUserData(foundUser);
        setPaymentMethods(userPaymentMethods);
      }
    }
    setIsLoading(false);
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="md:col-span-3 h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getUserDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      if (editingPayment) {
      // Update existing payment method
      const updatedPaymentMethods = paymentMethods.map(pm =>
        pm.id === editingPayment.id
          ? { ...pm, ...formData, expiryMonth: parseInt(formData.expiryMonth), expiryYear: parseInt(formData.expiryYear), updatedAt: new Date() }
          : pm
      );
      setPaymentMethods(updatedPaymentMethods);
    } else {
      // Add new payment method
      const newPaymentMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        userId: userData?.id || '',
        type: formData.type,
        provider: formData.provider,
        last4: formData.last4,
        expiryMonth: parseInt(formData.expiryMonth),
        expiryYear: parseInt(formData.expiryYear),
        holderName: formData.holderName,
        isDefault: formData.isDefault,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    }

    // Reset form
    setFormData({
      type: 'CREDIT_CARD',
      provider: '',
      last4: '',
      expiryMonth: '',
      expiryYear: '',
      holderName: '',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingPayment(null);
  };

  const handleEdit = (paymentMethod: PaymentMethod) => {
    setFormData({
      type: paymentMethod.type,
      provider: paymentMethod.provider,
      last4: paymentMethod.last4,
      expiryMonth: paymentMethod.expiryMonth.toString(),
      expiryYear: paymentMethod.expiryYear.toString(),
      holderName: paymentMethod.holderName,
      isDefault: paymentMethod.isDefault
    });
    setEditingPayment(paymentMethod);
    setShowAddForm(true);
  };

  const handleDelete = (paymentMethodId: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodId));
  };

  const handleSetDefault = (paymentMethodId: string) => {
    const updatedPaymentMethods = paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    }));
    setPaymentMethods(updatedPaymentMethods);
  };
  const getCardIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
      case 'american express':
        return '💳';
      case 'discover':
        return '💳';
      case 'paypal':
        return '🅿️';
      default:
        return '💳';
    }
  };
  return (
    <div className="min-h-screen bg-white">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-12">
        <div className="grid lg:grid-cols-4 gap-8 pt-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar active="payment" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/account">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Account
                </Link>
              </Button>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
                  <p className="text-gray-600">Manage your payment options for secure checkout</p>
                </div>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</h3>
                    <p className="text-sm text-blue-700">
                      Your payment information is encrypted and securely stored. We never store full credit card numbers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add/Edit Payment Method Form */}
            {showAddForm && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingPayment ? 'Edit Payment Method' : 'Add New Payment Method'}
                  </h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="DEBIT_CARD">Debit Card</option>
                        <option value="PAYPAL">PayPal</option>
                        <option value="DIGITAL_WALLET">Digital Wallet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Provider
                      </label>
                      <select
                        name="provider"
                        value={formData.provider}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Provider</option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="American Express">American Express</option>
                        <option value="Discover">Discover</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last 4 Digits
                      </label>
                      <input
                        type="text"
                        name="last4"
                        value={formData.last4}
                        onChange={handleInputChange}
                        maxLength={4}
                        pattern="\d{4}"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="holderName"
                        value={formData.holderName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Month
                      </label>
                      <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Year
                      </label>
                      <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={formData.isDefault}
                          onChange={handleInputChange}
                          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Set as default payment method</span>
                      </label>
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <Button type="submit">
                        {editingPayment ? 'Update Payment Method' : 'Add Payment Method'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingPayment(null);
                          setFormData({
                            type: 'CREDIT_CARD',
                            provider: '',
                            last4: '',
                            expiryMonth: '',
                            expiryYear: '',
                            holderName: '',
                            isDefault: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods List */}
            <div className="space-y-6">
              {paymentMethods.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment methods yet</h3>
                    <p className="text-gray-600 mb-6">Add your first payment method to enable faster checkout.</p>
                    <Button onClick={() => setShowAddForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((paymentMethod) => (
                    <Card
                      key={paymentMethod.id}
                      className={paymentMethod.isDefault ? 'border-blue-200 bg-blue-50' : ''}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getCardIcon(paymentMethod.provider)}</span>
                            <div>
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                paymentMethod.type === 'CREDIT_CARD'
                                  ? 'bg-green-100 text-green-800'
                                  : paymentMethod.type === 'DEBIT_CARD'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {paymentMethod.type.replace('_', ' ')}
                              </span>
                              {paymentMethod.isDefault && (
                                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                  <Check className="h-3 w-3 inline mr-1" />
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(paymentMethod)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(paymentMethod.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-sm text-gray-900 space-y-1">
                          <p className="font-medium">{paymentMethod.provider} •••• {paymentMethod.last4}</p>
                          <p className="text-gray-600">{paymentMethod.holderName}</p>
                          <p className="text-gray-600">
                            Expires {String(paymentMethod.expiryMonth).padStart(2, '0')}/{paymentMethod.expiryYear}
                          </p>
                        </div>

                        {!paymentMethod.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(paymentMethod.id)}
                            className="mt-4"
                          >
                            Set as Default
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
