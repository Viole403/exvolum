'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

export default function AccountSettings() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [preferences, setPreferences] = useState<any>(null);
  const [linkedAccounts, setLinkedAccounts] = useState<{ google: boolean; apple: boolean }>({ google: false, apple: false });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'loginHistory' | 'security'>('profile');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [tfaAppSetup, setTfaAppSetup] = useState(false);
  const [smsRecoveryEnabled, setSmsRecoveryEnabled] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loginHistory, setLoginHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/user/settings')
        .then(res => res.json())
        .then(data => setPreferences(data.preferences || {}));
      fetch('/api/user/social-accounts')
        .then(res => res.json())
        .then(data => setLinkedAccounts(data.linked || { google: false, apple: false }));
    }
  }, [user]);

  useEffect(() => {
    if (user && activeTab === 'profile') {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [user, activeTab]);

  useEffect(() => {
    if (user && activeTab === 'loginHistory') {
      fetch('/api/user/login-history')
        .then(res => res.json())
        .then(data => setLoginHistory(Array.isArray(data) ? data : data.history || []));
    }
  }, [user, activeTab]);

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      setSuccess('Settings updated successfully');
    } catch (e: any) {
      setError(e.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleUnlink = async (provider: string) => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/user/social-accounts?provider=${provider}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to unlink account');
      setLinkedAccounts(prev => ({ ...prev, [provider]: false }));
      setSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} account unlinked`);
    } catch (e: any) {
      setError(e.message || 'Failed to unlink account');
    }
  };

  const handleLink = async (provider: string) => {
    setError('');
    setSuccess('');
    // TODO: Implement OAuth flow for Google/Apple
    // For now, just show a message
    setError('Account linking is not yet implemented.');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-6">
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8 py-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar active="settings" />
          </div>

          {/* Main Content with Tabs */}
          <div className="lg:col-span-3 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Settings className="h-7 w-7" /> Account Settings
            </h1>
            <div className="mb-6 border-b border-gray-200 flex gap-6">
              <button className={`pb-2 px-1 border-b-2 text-lg font-medium ${activeTab === 'profile' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600'}`} onClick={() => setActiveTab('profile')}>Profile</button>
              <button className={`pb-2 px-1 border-b-2 text-lg font-medium ${activeTab === 'preferences' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600'}`} onClick={() => setActiveTab('preferences')}>Preferences</button>
              <button className={`pb-2 px-1 border-b-2 text-lg font-medium ${activeTab === 'loginHistory' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600'}`} onClick={() => setActiveTab('loginHistory')}>Login History</button>
              <button className={`pb-2 px-1 border-b-2 text-lg font-medium ${activeTab === 'security' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-600'}`} onClick={() => setActiveTab('security')}>Security</button>
            </div>
            <Card>
              <CardContent className="p-8 space-y-8">
                {activeTab === 'profile' && profile && (
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    setSuccess('');
                    setError('');
                    try {
                      const res = await fetch('/api/user/profile', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(profile),
                      });
                      if (!res.ok) throw new Error('Failed to update profile');
                      setSuccess('Profile updated successfully');
                    } catch (e: any) {
                      setError(e.message || 'Failed to update profile');
                    } finally {
                      setSaving(false);
                    }
                  }}>
                    <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <Input value={profile.firstName || ''} onChange={e => setProfile((p: any) => ({ ...p, firstName: e.target.value }))} className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <Input value={profile.lastName || ''} onChange={e => setProfile((p: any) => ({ ...p, lastName: e.target.value }))} className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <Input value={profile.email || ''} onChange={e => setProfile((p: any) => ({ ...p, email: e.target.value }))} className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <Input value={profile.phone || ''} onChange={e => setProfile((p: any) => ({ ...p, phone: e.target.value }))} className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''}
                          onChange={e => setProfile((p: any) => ({ ...p, dateOfBirth: e.target.value }))}
                          className="bg-white border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-gray-900"
                          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield', appearance: 'none' }}
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</Button>
                  </form>
                )}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-2">Preferences</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 flex-1">Order Updates</span>
                        <Switch
                          checked={!!preferences?.orderUpdates}
                          onCheckedChange={v => handlePreferenceChange('orderUpdates', v)}
                        />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 flex-1">Marketing Emails</span>
                        <Switch
                          checked={!!preferences?.marketingEmails}
                          onCheckedChange={v => handlePreferenceChange('marketingEmails', v)}
                        />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 flex-1">SMS Notifications</span>
                        <Switch
                          checked={!!preferences?.smsNotifications}
                          onCheckedChange={v => handlePreferenceChange('smsNotifications', v)}
                        />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 flex-1">Email Notifications</span>
                        <Switch
                          checked={!!preferences?.emailNotifications}
                          onCheckedChange={v => handlePreferenceChange('emailNotifications', v)}
                        />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg md:col-span-2">
                        <span className="text-gray-700 flex-1">Newsletter Subscription</span>
                        <Switch
                          checked={!!preferences?.newsletterSubscription}
                          onCheckedChange={v => handlePreferenceChange('newsletterSubscription', v)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Currency</label>
                        <select
                          className="w-full border rounded px-3 py-2 bg-gray-100"
                          value={preferences?.currency || ''}
                          onChange={e => handlePreferenceChange('currency', e.target.value)}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="IDR">IDR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Language</label>
                        <select
                          className="w-full border rounded px-3 py-2 bg-gray-100"
                          value={preferences?.language || ''}
                          onChange={e => handlePreferenceChange('language', e.target.value)}
                        >
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Timezone</label>
                        <select
                          className="w-full border rounded px-3 py-2 bg-gray-100"
                          value={preferences?.timezone || ''}
                          onChange={e => handlePreferenceChange('timezone', e.target.value)}
                        >
                          <option value="UTC">UTC</option>
                          <option value="Asia/Jakarta">Asia/Jakarta</option>
                          <option value="America/New_York">America/New_York</option>
                          <option value="Europe/London">Europe/London</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={handleSave} disabled={saving} className="mt-6">
                      {saving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                )}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-semibold mb-2">Security</h2>
                    {/* Two-Factor Authentication */}
                    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-gray-600 text-sm">Add an extra layer of security to your account.</div>
                      </div>
                      <Switch checked={tfaEnabled} onCheckedChange={setTfaEnabled} />
                    </div>
                    {/* Authenticator App Setup */}
                    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900">Authenticator App</div>
                        <div className="text-gray-600 text-sm">Use an app like Google Authenticator or Authy for codes.</div>
                      </div>
                      <Button variant="outline" onClick={() => setTfaAppSetup(true)} disabled={!tfaEnabled}>{tfaAppSetup ? 'Setup Complete' : 'Setup'}</Button>
                    </div>
                    {/* SMS Recovery */}
                    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900">SMS Recovery</div>
                        <div className="text-gray-600 text-sm">Enable SMS as a backup for account recovery.</div>
                      </div>
                      <Switch checked={smsRecoveryEnabled} onCheckedChange={setSmsRecoveryEnabled} />
                    </div>
                    {/* Linked Accounts */}
                    <div className="space-y-3">
                      {/* Google Account */}
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">Google</span>
                        </div>
                        {linkedAccounts.google ? (
                          <Button variant="outline" onClick={() => handleUnlink('google')}>Unlink</Button>
                        ) : (
                          <Button variant="outline" onClick={() => handleLink('google')}>Link</Button>
                        )}
                      </div>
                      {/* Apple Account */}
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">Apple</span>
                        </div>
                        {linkedAccounts.apple ? (
                          <Button variant="outline" onClick={() => handleUnlink('apple')}>Unlink</Button>
                        ) : (
                          <Button variant="outline" onClick={() => handleLink('apple')}>Link</Button>
                        )}
                      </div>
                    </div>
                    {/* Change Password */}
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Old Password</label>
                          <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">New Password</label>
                          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Confirm Password</label>
                          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                      </div>
                      <Button variant="outline" disabled={changingPassword}>Change Password</Button>
                    </div>
                    {/* Delete Account */}
                    <div className="mt-8 border-t pt-6">
                      <h3 className="text-lg font-semibold mb-2 text-red-700">Delete Account</h3>
                      <p className="text-gray-600 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                )}
                {activeTab === 'loginHistory' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-2">Login History</h2>
                    <div className="grid gap-4">
                      {loginHistory.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">No login history found.</div>
                      ) : (
                        loginHistory.map((entry: any, idx: number) => (
                          <div key={entry.id || idx} className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 bg-gray-50 gap-2">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{entry.device || entry.userAgent || 'Unknown Device'}</div>
                              <div className="text-gray-600 text-sm">{entry.ipAddress || 'Unknown IP'} &bull; {entry.location || 'Unknown Location'}</div>
                              <div className="text-gray-500 text-xs mt-1">{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}</div>
                            </div>
                            <div className="flex flex-col md:items-end gap-1 min-w-[120px]">
                              <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700">{entry.loginMethod || 'Unknown'}</span>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${entry.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{entry.success ? 'Success' : 'Failed'}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                {(success || error) && (
                  <div>
                    {success && (
                      <Alert className="mb-4 border-green-200 bg-green-50">
                        <span className="text-green-800">{success}</span>
                      </Alert>
                    )}
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <span>{error}</span>
                      </Alert>
                    )}
                  </div>
                )}
                {/* <div>
                  <Button variant="destructive" onClick={async () => { await signOut(); router.push('/'); }}>
                    <LogOut className="h-5 w-5 mr-2" /> Sign Out
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}