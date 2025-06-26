import { useState } from 'react';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

// 👇 TypeScript fix to declare recaptchaVerifier on window
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      console.log('[🔐] Setting up invisible reCAPTCHA...');
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('[✅] reCAPTCHA verified:', response);
        }
      });
    }
  };

  const sendOTP = async (phoneNumber: string) => {
    try {
      setLoading(true);
      console.log(`[📞] Sending OTP to: ${phoneNumber}`);
      setupRecaptcha();

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);

      toast({
        title: "OTP Sent",
        description: "Verification code sent to your phone number",
      });

      console.log('[📤] OTP sent, awaiting user input...');
      return true;
    } catch (error: any) {
      console.error('[❌] Error sending OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    if (!confirmationResult) {
      console.warn('[⚠️] No confirmation result found.');
      return false;
    }

    try {
      setLoading(true);
      console.log(`[🔍] Verifying OTP: ${otp}`);

      const result = await confirmationResult.confirm(otp);
      setUser(result.user);

      // Log UID
      console.log('[✅] Phone number verified!');

      // Store UID for session persistence
      localStorage.setItem('firebaseUID', result.user.uid);
      localStorage.setItem('firebasePhone', result.user.phoneNumber || '');

      console.log("✅ UID:", result.user.uid);
      console.log("✅ Phone:", result.user.phoneNumber);
      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });

      return true;
    } catch (error: any) {
      console.error('[❌] OTP verification failed:', error);
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendOTP,
    verifyOTP,
    confirmationResult,
    user
  };
};
