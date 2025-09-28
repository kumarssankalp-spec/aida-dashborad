import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiZap } from 'react-icons/fi';
import { authenticate } from '../config/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const client = authenticate(username, password);
    if (client) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#8c52ff]/20 to-[#8676e9]/20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#ff914d]/20 to-[#c8e9f7]/20 moving-shadow" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-[#c8e9f7]/30 to-[#8676e9]/30 pulse-icon" />
      </div>

      <motion.div className="max-w-md w-full space-y-8 z-10" variants={containerVariants} initial="hidden" animate="visible">
        {/* Company Logo/Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <div className="flex items-center justify-center mb-4">
            <img src="/aidalogo.svg" alt="Aaida Corp" className="w-16 h-16 rounded-2xl moving-shadow" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Aaida Corp</h1>
          <p className="text-lg text-gray-600 font-medium">Client Proposal Dashboard</p>
          <p className="text-sm text-gray-500 mt-2">Secure access to your personalized project details</p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants}>
          <Card className="glassmorphism-card p-8 moving-shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center mb-6">
                <FiShield className="w-8 h-8 text-[#8c52ff] mx-auto mb-2 pulse-icon" />
                <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>
                <p className="text-gray-600 text-sm mt-1">Sign in to access your project dashboard</p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5 z-10" />
                    <Input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10 h-12 glassmorphism border-2 border-white/30 focus:border-[#8c52ff] transition-all duration-200" placeholder="Enter your username" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5 z-10" />
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12 glassmorphism border-2 border-white/30 focus:border-[#8c52ff] transition-all duration-200" placeholder="Enter your password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#8c52ff] transition-colors">
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] hover:from-[#8676e9] hover:to-[#8c52ff] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 moving-shadow">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <FiArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>


          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center text-sm text-gray-500" variants={itemVariants}>
          <p>Powered by Aaida Corp © 2025</p>
          <p className="mt-1">Secure • Professional • Innovative</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
