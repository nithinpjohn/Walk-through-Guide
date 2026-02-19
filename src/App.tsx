import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, Users, Settings, HelpCircle, LayoutGrid as Layout, TrendingUp, DollarSign, Activity, Bell, Search, Filter, Download, Eye, ArrowUp, ArrowDown } from 'lucide-react';

function App() {
  const [runTour, setRunTour] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartType, setChartType] = useState('area');

  const steps = [
    {
      target: '.dashboard-header',
      content: 'Welcome to your Analytics Dashboard! This is your command center for all business insights.',
      placement: 'bottom' as const,
    },
    {
      target: '.stats-section',
      content: 'Monitor your key performance indicators with real-time updates and trend analysis.',
      placement: 'bottom' as const,
    },
    {
      target: '.chart-section',
      content: 'Dive deep into your data with interactive charts and customizable time ranges.',
      placement: 'top' as const,
    },
    {
      target: '.activity-feed',
      content: 'Stay updated with recent activities and important notifications.',
      placement: 'left' as const,
    },
    {
      target: '.settings-section',
      content: 'Customize your dashboard experience and manage your preferences.',
      placement: 'left' as const,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'vs last month'
    },
    {
      title: 'Active Users',
      value: '23,456',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'vs last month'
    },
    {
      title: 'Page Views',
      value: '892,341',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'vs last month'
    }
  ];

  const activities = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { action: 'Payment received', time: '5 minutes ago', type: 'payment' },
    { action: 'Report generated', time: '12 minutes ago', type: 'report' },
    { action: 'System backup completed', time: '1 hour ago', type: 'system' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, users: 2400, conversion: 2.4 },
    { month: 'Feb', revenue: 52000, users: 2800, conversion: 2.8 },
    { month: 'Mar', revenue: 48000, users: 2600, conversion: 2.2 },
    { month: 'Apr', revenue: 61000, users: 3200, conversion: 3.1 },
    { month: 'May', revenue: 55000, users: 2900, conversion: 2.7 },
    { month: 'Jun', revenue: 67000, users: 3500, conversion: 3.4 },
    { month: 'Jul', revenue: 71000, users: 3800, conversion: 3.6 },
    { month: 'Aug', revenue: 69000, users: 3600, conversion: 3.3 },
    { month: 'Sep', revenue: 78000, users: 4100, conversion: 3.8 },
    { month: 'Oct', revenue: 82000, users: 4300, conversion: 4.1 },
    { month: 'Nov', revenue: 89000, users: 4600, conversion: 4.4 },
    { month: 'Dec', revenue: 95000, users: 4900, conversion: 4.7 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <p className="font-semibold text-gray-900 mb-2">{`${label} 2024`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'revenue' && `Revenue: $${entry.value.toLocaleString()}`}
              {entry.name === 'users' && `Users: ${entry.value.toLocaleString()}`}
              {entry.name === 'conversion' && `Conversion: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: revenueData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              name="revenue"
            />
          </AreaChart>
        );
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2, fill: '#fff' }}
              name="revenue"
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill="#4F46E5"
              radius={[4, 4, 0, 0]}
              name="revenue"
            />
          </BarChart>
        );
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            zIndex: 1000,
            borderRadius: 12,
          },
          tooltip: {
            borderRadius: 12,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
          tooltipContent: {
            padding: '16px 20px',
          },
          buttonNext: {
            borderRadius: 8,
            padding: '8px 16px',
          },
          buttonBack: {
            borderRadius: 8,
            padding: '8px 16px',
          },
          buttonSkip: {
            borderRadius: 8,
            padding: '8px 16px',
          },
        }}
      />
      
      {/* Header */}
      <motion.header 
        className="dashboard-header bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 px-6 py-4 sticky top-0 z-40"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Analytics Pro
              </h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-1">
              {['overview', 'analytics', 'reports'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative hidden sm:block"
              whileHover={{ scale: 1.02 }}
            >
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
            
            <motion.button
              onClick={() => setRunTour(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Tour</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h2>
            <p className="text-gray-600">Here's what's happening with your business today.</p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="stats-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <motion.div 
              variants={itemVariants}
              className="chart-section lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Revenue Analytics</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 mr-2">
                    {['area', 'line', 'bar'].map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                          chartType === type
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <motion.div
                className="h-80"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </motion.div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Monthly Growth</p>
                  <p className="text-lg font-bold text-indigo-600">+12.5%</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <p className="text-sm text-gray-600">Best Month</p>
                  <p className="text-lg font-bold text-emerald-600">December</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-orange-600">$792K</p>
                </div>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div 
              variants={itemVariants}
              className="activity-feed bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-emerald-500' :
                        activity.type === 'report' ? 'bg-purple-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Settings Section */}
          <motion.div 
            variants={itemVariants}
            className="settings-section bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Dashboard Preferences</h3>
                <p className="text-sm text-gray-600">Customize your dashboard experience</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Email Notifications', description: 'Receive updates via email', enabled: true },
                { label: 'Dark Mode', description: 'Switch to dark theme', enabled: false },
                { label: 'Auto Refresh', description: 'Automatically refresh data', enabled: true },
                { label: 'Sound Alerts', description: 'Play sounds for notifications', enabled: false },
              ].map((setting, index) => (
                <motion.div
                  key={setting.label}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <motion.button
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      setting.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        setting.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                      layout
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;