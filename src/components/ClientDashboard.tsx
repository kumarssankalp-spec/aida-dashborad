import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiLogOut, FiDownload, FiEye, FiEyeOff, FiCheckCircle,
  FiPackage, FiTrendingUp, FiGlobe, FiMail, FiMapPin,
  FiCheck, FiClock, FiAlertCircle, FiImage, FiFileText,
  FiFile, FiSend, FiRefreshCw, FiExternalLink, FiChevronDown,
  FiChevronUp, FiStar, FiDollarSign, FiPercent, FiCopy
} from 'react-icons/fi';
import { FaFilePdf, FaFileImage, FaFileAlt, FaFileCode } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { getCurrentClient, logout } from '../config/auth';
import { getClientProject } from '../data/clientData';
import { getClientProgress, updateDeliverableStatus, addLiveUpdate, updateMilestoneStatus } from '../data/clientProgress';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ClientDashboardProps {
  onLogout: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  const currentClient = getCurrentClient();
  const [projectData, setProjectData] = useState(() => getClientProject(currentClient?.id || ''));
  const [progressData, setProgressData] = useState(() => getClientProgress(currentClient?.id || ''));
  const [requestForm, setRequestForm] = useState({
    name: currentClient?.name || '',
    email: currentClient?.email || '',
    company: currentClient?.company || '',
    message: ''
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentClient || !projectData || !progressData) {
      // Redirect to login if no data
      onLogout();
    }
  }, [currentClient, projectData, progressData, onLogout]);

  useEffect(() => {
    if (progressData && timelineRef.current && window.innerWidth < 768) {
      const currentIndex = progressData.milestones.findIndex(m => !m.completed);
      if (currentIndex >= 0) {
        const milestoneWidth = 128; // w-32
        const gap = 24; // space-x-6
        const scrollLeft = currentIndex * (milestoneWidth + gap);
        timelineRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [progressData]);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleDeliverableToggle = (deliverableName: string, completed: boolean) => {
    if (progressData) {
      updateDeliverableStatus(progressData.clientId, deliverableName, completed);
      setProgressData(getClientProgress(progressData.clientId));

      // Add live update
      addLiveUpdate(progressData.clientId, {
        message: `Deliverable "${deliverableName}" marked as ${completed ? 'completed' : 'pending'}`,
        type: completed ? 'success' : 'info'
      });
      setProgressData(getClientProgress(progressData.clientId));
    }
  };

  const handleMilestoneToggle = (milestoneId: string, completed: boolean) => {
    if (progressData) {
      updateMilestoneStatus(progressData.clientId, milestoneId, completed);
      setProgressData(getClientProgress(progressData.clientId));

      // Add live update
      addLiveUpdate(progressData.clientId, {
        message: `Milestone marked as ${completed ? 'completed' : 'pending'}`,
        type: completed ? 'success' : 'info'
      });
      setProgressData(getClientProgress(progressData.clientId));
    }
  };

  const handleDownloadAsset = (assetUrl: string, assetName: string) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = assetUrl;
    link.download = assetName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllAssets = () => {
    if (progressData) {
      progressData.assets.forEach(asset => {
        handleDownloadAsset(asset.url, asset.name);
      });
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRequest(true);

    try {
      const templateParams = {
        to_name: 'Aaida Corp Team',
        from_name: requestForm.name,
        from_email: requestForm.email,
        from_company: requestForm.company,
        message: requestForm.message,
        client_id: currentClient?.id,
        subject: 'Client Change Request'
      };

      await emailjs.send(
        'service_pipsr8c',
        'template_request_changes',
        templateParams,
        '3GTJZKfMSpZPaFgo1'
      );

      setRequestSuccess(true);
      setRequestForm(prev => ({ ...prev, message: '' }));

      // Add live update
      if (progressData) {
        addLiveUpdate(progressData.clientId, {
          message: 'Change request submitted successfully',
          type: 'success'
        });
        setProgressData(getClientProgress(progressData.clientId));
      }
    } catch (error) {
      console.error('Request submission error:', error);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (projectData?.invoice) {
      // Trigger download for the client's invoice
      const link = document.createElement('a');
      link.href = projectData.invoice.filePath;
      link.download = projectData.invoice.downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Invoice is not available yet. Please contact support if you believe this is an error.');
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image': return <FaFileImage className="w-5 h-5" />;
      case 'pdf': return <FaFilePdf className="w-5 h-5" />;
      case 'svg': return <FaFileCode className="w-5 h-5" />;
      case 'txt': return <FaFileAlt className="w-5 h-5" />;
      default: return <FiFile className="w-5 h-5" />;
    }
  };

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-600';
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'svg': return 'bg-purple-100 text-purple-600';
      case 'txt': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const progressChartData = progressData ? [
    { name: 'Frontend', value: progressData.progress.frontend.percentage, color: '#95aac9' },
    { name: 'Backend', value: progressData.progress.backend.percentage, color: '#d32777' },
    { name: 'SEO', value: progressData.progress.seo.percentage, color: '#e37335' }
  ] : [];

  const totalProgress = progressData ?
    (progressData.progress.frontend.percentage + progressData.progress.backend.percentage + progressData.progress.seo.percentage) / 3 : 0;

  const completedDeliverables = progressData?.deliverables.filter(d => d.completed).length || 0;
  const totalDeliverables = progressData?.deliverables.length || 0;

  if (!currentClient || !projectData || !progressData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading dashboard...</h2>
          <div className="w-8 h-8 border-2 border-[#95aac9] border-t-[#d32777] rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#95aac9]/10 via-white to-[#e37335]/10">
      {/* Header */}
      <motion.header
        className="bg-gradient-to-r from-[#95aac9]/20 via-[#d32777]/10 to-[#e37335]/20 backdrop-blur-md border-b border-white/30 p-4 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section: Logo and Company Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#95aac9] to-[#d32777] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {currentClient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#95aac9] to-[#d32777] bg-clip-text text-transparent">
                {currentClient.company}
              </h1>
              <div className="flex items-center space-x-3">
                <p className="text-sm text-gray-600">{currentClient.name}</p>
                <span className="text-gray-400">•</span>
                <div className="text-sm font-bold text-gray-800 px-2 py-1 bg-gray-100 rounded-md">
                  {(() => {
                    const dateStr = new Date().toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });
                    const parts = dateStr.split(' ');
                    return `${parts[0]} ${parts[1]} • ${parts[2]}`;
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Progress and Logout */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-gray-600">Overall Progress</div>
                <div className="flex items-center space-x-2">
                  <Progress value={totalProgress} className="w-16 h-2" />
                  <span className="text-sm font-medium text-gray-700">{Math.round(totalProgress)}%</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-white/30 border-white/40 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.main
        className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Project Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-white to-[#95aac9]/5 border border-[#95aac9]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{projectData.title}</h2>
                <Badge variant="secondary" className="bg-[#d32777]/10 text-[#d32777]">
                  {projectData.proposalDetails.projectType}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">{projectData.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#95aac9]/10 rounded-lg border-2 border-[#95aac9]/30">
                  <FiPackage className="w-6 h-6 text-[#95aac9] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#95aac9]">{completedDeliverables}/{totalDeliverables}</div>
                  <div className="text-sm text-gray-600">Deliverables</div>
                </div>
                <div className="p-4 bg-[#d32777]/10 rounded-lg border-2 border-[#d32777]/30">
                  <FiImage className="w-6 h-6 text-[#d32777] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#d32777]">{progressData.noAssets ? 0 : progressData.assets.length}</div>
                  <div className="text-sm text-gray-600">Assets</div>
                </div>
                <div className="p-4 bg-[#e37335]/10 rounded-lg border-2 border-[#e37335]/30">
                  <FiTrendingUp className="w-6 h-6 text-[#e37335] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#e37335]">{Math.round(totalProgress)}%</div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <FiDollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    ₹{(progressData.paymentTracking.paidAmount / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Paid</div>
                </div>
              </div>

              {/* Project Timeline */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <FiClock className="w-5 h-5 mr-2 text-[#95aac9]" />
                  Project Timeline
                </h3>
                <div className="relative">
                  {/* Background timeline line */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                  
                  {/* Progress timeline line */}
                  <motion.div
                    className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[#95aac9] via-[#d32777] to-[#e37335] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: Math.max(0, progressData.milestones.findIndex(m => !m.completed) / progressData.milestones.length)
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ transformOrigin: 'left' }}
                  />

                  {/* Timeline milestones - Responsive and informative */}
                  <div className="relative">
                    {/* Timeline milestones */}
                    <div ref={timelineRef} className="flex items-start z-10 overflow-x-auto scrollbar-hide md:overflow-visible pb-4 md:pb-0">
                      <div className="flex items-start space-x-6 md:space-x-8 lg:space-x-12 min-w-max md:min-w-0 px-4 md:px-0">
                        {progressData.milestones.map((milestone, index) => {
                          const isCompleted = milestone.completed;
                          const isCurrent = !isCompleted && index === progressData.milestones.findIndex(m => !m.completed);
                          const isUpcoming = !isCompleted && !isCurrent;
                          const completionDate = milestone.endDate;
                          const daysFromStart = Math.ceil((milestone.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                          // Calculate relative date for start date
                          const today = new Date();
                          const startDate = new Date(milestone.startDate);
                          const diffTime = startDate.getTime() - today.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                          let relativeStartDate = '';
                          if (diffDays === 0) {
                            relativeStartDate = 'Today';
                          } else if (diffDays === 1) {
                            relativeStartDate = 'Tomorrow';
                          } else if (diffDays === -1) {
                            relativeStartDate = 'Yesterday';
                          } else if (diffDays > 1) {
                            relativeStartDate = `In ${diffDays} days`;
                          } else {
                            relativeStartDate = `${Math.abs(diffDays)} days ago`;
                          }

                          return (
                            <motion.div
                              key={milestone.id}
                              className="flex flex-col items-center flex-shrink-0 w-32 md:w-40 lg:w-48 relative"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              {/* Milestone icon */}
                              <div
                                className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border-3 shadow-lg absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 flex items-center justify-center ${
                                  isCompleted
                                    ? 'bg-green-500 border-green-400 shadow-green-200'
                                    : isCurrent
                                    ? 'bg-[#95aac9] border-[#95aac9] shadow-blue-200 animate-pulse'
                                    : 'bg-gray-300 border-gray-300 shadow-gray-200'
                                }`}
                                style={{
                                  backgroundColor: isCompleted ? milestone.color : undefined,
                                  boxShadow: isCompleted ? `0 0 20px ${milestone.color}20` : undefined
                                }}
                              >
                                {isCompleted && <FiCheck className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />}
                                {isCurrent && <FiClock className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />}
                                {isUpcoming && <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-400 rounded-full"></div>}
                              </div>

                              {/* Milestone content */}
                              <div className="text-center w-full px-2 md:px-3 pt-16 md:pt-20">
                                <div className={`text-sm md:text-base lg:text-lg font-bold mb-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition-colors ${
                                  isCompleted
                                    ? 'text-green-700 bg-green-100'
                                    : isCurrent
                                    ? 'text-[#95aac9] bg-[#95aac9]/10'
                                    : 'text-gray-600 bg-gray-100'
                                }`}>
                                  {milestone.name}
                                </div>
                                {/* <div className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                                  Start: {relativeStartDate}
                                </div> */}
                                <div className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                                  Due: {completionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full border-2 ${
                                  isCompleted
                                    ? 'bg-green-100 text-green-800 border-green-500'
                                    : isCurrent
                                    ? 'bg-[#95aac9]/20 text-[#5a616b] border-[#95aac9]'
                                    : 'bg-gray-200 text-gray-600 border-gray-400'
                                }`}>
                                  {isCompleted ? 'completed' : isCurrent ? 'in progress' : 'pending'}
                                </div>
                                {daysFromStart >= 0 && !isCompleted && (
                                  <div className="text-xs md:text-sm text-gray-500 mt-1">
                                    Start: {relativeStartDate}
                                  </div>
                                )}
                                {daysFromStart < 0 && !isCompleted && (
                                  <div className="text-xs text-red-500 mt-1">
                                    {Math.abs(daysFromStart)} days overdue
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credentials */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <Card className="border border-[#95aac9]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiGlobe className="w-6 h-6 text-[#95aac9]" />
                    <h3 className="text-xl font-bold text-gray-800">All Credentials</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.credentials.map((credential, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 mb-1">{credential.siteTitle}</div>
                            <div className="text-sm text-[#95aac9] hover:underline cursor-pointer" onClick={() => window.open(credential.siteUrl, '_blank')}>
                              {credential.siteUrl}
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => window.open(credential.siteUrl, '_blank')}>
                            <FiExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
                            <div className="flex items-center space-x-2">
                              <Input
                                value={credential.username}
                                readOnly
                                className="text-sm bg-white"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigator.clipboard.writeText(credential.username)}
                                className="px-2"
                              >
                                <FiCopy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type={showPasswords[index] ? 'text' : 'password'}
                                value={credential.password}
                                readOnly
                                className="text-sm bg-white"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowPasswords(prev => ({ ...prev, [index]: !prev[index] }))}
                                className="px-2"
                              >
                                {showPasswords[index] ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigator.clipboard.writeText(credential.password)}
                                className="px-2"
                              >
                                <FiCopy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Updates */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border border-[#e37335]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiRefreshCw className="w-6 h-6 text-[#e37335]" />
                    <h3 className="text-xl font-bold text-gray-800">Live Updates</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {progressData.liveUpdates.map(update => (
                      <motion.div
                        key={update.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`p-3 rounded-lg border-l-4 ${
                          update.type === 'success' ? 'border-l-green-500 bg-green-50' :
                          update.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                          'border-l-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-1 rounded-full ${
                            update.type === 'success' ? 'bg-green-100' :
                            update.type === 'warning' ? 'bg-yellow-100' :
                            'bg-blue-100'
                          }`}>
                            {update.type === 'success' ? <FiCheckCircle className="w-4 h-4 text-green-600" /> :
                             update.type === 'warning' ? <FiAlertCircle className="w-4 h-4 text-yellow-600" /> :
                             <FiClock className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{update.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {update.timestamp.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + update.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border border-[#95aac9]/20">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('deliverables')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiCheckCircle className="w-6 h-6 text-[#95aac9]" />
                      <h3 className="text-xl font-bold text-gray-800">Deliverables</h3>
                    </div>
                    {expandedSections.deliverables ?
                      <FiChevronUp className="w-5 h-5" /> :
                      <FiChevronDown className="w-5 h-5" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.deliverables && (
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {progressData.deliverables
                        .sort((a, b) => {
                          // Completed deliverables first
                          if (a.completed && !b.completed) return -1;
                          if (!a.completed && b.completed) return 1;

                          // Among completed deliverables, premium first
                          if (a.completed && b.completed) {
                            if (a.isPremium && !b.isPremium) return -1;
                            if (!a.isPremium && b.isPremium) return 1;
                          }

                          // Among incomplete deliverables, premium first, then others
                          if (!a.completed && !b.completed) {
                            if (a.isPremium && !b.isPremium) return -1;
                            if (!a.isPremium && b.isPremium) return 1;
                          }

                          return 0;
                        })
                        .map((deliverable, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            deliverable.completed
                              ? deliverable.isPremium
                                ? 'bg-green-50 border-yellow-400'
                                : 'bg-green-50 border-green-200'
                              : deliverable.isPremium
                              ? 'bg-gray-50 border-yellow-400'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={deliverable.completed}
                              onChange={(e) => handleDeliverableToggle(deliverable.name, e.target.checked)}
                              className="w-4 h-4 text-[#95aac9] rounded focus:ring-[#95aac9]"
                              aria-label={`Mark ${deliverable.name} as ${deliverable.completed ? 'incomplete' : 'complete'}`}
                            />
                            <span className={`text-sm ${deliverable.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {deliverable.name}
                            </span>
                          </div>
                          {deliverable.isPremium && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                              Premium
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="border border-[#e37335]/20">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('milestones')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiClock className="w-6 h-6 text-[#e37335]" />
                      <h3 className="text-xl font-bold text-gray-800">Milestones</h3>
                    </div>
                    {expandedSections.milestones ?
                      <FiChevronUp className="w-5 h-5" /> :
                      <FiChevronDown className="w-5 h-5" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.milestones && (
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {progressData.milestones.map((milestone, index) => {
                        const isCompleted = milestone.completed;
                        const isCurrent = !isCompleted && index === progressData.milestones.findIndex(m => !m.completed);
                        const isUpcoming = !isCompleted && !isCurrent;

                        return (
                          <motion.div
                            key={milestone.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              milestone.completed
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={milestone.completed}
                                onChange={(e) => handleMilestoneToggle(milestone.id, e.target.checked)}
                                className="w-4 h-4 text-[#e37335] rounded focus:ring-[#e37335]"
                                aria-label={`Mark ${milestone.name} as ${milestone.completed ? 'incomplete' : 'complete'}`}
                              />
                              <div>
                                <span className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                  {milestone.name}
                                </span>
                                <div className="text-xs text-gray-500">
                                  {milestone.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full border-2"
                                style={{ backgroundColor: milestone.completed ? milestone.color : 'transparent', borderColor: milestone.color }}
                              ></div>
                              <Badge variant="outline" className="text-xs">
                                {isCompleted ? 'completed' : isCurrent ? 'in progress' : 'pending'}
                              </Badge>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Assets */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border border-[#d32777]/20">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('assets')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiImage className="w-6 h-6 text-[#d32777]" />
                      <h3 className="text-xl font-bold text-gray-800">Assets</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={handleDownloadAllAssets}
                        disabled={progressData.noAssets}
                        className={`bg-[#d32777] hover:bg-[#d32777]/80 ${progressData.noAssets ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FiDownload className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                      {expandedSections.assets ?
                        <FiChevronUp className="w-5 h-5" /> :
                        <FiChevronDown className="w-5 h-5" />
                      }
                    </div>
                  </div>
                </CardHeader>
                {expandedSections.assets && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent>
                        {progressData.noAssets ? (
                          <div className="text-center py-8 text-gray-500">
                            <FiImage className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No assets available</p>
                            <p className="text-sm">Assets will be uploaded once the project is ready.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {['image', 'pdf', 'svg', 'txt', 'other'].map(type => {
                              const typeAssets = progressData.assets.filter(asset => asset.type === type);
                              if (typeAssets.length === 0) return null;

                              return (
                                <div key={type}>
                                  <h4 className="text-lg font-semibold text-gray-700 mb-3 capitalize flex items-center">
                                    {getAssetIcon(type)}
                                    <span className="ml-2">{type}s ({typeAssets.length})</span>
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {typeAssets.map(asset => (
                                      <motion.div
                                        key={asset.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                        whileHover={{ scale: 1.02 }}
                                      >
                                        <div className="flex items-center space-x-3">
                                          <div className={`p-2 rounded-lg ${getAssetTypeColor(asset.type)}`}>
                                            {getAssetIcon(asset.type)}
                                          </div>
                                          <div>
                                            <div className="font-medium text-gray-800">{asset.name}</div>
                                            <div className="text-sm text-gray-500">
                                              {(asset.size / 1024).toFixed(1)} KB • {asset.uploadedAt.toLocaleDateString()}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex space-x-2">
                                          <Button size="sm" variant="outline" onClick={() => window.open(asset.url, '_blank')}>
                                            <FiEye className="w-4 h-4" />
                                          </Button>
                                          <Button size="sm" onClick={() => handleDownloadAsset(asset.url, asset.name)}>
                                            <FiDownload className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  </AnimatePresence>
                )}
              </Card>
            </motion.div>

            {/* Progress Charts */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border border-[#e37335]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiTrendingUp className="w-6 h-6 text-[#e37335]" />
                    <h3 className="text-xl font-bold text-gray-800">Progress Tracking</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 mb-4">Progress Overview</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={progressChartData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip />
                          <Bar dataKey="value">
                            {progressChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 mb-4">Current Status</h4>
                      <div className="space-y-4">
                        {Object.entries(progressData.progress).map(([key, item]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{item.name}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Special Requests */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border border-[#95aac9]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiStar className="w-6 h-6 text-[#95aac9]" />
                    <h3 className="text-xl font-bold text-gray-800">Special Requests</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {progressData.specialRequests.map(request => (
                      <div key={request.id} className="p-6 bg-gray-50 rounded-lg border min-h-[120px] flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-sm font-medium text-gray-700 line-clamp-3 leading-relaxed">{request.request}</span>
                          <Badge
                            variant={request.status === 'completed' ? 'default' : request.status === 'in-progress' ? 'secondary' : 'outline'}
                            className={
                              request.status === 'completed' ? 'bg-green-100 text-green-800' :
                              request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-auto">
                          Updated: {request.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Project Details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border border-[#95aac9]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiGlobe className="w-6 h-6 text-[#95aac9]" />
                    <h3 className="text-xl font-bold text-gray-800">Project Details</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Domain</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-medium">{progressData.projectDetails.domain}</span>
                      <FiExternalLink className="w-4 h-4 text-[#95aac9]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Domain Provider</label>
                    <p className="font-medium mt-1">{progressData.projectDetails.domainProvider}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-[#95aac9] text-[#95aac9] hover:bg-[#95aac9] hover:text-white"
                    onClick={() => window.open(progressData.projectDetails.adminDashboardLink, '_blank')}
                  >
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Client Info & Payment */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border border-[#d32777]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiUser className="w-6 h-6 text-[#d32777]" />
                    <h3 className="text-xl font-bold text-gray-800">Client Info</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-[#95aac9]/10 to-[#d32777]/10 p-6 rounded-xl text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#95aac9] to-[#d32777] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white font-bold text-2xl">
                        {currentClient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg">{currentClient.name}</h4>
                    <p className="text-gray-600 text-sm">{currentClient.company}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#95aac9]/5 to-[#d32777]/5 p-6 rounded-xl border border-gray-200 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        <FiDollarSign className="w-5 h-5 mr-2 text-[#d32777]" />
                        Payment Progress
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#d32777]">₹{progressData.paymentTracking.totalAmount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Total Amount</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Paid: ₹{progressData.paymentTracking.paidAmount.toLocaleString()}</span>
                      <span>{Math.round((progressData.paymentTracking.paidAmount / progressData.paymentTracking.totalAmount) * 100)}% Paid</span>
                    </div>
                    <Progress
                      value={(progressData.paymentTracking.paidAmount / progressData.paymentTracking.totalAmount) * 100}
                      className="h-5 bg-gray-200 rounded-full"
                    />
                    <div className="flex justify-center pt-2">
                      <Button
                        onClick={handleDownloadInvoice}
                        variant="outline"
                        size="sm"
                        className="bg-white border-[#d32777] text-[#d32777] hover:bg-[#d32777] hover:text-white transition-all duration-200"
                      >
                        <FiDownload className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                    </div>
                  </div>

                  {/* Show Payment Breakdown */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-700">Payment Breakdown</h4>
                      <Button
                        onClick={() => setShowPaymentBreakdown(!showPaymentBreakdown)}
                        variant="outline"
                        size="sm"
                        className="text-[#d32777] border-[#d32777] hover:bg-[#d32777] hover:text-white"
                      >
                        {showPaymentBreakdown ? 'Hide' : 'Show'} Breakdown
                      </Button>
                    </div>
                    <AnimatePresence>
                      {showPaymentBreakdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {progressData.paymentTracking.breakdown.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="py-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{item.description}</span>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    item.status === 'paid' ? 'bg-green-100 text-green-800' :
                                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.date.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#d32777]">
                                  ₹{item.amount.toLocaleString()}
                                </div>
                              </div>
                            </div>
{item.showBreakdown ? (
                                <div className="space-y-2">
                                  {item.deliverables.map((deliverable, delIndex) => (
                                    <motion.div
                                      key={delIndex}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: (index * 0.05) + (delIndex * 0.02), duration: 0.2 }}
                                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border-l-2 border-[#95aac9]"
                                    >
                                      <div className="flex-1">
                                        <span className="text-sm font-medium text-gray-800">{deliverable.name}</span>
                                        {deliverable.free && (
                                          <div className="text-xs mt-1" style={{color: '#10b981', fontWeight: '600'}}>
                                            Included in the package (No charge to you)
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {deliverable.free ? (
                                          <Badge variant="outline" className="text-green-600 border-green-400 bg-green-50" title="This deliverable is free and not chargeable to you">
                                            ₹{deliverable.amount.toLocaleString()} (Free)
                                          </Badge>
                                        ) : (
                                          <span className="text-sm font-semibold text-yellow-600">
                                            ₹{deliverable.amount.toLocaleString()}
                                          </span>
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <FiClock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                  <p className="text-sm text-blue-800 font-medium">
                                    Breakdown will be available after the due date or when payment is completed
                                  </p>
                                  <p className="text-xs text-blue-600 mt-1">
                                    Due: {item.date.toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </p>
                                </div>
                              )}
<div className="border-b border-red-500 border-dashed mt-6"></div>
                          </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Site Preview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border border-[#e37335]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiEye className="w-6 h-6 text-[#e37335]" />
                    <h3 className="text-xl font-bold text-gray-800">Site Preview</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center text-gray-400 text-lg font-semibold">
                    {progressData.sitePreview.thumbnailUrl ? (
                      <img
                        src={progressData.sitePreview.thumbnailUrl}
                        alt="Site Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div>No preview available</div>
                    )}
                  </div>
                {!progressData.sitePreview.isEnabled && (
                  <div className="text-center p-4 bg-yellow-100 rounded-md text-yellow-800 font-semibold mb-3">
                    Site is under development. We will notify you when it's live.
                  </div>
                )}
                <Button
                  className={`w-full ${progressData.sitePreview.isEnabled ? 'bg-[#e37335] hover:bg-[#e37335]/80' : 'bg-gray-300  text-black cursor-not-allowed'}`}
                  onClick={() => {
                    if (progressData.sitePreview.isEnabled && progressData.sitePreview.liveUrl) {
                      window.open(progressData.sitePreview.liveUrl, '_blank');
                    }
                  }}
                  disabled={!progressData.sitePreview.isEnabled}
                >
                  <FiExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Special Requests Payment */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="border border-[#d32777]/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FiDollarSign className="w-6 h-6 text-[#d32777]" />
                    <h3 className="text-xl font-bold text-gray-800">Special Requests Payment</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.specialRequests.map(request => (
                      <div key={request.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 mb-1">{request.request}</div>
                            <div className="text-sm text-gray-600">Service: {request.service || 'Custom Development'}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="font-bold text-[#d32777]">₹{request.amount || '5,000'}</div>
                              <Badge
                                variant={request.paymentStatus === 'paid' ? 'default' : 'outline'}
                                className={
                                  request.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {request.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Updated: {request.updatedAt.toLocaleDateString()}</span>
                          <Badge
                            variant={request.status === 'completed' ? 'default' : request.status === 'in-progress' ? 'secondary' : 'outline'}
                            className={
                              request.status === 'completed' ? 'bg-green-100 text-green-800' :
                              request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                           <span>Task:⠀</span> {request.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* Completion Services */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border border-[#95aac9]/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FiCheck className="w-6 h-6 text-[#95aac9]" />
                <h3 className="text-xl font-bold text-gray-800">Completion Services</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {progressData.completionServices.map(service => (
                  <motion.div
                    key={service.id}
                    className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    style={{ borderLeftColor: '#3b82f6', borderLeftWidth: '4px' }}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Request Changes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border border-[#d32777]/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FiMail className="w-6 h-6 text-[#d32777]" />
                <h3 className="text-xl font-bold text-gray-800">Request Changes</h3>
              </div>
            </CardHeader>
            <CardContent>
              {requestSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Request Sent!</h4>
                  <p className="text-gray-600">We'll review your request and get back to you soon.</p>
                  <Button
                    onClick={() => setRequestSuccess(false)}
                    className="mt-4"
                    variant="outline"
                  >
                    Send Another Request
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Input
                        value={requestForm.name}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <Input
                      value={requestForm.company}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea
                      value={requestForm.message}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe the changes you need..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmittingRequest}
                    className="w-full bg-[#d32777] hover:bg-[#d32777]/80"
                  >
                    {isSubmittingRequest ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 mr-2" />
                        Send Request
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default ClientDashboard;
