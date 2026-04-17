import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Droplets, 
  Leaf, 
  BarChart2, 
  Sprout, 
  ChevronRight, 
  Send, 
  RefreshCcw, 
  AlertCircle,
  Database,
  Activity,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODELS } from './constants';
import './App.css';

const IconMap = {
  Droplets,
  Leaf,
  BarChart2,
  Sprout
};

const BiolumePulse = () => (
  <div className="biolume-wrapper">
    <motion.div 
      className="biolume-orb orb-1"
      animate={{
        scale: [1, 1.1, 0.9, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 20, -20, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="biolume-orb orb-2"
      animate={{
        scale: [1.2, 1, 1.3, 1.2],
        opacity: [0.1, 0.3, 0.1],
        y: [0, -40, 40, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const DataStream = () => (
  <div className="data-stream-container">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="data-column"
        initial={{ y: -1000 }}
        animate={{ y: 2000 }}
        transition={{
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * -20
        }}
        style={{ left: `${i * 5}%`, opacity: 0.1 + Math.random() * 0.2 }}
      >
        {[...Array(30)].map((_, j) => (
          <div key={j} className="data-bit">
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </motion.div>
    ))}
  </div>
);

const LandingPage = ({ onEnter }) => (
  <div className="landing-root">
    <BiolumePulse />
    <DataStream />
    <div className="landing-content">
      <div className="landing-corner c1" />
      <div className="landing-corner c2" />
      <div className="landing-corner c3" />
      <div className="landing-corner c4" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="landing-hero"
      >
        <div className="scan-line-overlay" />
        <div className="landing-logo-container">
           <Cpu size={72} className="text-primary animate-glow" />
           <div className="logo-ring" />
           <div className="logo-ring outer" />
        </div>
        
        <div className="title-stack">
           <h1 className="hero-title">AGRI<span>PREDICT</span></h1>
           <div className="title-tag">NEURAL AGRICULTURE INTELLIGENCE ENGINE</div>
        </div>

        <div className="hero-divider">
           <div className="line" />
           <div className="diamond" />
           <div className="line" />
        </div>

        <div className="capability-grid">
           <div className="cap-item">
              <Zap size={20} />
              <span>REAL-TIME ANALYTICS</span>
           </div>
           <div className="cap-item">
              <ShieldCheck size={20} />
              <span>SECURE ENCRYPTED DATA</span>
           </div>
           <div className="cap-item">
              <Database size={20} />
              <span>MULTIVARIATE LOGIC</span>
           </div>
        </div>

        <motion.button 
          className="enter-btn-xl"
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 255, 204, 0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
           <span className="btn-glow" />
           <span className="btn-text">INITIALIZE SYSTEM</span>
           <ChevronRight size={24} className="btn-icon" />
        </motion.button>

        <div className="security-tag">
           AUTHENTICATION: VERIFIED // ACCESS: GRANTED
        </div>
      </motion.div>

      <div className="landing-footer">
         <div className="system-sync">
            <div className="sync-item">
               <div className="pulse-dot online" />
               SERVER: AGRI-NODE-01
            </div>
            <div className="sync-item">
               <div className="pulse-dot busy" />
               COMPUTE: READY
            </div>
            <div className="sync-item">
               LATENCY: 0.004 MS
            </div>
         </div>
         <div className="copyright">© 2026 AGRI-PREDICT BIO-AI SYSTEMS. CLASSIFIED DATA.</div>
      </div>
    </div>
  </div>
);
const BootSequence = () => {
  const [logs, setLogs] = useState([]);
  const fullLogs = [
    "> INITIALIZING NEURAL KERNEL...",
    "> LOADING GEOGRAPHIC DATASET v4.2...",
    "> SYNCING WITH AGRI-SATELLITE-7...",
    "> OPTIMIZING PREDICTIVE ALGORITHMS...",
    "> ESTABLISHING SECURE PROTOCOLS...",
    "> ACCESS GRANTED. SYSTEM READY."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullLogs.length) {
        setLogs(prev => [...prev, fullLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="boot-root">
       <BiolumePulse />
       <DataStream />
       <div className="boot-container">
          <motion.div 
            className="boot-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Activity size={24} className="text-primary animate-pulse" />
            <span>SYSTEM BOOT UP INITIALIZED</span>
          </motion.div>
          <div className="boot-terminal">
            {logs.map((log, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="boot-line"
              >
                {log}
              </motion.div>
            ))}
            {logs.length < fullLogs.length && (
              <div className="terminal-cursor" />
            )}
          </div>
          <div className="boot-loader">
             <motion.div 
               className="loader-fill"
               initial={{ width: 0 }}
               animate={{ width: '100%' }}
               transition={{ duration: 2.8, ease: "linear" }}
             />
          </div>
       </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [isBooting, setIsBooting] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS.irrigation);
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const defaultInputs = {};
    selectedModel.features.forEach(f => {
      if (f.type === 'select') defaultInputs[f.name] = f.options[0];
      else defaultInputs[f.name] = f.default;
    });
    setInputs(defaultInputs);
    setPrediction(null);
    setError(null);
  }, [selectedModel]);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    checkApi();
  }, []);

  const checkApi = async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      console.log('API Health Check:', response.data);
      setApiStatus('online');
    } catch (e) {
      console.error('API Health Check Failed:', {
        message: e.message,
        status: e.response?.status,
        data: e.response?.data,
        url: e.config?.url
      });
      setApiStatus('offline');
    }
  };

  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending prediction request:', { model: selectedModel.id, inputs });
      await new Promise(r => setTimeout(r, 1500)); // Cinematic "Compute" time
      const response = await axios.post(`${API_BASE}/predict`, {
        model: selectedModel.id,
        inputs: inputs
      });
      console.log('Prediction response:', response.data);
      setPrediction(response.data.prediction);
    } catch (e) {
      const errorMsg = e.response?.data?.error || e.message || 'Intelligence engine offline';
      console.error('Prediction Error:', {
        message: e.message,
        status: e.response?.status,
        data: e.response?.data,
        url: e.config?.url
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = () => {
    setIsBooting(true);
    setTimeout(() => {
      setIsBooting(false);
      setView('dashboard');
    }, 3200);
  };

  const SelectedIcon = IconMap[selectedModel.icon];

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        isBooting ? (
          <motion.div key="booting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BootSequence />
          </motion.div>
        ) : (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <LandingPage onEnter={handleEnter} />
          </motion.div>
        )
      ) : (
        <motion.div 
          key="dashboard"
          className="dashboard-root"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BiolumePulse />
          
          {/* HUD Sidebar */}
          <motion.aside 
            className="hud-sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="sidebar-header">
               <div className="logo-section" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
                  <div className="logo-core">
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     >
                       <Cpu size={24} className="text-primary" />
                     </motion.div>
                  </div>
                  <div className="logo-text">
                     <h2>AGRI<span>PREDICT</span></h2>
                     <p>BIO-AI SYSTEMS</p>
                  </div>
               </div>
            </div>

            <nav className="sidebar-nav">
              <div className="nav-group-label">NEURAL NODES</div>
              {Object.values(MODELS).map((model, idx) => {
                const Icon = IconMap[model.icon];
                return (
                  <motion.button 
                    key={model.id}
                    className={`nav-btn ${selectedModel.id === model.id ? 'active' : ''}`}
                    onClick={() => setSelectedModel(model)}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="nav-btn-icon">
                      <Icon size={18} />
                    </div>
                    <div className="nav-btn-content">
                       <span className="label">{model.name}</span>
                       <span className="sub">{model.id.toUpperCase()} ENG-v4</span>
                    </div>
                    {selectedModel.id === model.id && (
                      <motion.div layoutId="nav-indicator" className="active-dot" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            <div className="sidebar-footer">
               <div className="status-hud glass-panel">
                  <div className="hud-metric">
                     <Zap size={14} className="text-amber" />
                     <div className="metric-info">
                        <span>ENGINE CLOCK</span>
                        <p>2.4 GHZ</p>
                     </div>
                  </div>
                  <div className="hud-metric">
                     <ShieldCheck size={14} className="text-primary" />
                     <div className="metric-info">
                        <span>PROTECTION</span>
                        <p>ENCRYPTED</p>
                     </div>
                  </div>
                  <div className="api-badge">
                     <div className={`dot ${apiStatus}`} />
                     <span>CORE {apiStatus.toUpperCase()}</span>
                     <RefreshCcw size={12} className="refresh-icon" onClick={checkApi} />
                  </div>
               </div>
            </div>
          </motion.aside>

          {/* Primary Interface */}
          <main className="interface-main">
            <header className="interface-header">
              <div className="header-meta">
                  <motion.div 
                    key={selectedModel.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="breadcrumb"
                  >
                    <Layers size={14} />
                    <span>NODES</span>
                    <ChevronRight size={14} />
                    <span className="active">{selectedModel.name.toUpperCase()}</span>
                  </motion.div>
                  <h1 className="header-title">System Configuration — <span className="text-gradient">v1.2.0</span></h1>
              </div>
              
              <div className="header-stats">
                  <div className="header-stat-item">
                    <Wind size={16} className="text-muted" />
                    <span>ENV DRY</span>
                  </div>
                  <div className="header-stat-item">
                    <Activity size={16} className="text-muted" />
                    <span>LATENCY 42ms</span>
                  </div>
              </div>
            </header>

            <div className="interface-grid">
              {/* Matrix Configuration */}
              <motion.div 
                className="config-matrix glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                  <div className="panel-header">
                    <div className="panel-title">
                        <Database size={18} className="text-primary" />
                        <h3>ENVIRONMENTAL MATRIX</h3>
                    </div>
                    <div className="header-line" />
                  </div>

                  <div className="matrix-content">
                    <div className="inputs-grid">
                        <AnimatePresence mode="popLayout">
                          {selectedModel.features.map((f, i) => (
                            <motion.div 
                              key={`${selectedModel.id}-${f.name}`}
                              className="field-group"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                                <label>{f.label}</label>
                                
                                {f.type === 'select' ? (
                                  <div className="custom-select">
                                    <select 
                                      value={inputs[f.name] || ''} 
                                      onChange={(e) => handleInputChange(f.name, e.target.value)}
                                    >
                                      {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <ChevronRight size={14} className="select-caret" />
                                  </div>
                                ) : f.type === 'boolean' ? (
                                  <motion.button 
                                    className={`cyber-toggle ${inputs[f.name] ? 'on' : 'off'}`}
                                    onClick={() => handleInputChange(f.name, !inputs[f.name])}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <div className="toggle-track">
                                      <motion.div 
                                        className="toggle-knob"
                                        animate={{ x: inputs[f.name] ? 24 : 0 }}
                                      />
                                    </div>
                                    <span>{inputs[f.name] ? 'ACTIVE' : 'IDLE'}</span>
                                  </motion.button>
                                ) : (
                                  <div className="field-input-wrapper">
                                    <input 
                                      type="number" 
                                      value={inputs[f.name] === undefined ? '' : inputs[f.name]}
                                      onChange={(e) => handleInputChange(f.name, parseFloat(e.target.value))}
                                      placeholder="0.00"
                                    />
                                    <div className="input-decorator" />
                                  </div>
                                )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                    </div>
                  </div>

                  <div className="panel-actions">
                    <motion.button 
                      className="compute-btn"
                      onClick={handlePredict}
                      disabled={loading || apiStatus === 'offline'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                          <RefreshCcw className="spinning" size={20} />
                        ) : (
                          <Send size={18} />
                        )}
                        <span>{loading ? 'COMPUTING DATA...' : 'INITIATE INFERENCE'}</span>
                    </motion.button>
                  </div>
              </motion.div>

              {/* Visualization Wing */}
              <div className="visual-wing">
                  <motion.div 
                    className="inference-orb-panel glass-panel"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                      <div className="orb-display">
                        <AnimatePresence mode="wait">
                          {loading ? (
                              <motion.div 
                                key="loading"
                                className="orb-loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="ring-system">
                                    <div className="ring r1" />
                                    <div className="ring r2" />
                                    <div className="ring r3" />
                                </div>
                                <p className="loading-label">SCANNING MATRIX</p>
                              </motion.div>
                          ) : prediction !== null ? (
                              <motion.div 
                                key="result"
                                className="orb-result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring' }}
                              >
                                <div className="result-header">PROBABILISTIC OUTCOME</div>
                                <div className="result-val text-gradient">
                                    {typeof prediction === 'number' ? prediction.toFixed(2) : prediction}
                                </div>
                                <div className="result-meta">
                                    <div className="confidence-track">
                                      <motion.div 
                                        className="confidence-level"
                                        initial={{ width: 0 }}
                                        animate={{ width: '92%' }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                      />
                                    </div>
                                    <span>92.4% SYSTEM CONFIDENCE</span>
                                </div>
                              </motion.div>
                          ) : (
                              <motion.div 
                                key="idle"
                                className="orb-idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <div className="idle-indicator">
                                    <Activity size={40} className="text-muted" />
                                    <div className="pulse-ring" />
                                </div>
                                <h3>AWAITING CONTEXT</h3>
                                <p>Neural engine ready for data-stream ingestion</p>
                              </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        className="error-hud"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <AlertCircle size={20} className="text-red" />
                        <div className="error-body">
                            <strong>ENGINE FAULT</strong>
                            <p>{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    className="insight-scanner glass-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="scanner-header">
                        <p>REAL-TIME IMPACT ANALYSIS</p>
                        <div className="scanner-line" />
                    </div>
                    
                    <div className="radar-system">
                        <div className="radar-bg">
                          <div className="grid-circle" />
                          <div className="grid-circle" />
                          <div className="grid-circle" />
                        </div>
                        <motion.div 
                          className="radar-sweep-bar" 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                          <div 
                            key={angle}
                            className="radar-spike"
                            style={{ 
                              height: `${20 + (Math.sin(i + (selectedModel.id.length)) * 30 + 30)}%`,
                              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                              left: '50%',
                              top: '50%',
                              transformOrigin: 'bottom center'
                            }}
                          />
                        ))}
                    </div>
                    
                    <div className="scanner-footer">
                        <p>HEURISTIC: High stability detected in current parameter set. Risk variance remains within ±4.2% nominal range.</p>
                    </div>
                  </motion.div>
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
