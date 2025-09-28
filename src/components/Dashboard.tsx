import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser, FiLogOut, FiArrowRight, FiExternalLink,
  FiStar, FiTrendingUp, FiPackage, FiCalendar, 
  FiTarget, FiGlobe, FiImage, FiCheckCircle, 
  FiMail, FiMapPin, FiCheck
} from 'react-icons/fi';
import { RiDiscountPercentFill } from "react-icons/ri";
import { getCurrentClient, logout } from '../config/auth';
import { getClientProject } from '../data/clientData';
import ConfirmationModal from './ConfirmationModal';
import { Button } from './ui/button';
import { PiDogBold } from "react-icons/pi";
import { Card, CardHeader, CardContent } from './ui/card';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const currentClient = getCurrentClient();
  const [projectData, setProjectData] = useState(() => getClientProject(currentClient?.id || ''));
  const [selectedDesignIds, setSelectedDesignIds] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (projectData) setSelectedDesignIds(projectData.selectedDesigns || []);
  }, [projectData]);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const toggleDesignSelection = (designId: string) => {
    setSelectedDesignIds(prev => (prev.includes(designId) ? prev.filter(id => id !== designId) : [...prev, designId]));
  };

  const getClientInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  if (!currentClient || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No project data found</h2>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8e9f7] via-white to-[#8676e9]/20 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-[#8c52ff]/10 to-[#ff914d]/10 moving-shadow" />
        <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#c8e9f7]/20 to-[#8676e9]/20 pulse-icon" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-[#ff914d]/15 to-[#8c52ff]/15 animate-pulse" />
      </div>

      <motion.header
        className="bg-gradient-to-r from-[#8c52ff]/10 via-[#8676e9]/15 to-[#c8e9f7]/10 backdrop-blur-md border-b border-white/30 p-4 sm:p-6 sticky top-0 z-50 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#8c52ff] to-[#8676e9] text-white text-xl font-bold flex items-center justify-center shadow-md">
              {getClientInitials(currentClient.name)}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#8c52ff] to-[#8676e9] bg-clip-text text-transparent">Welcome, {currentClient.name}</h1>
              <p className="text-sm sm:text-base text-gray-700 font-medium">{currentClient.company} • Project Dashboard</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/30 border-white/40 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 shadow-sm"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.header>

      <motion.main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.section variants={cardVariants}>
          <Card className="bg-gradient-to-br from-[#c8e9f7]/20 to-[#8676e9]/20 backdrop-blur-sm border border-white/30 moving-shadow">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] rounded-full flex items-center justify-center shadow-lg">
                    <PiDogBold  className="w-8 h-8 text-white pulse-icon" />
                  </div>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#8c52ff] to-[#8676e9] bg-clip-text text-transparent mb-4">{projectData.title}</h2>
                <p className="text-lg sm:text-xl text-gray-700 font-semibold">{projectData.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section variants={cardVariants}>
          <Card className="glassmorphism-card moving-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#8676e9] to-[#c8e9f7] flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Project Requirements</h3>
                  <p className="text-gray-600">Key deliverables and specifications</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectData.requirements.map((requirement, index) => (
                  <motion.div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#8676e9]/10 to-[#c8e9f7]/10 border border-[#8676e9]/30 shadow-sm" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                    <div className="w-8 h-8 bg-gradient-to-r from-[#8676e9] to-[#c8e9f7] rounded-full flex items-center justify-center shadow-md">
                      <FiArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section variants={cardVariants}>
          <Card className="glassmorphism-card moving-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff914d] to-[#8c52ff] flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Competitor Analysis</h3>
                  <p className="text-gray-600">Market research and competitive landscape</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectData.competitors.map((competitor, index) => (
                  <motion.div key={index} className="group p-6 rounded-xl bg-white/40 border border-white/30 hover:bg-white/60 transition-all duration-300 moving-shadow" whileHover={{ y: -5, scale: 1.02 }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.2 }}>
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-lg text-gray-800">{competitor.name}</h4>
                      <FiExternalLink className="w-5 h-5 text-[#8c52ff] opacity-0 group-hover:opacity-100 transition-opacity pulse-icon" />
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{competitor.description}</p>
                    <Button variant="outline" size="sm" className="w-full border-[#8c52ff]/30 text-[#8c52ff] hover:bg-[#8c52ff] hover:text-white" onClick={() => window.open(competitor.url, '_blank')}>
                      Visit Site <FiArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section variants={cardVariants}>
          <Card className="glassmorphism-card moving-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#c8e9f7] to-[#8676e9] flex items-center justify-center">
                  <FiImage className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Design Options</h3>
                  <p className="text-gray-600">Explore different design directions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {projectData.designs.map((design, index) => (
                  <motion.div key={design.id} className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    design.isPremium ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200' : selectedDesignIds.includes(design.id) ? 'border-[#8c52ff] bg-white/50' : 'border-white/30 bg-white/20 hover:border-white/50'
                  }`} onClick={() => toggleDesignSelection(design.id)} whileHover={{ scale: 1.05, y: -5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <div className="relative aspect-video">
                      {imageErrors[design.id] ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#8c52ff]/20 to-[#8676e9]/20 flex items-center justify-center">
                          <FiImage className="w-12 h-12 text-[#8c52ff] opacity-50" />
                        </div>
                      ) : (
                        <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={() => handleImageError(design.id)} />
                      )}
                      {design.isPremium && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Premium
                        </div>
                      )}
                      {selectedDesignIds.includes(design.id) && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#8c52ff] rounded-full flex items-center justify-center">
                          <FiCheck className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2">{design.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{design.description}</p>
                      {design.link && (
                        <Button variant="outline" size="sm" className="w-full border-[#8c52ff]/30 text-[#8c52ff] hover:bg-[#8c52ff] hover:text-white" onClick={(e) => { e.stopPropagation(); window.open(design.link, '_blank'); }}>
                          View Design <FiExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {selectedDesignIds.length > 0 && (
          <motion.section variants={cardVariants}>
            <Card className="glassmorphism-card moving-shadow border-[#8c52ff]/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#8c52ff] to-[#ff914d] flex items-center justify-center">
                    <FiStar className="w-6 h-6 text-white pulse-icon" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Selected Designs</h3>
                    <p className="text-gray-600">Your preferred design directions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedDesignIds.map((designId) => {
                    const design = projectData.designs.find(d => d.id === designId);
                    if (!design) return null;

                    return (
                      <motion.div key={designId} className={`p-4 rounded-xl border relative overflow-hidden ${
                        design.isPremium ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400' : 'bg-gradient-to-br from-white/50 to-[#8c52ff]/10 border-[#8c52ff]/30'
                      }`} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                        {design.isPremium && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                            Premium
                          </div>
                        )}
                        <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
                          {imageErrors[design.id] ? (
                            <div className="w-full h-full bg-gradient-to-br from-[#8c52ff]/20 to-[#8676e9]/20 flex items-center justify-center">
                              <FiImage className="w-8 h-8 text-[#8c52ff] opacity-50" />
                            </div>
                          ) : (
                            <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover" onError={() => handleImageError(design.id)} />
                          )}
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            design.isPremium ? 'bg-yellow-500' : 'bg-[#8c52ff]'
                          }`}>
                            <FiCheck className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-800">{design.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{design.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        <motion.section variants={cardVariants}>
          <Card className="glassmorphism-card moving-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff914d] to-[#c8e9f7] flex items-center justify-center">
                  <FiPackage className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Proposal Details</h3>
                  <p className="text-gray-600">Project scope, timeline, and pricing</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-white/30 border border-white/20">
                  <FiGlobe className="w-10 h-10 text-[#8c52ff] mx-auto mb-3 pulse-icon" />
                  <p className="text-sm text-gray-600 mb-1">Project Type</p>
                  <p className="font-bold text-gray-800">{projectData.proposalDetails.projectType}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/30 border border-white/20">
                  <FiCalendar className="w-10 h-10 text-[#ff914d] mx-auto mb-3 pulse-icon" />
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="font-bold text-gray-800">{projectData.proposalDetails.timeline}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/30 border border-white/20">
                  <div className="w-10 h-10 text-[#8676e9] mx-auto mb-3 pulse-icon flex items-center justify-center text-2xl font-bold">₹</div>
                  <p className="text-sm text-gray-600 mb-1">Budget</p>
                  <p className="font-bold text-gray-800">{projectData.proposalDetails.budget.replace('$', '₹')}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white/30 border border-white/20">
                  <RiDiscountPercentFill className="w-10 h-10 text-[#099dc2] mx-auto mb-3 pulse-icon" />
                  <p className="text-sm text-gray-600 mb-1">Discount</p>
                  <p className="font-bold text-gray-800">{projectData.proposalDetails.discount ? `${projectData.proposalDetails.discount}%` : 'None'}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FiCheck className="w-5 h-5 text-[#8c52ff] mr-2" />
                  Included Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectData.proposalDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#099dc2]/10 to-[#c8e9f7]/10 border border-[#099dc2]/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#099dc2] to-[#c8e9f7] rounded-full flex items-center justify-center">
                        <FiCheck className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FiTarget className="w-5 h-5 text-[#8c52ff] mr-2" />
                  Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectData.proposalDetails.deliverables.map((deliverable, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                      deliverable.isPremium
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400'
                        : 'bg-white/20 border-black/30'
                    }`}>
                      <span className="text-gray-700 font-medium">{index + 1}. {deliverable.name}</span>
                      {deliverable.isPremium && (
                        <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Premium
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FiStar className="w-5 h-5 text-[#8c52ff] mr-2" />
                  Special Requests
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectData.proposalDetails.specialRequests.map((request, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-[#ff914d]/10 to-[#8c52ff]/10 border border-[#ff914d]/30">
                      <p className="text-gray-700 font-medium">{request}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#8c52ff]/10 to-[#8676e9]/10 border border-[#8c52ff]/30">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#8c52ff] to-[#8676e9] rounded-full flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{currentClient.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#ff914d]/10 to-[#8c52ff]/10 border border-[#ff914d]/30">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#ff914d] to-[#8c52ff] rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="font-medium text-gray-800">{currentClient.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#8676e9]/10 to-[#c8e9f7]/10 border border-[#8676e9]/30">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#8676e9] to-[#c8e9f7] rounded-full flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Company</p>
                    <p className="font-medium text-gray-800">{currentClient.company}</p>
                  </div>
                </div>
              </div>

              <motion.div className="text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => setShowConfirmation(true)} size="lg" className="bg-gradient-to-r from-[#8c52ff] to-[#8676e9] hover:from-[#8676e9] hover:to-[#8c52ff] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 moving-shadow">
                  <FiCheckCircle className="w-6 h-6 mr-3" />
                  Confirm Proposal
                  <FiArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.main>

      {showConfirmation && (
        <ConfirmationModal onClose={() => setShowConfirmation(false)} clientData={{ name: currentClient.name, email: currentClient.email, price: projectData.proposalDetails.budget, discount: projectData.proposalDetails.discount, company: currentClient.company }} />
      )}
    </div>
  );
};

export default Dashboard;
