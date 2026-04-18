import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  const recentItemLifetime = 25000; // 25 seconds before an item expires
  const maxRecentItems = 6; // cap to avoid overflow if expiration is delayed

  // State for managing recent jobs
  const [recentJobs, setRecentJobs] = useState([
    { id: 1, title: "Data Runner - Steel District Archives", sector: "Transport", level: "NORMAL", createdAt: Date.now() },
    { id: 2, title: "Power Grid Emergency Repair - Sector 7", sector: "Engineering", level: "CRITICAL", createdAt: Date.now() },
    { id: 3, title: "Neural Interface Calibration Technician", sector: "Engineering", level: "HIGH", createdAt: Date.now() }
  ]);

  // State for managing recent trades
  const [recentTrades, setRecentTrades] = useState([
    { id: 1, title: "Rare Isotope Fuel Cell - 3 units", type: "physical", status: "AVAILABLE", createdAt: Date.now() },
    { id: 2, title: "Military-Grade Encryption Module v7.3", type: "physical", status: "AVAILABLE", createdAt: Date.now() }
  ]);

  const activeJobs = recentJobs.length;
  const activeTrades = recentTrades.length;
  const criticalAlerts = recentJobs.filter(job => job.level === 'CRITICAL').length;
  const criticalAlertMessage = criticalAlerts > 0
    ? `CRITICAL: ${recentJobs.find(job => job.level === 'CRITICAL')?.title ?? 'Immediate action required.'}`
    : 'No active critical city alerts at this time.';

  // State for user credits, reputation, and completed success metrics
  const [credits, setCredits] = useState(100);
  const [reputation, setReputation] = useState(100);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [completedTrades, setCompletedTrades] = useState(0);

  // Job templates for random generation
  const jobTemplates = [
    { title: "Data Courier - Central Hub Transfer", sector: "Transport", level: "NORMAL" },
    { title: "Security Patrol - Sector 3 Perimeter", sector: "Security", level: "NORMAL" },
    { title: "Waste Processing Technician", sector: "Environmental", level: "HIGH" },
    { title: "Circuit Board Assembly - Factory Line", sector: "Manufacturing", level: "NORMAL" },
    { title: "Emergency Medical Response", sector: "Medical", level: "CRITICAL" },
    { title: "Drone Maintenance Specialist", sector: "Engineering", level: "HIGH" },
    { title: "Food Distribution Coordinator", sector: "Logistics", level: "NORMAL" },
    { title: "Power Grid Monitoring", sector: "Engineering", level: "HIGH" },
    { title: "Surveillance System Calibration", sector: "Security", level: "NORMAL" },
    { title: "Bio-waste Containment", sector: "Environmental", level: "CRITICAL" }
  ];

  // Trade templates for random generation
  const tradeTemplates = [
    { title: "Neural Implant Processor - High Grade", type: "physical", status: "AVAILABLE" },
    { title: "Quantum Data Crystal - 500TB Storage", type: "digital", status: "AVAILABLE" },
    { title: "Bio-Engineered Nutrient Paste - 50kg", type: "physical", status: "AVAILABLE" },
    { title: "Holographic Display Matrix - 8K Resolution", type: "physical", status: "AVAILABLE" },
    { title: "AI Personality Core - Learning Algorithm", type: "digital", status: "AVAILABLE" },
    { title: "Plasma Conduit - Industrial Grade", type: "physical", status: "AVAILABLE" },
    { title: "Cybernetic Enhancement Kit - Basic", type: "physical", status: "AVAILABLE" },
    { title: "Encrypted Communication Protocol - v9.2", type: "digital", status: "AVAILABLE" },
    { title: "Nanobot Swarm - Medical Grade", type: "physical", status: "AVAILABLE" },
    { title: "Virtual Reality Construct - Custom Build", type: "digital", status: "AVAILABLE" }
  ];

  // State for managing activity feed
  const [activityFeed, setActivityFeed] = useState([
    { user: "admin_steele", action: "Listed trade: Rare Isotope Fuel Cell - 3 units", time: "12:13 AM" },
    { user: "admin_steele", action: "Posted job: Data Runner - Steel District Archives", time: "12:13 AM" }
  ]);

  // Function to add a new random job or trade
  const addRandomContent = () => {
    const now = Date.now();
    const timeString = new Date(now).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    const shouldAddJob = Math.random() > 0.5;

    if (shouldAddJob) {
      const randomJob = jobTemplates[Math.floor(Math.random() * jobTemplates.length)];
      const newJob = {
        id: now + Math.random(),
        title: randomJob.title,
        sector: randomJob.sector,
        level: randomJob.level,
        createdAt: now
      };

      setRecentJobs(prevJobs => [newJob, ...prevJobs].slice(0, maxRecentItems));
      setActivityFeed(prevFeed => [
        {
          user: "system_auto",
          action: `Posted job: ${randomJob.title}`,
          time: timeString
        },
        ...prevFeed
      ].slice(0, 5));
    } else {
      const randomTrade = tradeTemplates[Math.floor(Math.random() * tradeTemplates.length)];
      const newTrade = {
        id: now + Math.random() * 2,
        title: randomTrade.title,
        type: randomTrade.type,
        status: randomTrade.status,
        createdAt: now
      };

      setRecentTrades(prevTrades => [newTrade, ...prevTrades].slice(0, maxRecentItems));
      setActivityFeed(prevFeed => [
        {
          user: "system_auto",
          action: `Listed trade: ${randomTrade.title}`,
          time: timeString
        },
        ...prevFeed
      ].slice(0, 5));
    }
  };

  // Auto-add new jobs and trades every 10 seconds
  useEffect(() => {
    const interval = setInterval(addRandomContent, 10000); // 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Auto-remove expired recent jobs and trades
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setRecentJobs(prev => prev.filter(item => now - item.createdAt < recentItemLifetime));
      setRecentTrades(prev => prev.filter(item => now - item.createdAt < recentItemLifetime));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Outlet context={{
      recentJobs,
      recentTrades,
      activityFeed,
      activeJobs,
      activeTrades,
      criticalAlerts,
      criticalAlertMessage,
      credits,
      reputation,
      completedJobs,
      completedTrades,
      setCredits,
      setReputation,
      setCompletedJobs,
      setCompletedTrades,
      setRecentJobs,
      setRecentTrades
    }} />
  )
}

export default Layout