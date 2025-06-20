
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '@/components/auth/PhoneInput';
import OTPVerification from '@/components/auth/OTPVerification';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

const AuthPage = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { loading, sendOTP, verifyOTP } = useFirebaseAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = async (phone: string) => {
    setPhoneNumber(phone);
    const success = await sendOTP(phone);
    if (success) {
      setStep('otp');
    }
  };

  const handleOTPVerify = async (otp: string) => {
    const success = await verifyOTP(otp);
    if (success) {
      navigate('/');
    }
  };

  const handleResendOTP = () => {
    sendOTP(phoneNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'phone' ? (
          <PhoneInput onSubmit={handlePhoneSubmit} loading={loading} />
        ) : (
          <OTPVerification
            onVerify={handleOTPVerify}
            onResend={handleResendOTP}
            loading={loading}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
