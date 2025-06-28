import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numeric = value.replace(/\D/g, '');
      if (numeric.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numeric }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Logging in with:', formData);
      // Proceed with login logic
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#0d99ff] mb-6">
          Welcome Back to Tikoshi
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div
              className={`flex items-center border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus-within:ring-2 focus-within:ring-[#0d99ff] overflow-hidden`}
            >
              <span className="px-3 text-gray-600 bg-gray-100 text-sm">+91</span>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-2 text-sm focus:outline-none"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 mt-1 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d99ff]`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#0d99ff] text-white rounded-md font-semibold hover:bg-blue-600 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Navigation */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#0d99ff] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
