import React from 'react';
import LoginForm from '../../features/auth/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-full h-full rounded-3xl shadow-2xl flex overflow-hidden">
        
        {/* Left side - Login Form */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <LoginForm/>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden md:block flex-1 p-9">
          <img
            src="/login-illustration.webp"
            alt="Login illustration with person using fingerprint authentication"
            className="w-full h-full object-cover object-center rounded-4xl shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
