import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setError('');
    const finalOtp = otp.join('');
    console.log('Verifying OTP:', finalOtp);
    // Add OTP verification logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#0d99ff] mb-6">
          Verify OTP
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Enter the 6-digit code sent to your phone number.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d99ff]"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#0d99ff] text-white rounded-md font-semibold hover:bg-blue-500 transition cursor-pointer"
          >
            Verify
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={() => alert('Resend logic goes here')}
            className="text-[#0d99ff] hover:underline font-medium cursor-pointer"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
