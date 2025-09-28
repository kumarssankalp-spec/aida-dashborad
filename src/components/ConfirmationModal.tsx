import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiUser, FiCheckCircle, FiSend, FiClock, FiCheck, FiMessageSquare, FiBriefcase, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { RiDiscountPercentFill } from "react-icons/ri";
import { Input } from './ui/input';
import { Card, CardHeader, CardContent } from './ui/card';

interface ConfirmationModalProps {
  onClose: () => void;
  clientData: {
    name: string;
    email: string;
    price: string;
    discount?: number;
    company?: string;
    type?: string;
  };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, clientData }) => {
  const [formData, setFormData] = useState({
    name: clientData.name,
    email: clientData.email,
    company: clientData.company || 'Aaida Corp',
    price: clientData.price.replace('$', '').replace(',', ''),
    discount: clientData.discount || 0,
    type: clientData.type || 'Website Development',
    customMessage: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const calculateFinalPrice = () => {
    const basePrice = parseFloat(formData.price || '0');
    const discountAmount = (basePrice * (formData.discount || 0)) / 100;
    return (basePrice - discountAmount).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        to_company: formData.company,
        type: formData.type,
        original_price: `₹${parseFloat(formData.price || '0').toLocaleString()}`,
        discount: formData.discount,
        final_price: `₹${parseFloat(calculateFinalPrice()).toLocaleString()}`,
        from_name: 'Aaida Corp Team',
        custom_message: formData.customMessage,
        message: `Dear ${formData.name} from ${formData.company}, thank you for confirming your project proposal. We will contact you shortly to discuss next steps.${formData.customMessage ? `\n\nAdditional Message: ${formData.customMessage}` : ''}`
      };

      // Replace these with your EmailJS credentials
      const serviceId = 'service_pipsr8c';
      const templateId = 'template_impavys';
      const userId = '3GTJZKfMSpZPaFgo1';

      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1200));
      await emailjs.send(serviceId, templateId, templateParams, userId);

      console.log('Email sent with data:', templateParams);
      setIsSuccess(true);
    } catch (err) {
      console.error('Email send error:', err);
      setError('Failed to send confirmation email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <AnimatePresence>
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: 'spring', duration: 0.5 }}>
            <Card className="bg-white shadow-xl border border-gray-200 max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold gradient-text mb-2">🎉 Confirmation Sent!</h2>
                <p className="text-lg font-medium text-[#8c52ff] mb-4">Thank you, {formData.name} from {formData.company}!</p>

                <p className="text-gray-600 mb-6 leading-relaxed">Your project proposal has been confirmed successfully. We've sent all the details to <strong>{formData.email}</strong> and our team will reach out shortly to kick things off.</p>

                <div className="p-6 rounded-lg bg-gradient-to-r from-[#c8e9f7]/20 to-[#8676e9]/10 border border-white/20 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-[#8c52ff] mb-3">
                    <FiClock className="w-6 h-6" />
                    <span className="font-bold text-lg">What's Next?</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Our team will review your confirmation within 24 hours.</p>
                  <p className="text-sm text-gray-600">We'll schedule a project kickoff meeting to discuss timelines, deliverables, and next steps.</p>
                </div>

                <Button onClick={onClose} className="w-full bg-gradient-to-r from-[#8c52ff] to-[#8676e9] hover:from-[#8676e9] hover:to-[#8c52ff] text-white font-semibold py-3 text-lg">Back to Dashboard</Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: 'spring', duration: 0.5 }} onClick={(e) => e.stopPropagation()}>
          <Card className="bg-gradient-to-br from-white to-[#f8f9fa] shadow-xl border border-gray-200 max-w-lg w-full mx-4">
            <CardHeader className="pb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-[#8c52ff] h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 2) * 100}%` }}></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8c52ff] to-[#8676e9] flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">
                      {currentStep === 1 ? 'Step 1: Client Details' : 'Step 2: Review Pricing'}
                    </h2>
                    <p className="text-gray-600">
                      {currentStep === 1 ? 'Enter client information' : 'Confirm project pricing and send confirmation'}
                    </p>
                  </div>
                </div>
                <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <FiX className="w-6 h-6" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</motion.div>}

              {currentStep === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium text-black mb-2">Client Name</label>
                    <div className="relative flex items-center">
                      <FiUser className="absolute left-3 text-black w-5 h-5 z-20 pointer-events-none" />
                      <Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="pl-10 glassmorphism border-2 border-black/30 focus:border-[#8c52ff]" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-base font-medium text-black mb-2">Company Name</label>
                    <div className="relative flex items-center">
                      <FiBriefcase className="absolute left-3 text-black  w-5 h-5 z-20 pointer-events-none" />
                      <Input id="company" type="text" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="pl-10 glassmorphism border-2 border-black/30 focus:border-[#8c52ff]" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-black mb-2">Email Address</label>
                    <div className="relative flex items-center">
                      <FiMail className="absolute left-3 text-black w-5 h-5 z-20 pointer-events-none" />
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="pl-10 glassmorphism border-2 border-black/30 focus:border-[#8c52ff]" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-base font-medium text-black mb-2">Project Type</label>
                    <select id="type" value={formData.type} onChange={(e) => handleInputChange('type', e.target.value)} className="w-full p-3 glassmorphism border-2 border-black/30 focus:border-[#8c52ff] rounded-md" required>
                      <option value="Website Development">Website Development</option>
                      <option value="Marketing Campaign">Marketing Campaign</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="E-commerce Solution">E-commerce Solution</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="SEO Optimization">SEO Optimization</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Content Creation">Content Creation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="customMessage" className="block text-base font-medium text-black mb-2">Custom Message (Optional)</label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3 top-3 text-black  w-5 h-5 z-20 pointer-events-none" />
                      <textarea id="customMessage" value={formData.customMessage} onChange={(e) => handleInputChange('customMessage', e.target.value)} className="w-full p-3 pl-10 glassmorphism border-2 border-black/30 focus:border-[#8c52ff] rounded-md resize-none" rows={3} placeholder="Add any additional message..." />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button type="button" onClick={onClose} variant="outline" className="flex-1 border-gray-900 text-gray-700 hover:bg-black">Cancel</Button>
                    <Button type="button" onClick={() => setCurrentStep(2)} className="flex-1 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] hover:from-[#8676e9] hover:to-[#8c52ff] text-white font-semibold">
                      <div className="flex items-center space-x-2">
                        <FiChevronRight className="w-4 h-4" />
                        <span>Next</span>
                      </div>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Project Price</label>
                    <div className="relative p-3 pl-10 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900">₹</span>
                      <span className="font-medium text-gray-900">{parseFloat(formData.price || '0').toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Discount (%)</label>
                    <div className="relative p-3 pl-10 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"><RiDiscountPercentFill/></span>
                      <span className="font-medium text-gray-900">{formData.discount}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center"><span className="text-[#8c52ff] mr-2">₹</span>Price Summary</h3>
                    <div className="space-y-2 text-base">
                      <div className="flex justify-between"><span className="text-gray-600">Original Price:</span><span className="font-medium">₹{parseFloat(formData.price || '0').toLocaleString()}</span></div>
                      {formData.discount > 0 && (<div className="flex justify-between"><span className="text-gray-600">Discount ({formData.discount}%):</span><span className="text-[#ff914d] font-medium">-₹{((parseFloat(formData.price || '0') * formData.discount) / 100).toLocaleString()}</span></div>)}
                      <div className="flex justify-between pt-2 border-t border-gray-200"><span className="font-bold text-gray-800">Final Price:</span><span className="font-bold text-[#8c52ff] text-lg">₹{parseFloat(calculateFinalPrice()).toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button type="button" onClick={() => setCurrentStep(1)} variant="outline" className="flex-1 border-gray-900 text-gray-700 hover:bg-black" disabled={isSubmitting}>
                      <div className="flex items-center space-x-2">
                        <FiChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </div>
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] hover:from-[#8676e9] hover:to-[#8c52ff] text-white font-semibold">{isSubmitting ? (<div className="flex items-center space-x-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></div>) : (<div className="flex items-center space-x-2"><FiSend className="w-4 h-4" /><span>Send Confirmation</span></div>)}</Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
