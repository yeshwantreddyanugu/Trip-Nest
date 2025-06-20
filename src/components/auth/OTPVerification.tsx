
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, RotateCcw } from 'lucide-react';

interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
  loading: boolean;
  phoneNumber: string;
}

const OTPVerification = ({ onVerify, onResend, loading, phoneNumber }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = () => {
    onResend();
    setResendTimer(30);
    setCanResend(false);
    setOtp('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Shield className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle>Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {phoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <InputOTP 
            maxLength={6} 
            value={otp} 
            onChange={setOtp}
            onComplete={handleVerify}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button 
          onClick={handleVerify}
          className="w-full" 
          disabled={otp.length !== 6 || loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          {!canResend ? (
            <span>Resend OTP in {resendTimer}s</span>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resend OTP
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
