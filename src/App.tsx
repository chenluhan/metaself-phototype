import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid, Customized, Scatter } from 'recharts';
import { Heart, Activity, Moon, Sun, Thermometer, Footprints, Flame, Droplet, Coffee, Wine, Pill, Brain, ChevronRight, ChevronDown, ChevronUp, Settings2, Zap, Waves, ArrowLeft, Plus, RefreshCw, Info, X, GripVertical, Dna, Home, Compass, Watch, User, CalendarHeart } from 'lucide-react';

const AIAdvisor = ({ scrollYProgress, onOpenDetail, score }: { scrollYProgress: any, onOpenDetail: (type: 'breathe' | 'stretch') => void, score: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  
  // When scrolling down, shrink the capsule
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const getAdvisorContent = (score: number) => {
    if (score >= 85) {
      return {
        title: '核心精力处于较好状态，建议根据需要安排重要事项',
        desc: '身心得到深度修复，今日建议开启高效模式，优先处理高价值任务。',
        showIntervention: false
      };
    } else if (score >= 70) {
      return {
        title: '核心精力平稳，适合推进日常核心行程',
        desc: '恢复状态达标，建议保持节奏，在下午时段安排适度休整。',
        showIntervention: false
      };
    } else {
      return {
        title: '核心精力较低，建议适度降低今日任务强度',
        desc: '恢复情况可能受限，建议通过呼吸干预或轻度拉伸来促进身心状态回升。',
        showIntervention: true
      };
    }
  };

  const content = getAdvisorContent(score);

  if (!visible) return null;

  return (
    <motion.div 
      style={{ scale, y, opacity }}
      className="sticky top-4 z-50 mx-4 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <div 
        className="px-5 py-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)] ${score < 70 ? 'bg-orange-400' : 'bg-blue-400'}`} />
          <span className="text-xs font-medium text-white/90 tracking-wide">{content.title}</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-5 pb-5"
          >
            <p className="text-[11px] text-white/50 leading-relaxed mb-4 font-light">
              {content.desc}
            </p>
            <div className="flex gap-3">
              {content.showIntervention && (
                <button 
                  className="flex-1 py-2.5 rounded-xl bg-white text-black text-[11px] font-semibold tracking-wider active:scale-95 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                    onOpenDetail('breathe');
                  }}
                >
                  执行干预
                </button>
              )}
              <button 
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-[11px] font-medium tracking-wider active:scale-95 transition-transform"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setVisible(false);
                }}
              >
                我知道了
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface PhaseTheaterProps {
  phase: 'morning' | 'transitioning' | 'daytime';
  setPhase: (p: 'morning' | 'transitioning' | 'daytime') => void;
  hasIgnited: boolean;
  setHasIgnited: (v: boolean) => void;
  batteryLevel: number;
  burnLevel: number;
  setBurnLevel: (v: number | ((prev: number) => number)) => void;
  setBatteryLevel: (v: number | ((prev: number) => number)) => void;
  onOpenDetail: (type: 'battery' | 'burn' | 'recharge' | 'breathe' | 'stretch') => void;
}

const getRechargeStatus = (score: number) => {
  if (score >= 85) {
    return {
      summary: '身心得到较好修复，建议开启高效的一天',
      tags: [
        { id: 'cog', icon: Brain, text: '认知极佳', color: 'text-emerald-400/70' },
        { id: 'nerv', icon: Zap, text: '神经舒缓', color: 'text-sky-400/70' },
        { id: 'met', icon: Activity, text: '代谢平稳', color: 'text-indigo-400/70' }
      ]
    };
  } else if (score >= 70) {
    return {
      summary: '恢复状态良好，可应对常规挑战',
      tags: [
        { id: 'cog', icon: Brain, text: '认知清晰', color: 'text-emerald-400/70' },
        { id: 'nerv', icon: Zap, text: '神经平稳', color: 'text-sky-400/70' },
        { id: 'met', icon: Activity, text: '能量充沛', color: 'text-indigo-400/70' }
      ]
    };
  } else if (score >= 50) {
    return {
      summary: '充能略显不足，建议适度安排休息',
      tags: [
        { id: 'cog', icon: Brain, text: '认知迟缓', color: 'text-amber-400/70' },
        { id: 'nerv', icon: Zap, text: '神经紧绷', color: 'text-amber-400/70' },
        { id: 'met', icon: Activity, text: '消耗增快', color: 'text-amber-400/70' }
      ]
    };
  } else {
    return {
      summary: '恢复情况可能欠佳，建议适度降低今日的任务强度',
      tags: [
        { id: 'cog', icon: Brain, text: '认知疲劳', color: 'text-red-400/70' },
        { id: 'nerv', icon: Zap, text: '神经衰弱', color: 'text-red-400/70' },
        { id: 'met', icon: Activity, text: '代谢紊乱', color: 'text-red-400/70' }
      ]
    };
  }
};

const PhaseTheater = ({ phase, setPhase, hasIgnited, setHasIgnited, batteryLevel, burnLevel, setBurnLevel, setBatteryLevel, onOpenDetail }: PhaseTheaterProps) => {
  const [dragProgress, setDragProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (phase === 'daytime') {
        const beta = e.beta || 0; 
        const gamma = e.gamma || 0; 
        
        const x = Math.max(-30, Math.min(30, gamma)) / 30;
        const y = Math.max(-30, Math.min(30, beta - 45)) / 30; 
        
        setTilt({ x, y });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [phase]);

  const handleDrag = (event: any, info: any) => {
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const progress = Math.max(0, Math.min(1, info.offset.x / (containerWidth - 60)));
    setDragProgress(progress);
    
    if (navigator.vibrate && Math.random() > 0.8) {
      navigator.vibrate(5);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const containerWidth = containerRef.current?.offsetWidth || 300;
    if (info.offset.x > containerWidth * 0.6) {
      if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
      setHasIgnited(true);
      setPhase('daytime');
    } else {
      setDragProgress(0);
    }
  };

  const getBurnVisuals = (level: number) => {
    if (level <= 15) {
      return {
        glow: 'rgba(14, 165, 233, 0.05)', // Ice blue
        halo: 'rgba(2, 132, 199, 0.02)',
        tremor: 0,
        text: '澄澈',
        pulse: false,
        sphereBg: 'rgba(255,255,255,0.05)',
        color: 'text-sky-400'
      };
    }
    if (level <= 35) {
      return {
        glow: 'rgba(13, 148, 136, 0.15)', // Cyan slate
        halo: 'rgba(15, 118, 110, 0.08)',
        tremor: 0,
        text: '微澜',
        pulse: false,
        sphereBg: 'rgba(20, 184, 166, 0.1)',
        color: 'text-teal-400'
      };
    }
    if (level <= 65) {
      return {
        glow: 'rgba(217, 119, 6, 0.3)', // Amber
        halo: 'rgba(180, 83, 9, 0.15)',
        tremor: 0.5,
        text: '激荡',
        pulse: false,
        sphereBg: 'rgba(245, 158, 11, 0.15)',
        color: 'text-amber-500'
      };
    }
    if (level <= 100) {
      return {
        glow: 'rgba(220, 38, 38, 0.5)', // Red
        halo: 'rgba(185, 28, 28, 0.3)',
        tremor: 2,
        text: '沸腾',
        pulse: true,
        sphereBg: 'rgba(239, 68, 68, 0.2)',
        color: 'text-red-500'
      };
    }
    return {
      glow: 'rgba(126, 34, 206, 0.6)', // Deep purple / Magma
      halo: 'rgba(159, 18, 57, 0.4)',
      tremor: 4,
      text: '临界过载',
      pulse: true,
      sphereBg: 'rgba(168, 85, 247, 0.3)',
      color: 'text-purple-500'
    };
  };

  const burnVisuals = getBurnVisuals(burnLevel);
  const targetRechargeScore = 85; // Hardcoded for morning animation target
  const rechargeStatus = getRechargeStatus(targetRechargeScore);

  // Tremor effect for high burn levels
  const tremorTransform = phase === 'daytime' && burnVisuals.tremor > 0 
    ? `translate(${(Math.random() - 0.5) * burnVisuals.tremor}px, ${(Math.random() - 0.5) * burnVisuals.tremor}px)`
    : 'translate(0px, 0px)';

  // Sphere volume shrinks as battery drops (from 100% to 0%), but keep it slightly smaller overall
  const sphereScale = Math.max(0.4, 0.4 + (batteryLevel / 100) * 0.4);

  const sphereStyle = phase === 'daytime' ? {
    background: `radial-gradient(circle at 30% 30%, ${burnVisuals.sphereBg}, rgba(0,0,0,0.95))`,
    boxShadow: `
      inset 0 0 40px rgba(255,255,255,0.05),
      0 0 80px ${burnVisuals.glow},
      0 0 140px ${burnVisuals.halo}
    `,
    transform: `perspective(1000px) rotateX(${tilt.y * 25}deg) rotateY(${tilt.x * 25}deg) scale(${sphereScale})`,
  } : {};

  return (
    <div 
      className="relative h-[380px] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{ transform: tremorTransform }}
    >
      {/* Mode Toggle */}
      <AnimatePresence>
        {(phase === 'daytime' || (phase === 'morning' && hasIgnited)) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setPhase(phase === 'daytime' ? 'morning' : 'daytime')}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 backdrop-blur-md transition-colors"
          >
            {phase === 'daytime' ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Burn Level Background Glow */}
      <motion.div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: phase === 'daytime' 
            ? `radial-gradient(circle at center, ${burnVisuals.halo} 0%, transparent 80%)`
            : 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)'
        }}
        animate={burnVisuals.pulse ? {
          opacity: [0.7, 1, 0.7],
        } : { opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {phase === 'morning' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-[1.5px] bg-white/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {phase === 'morning' ? (
            <motion.div 
              key="morning-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center w-full pb-6"
            >
              {/* AI Greeting */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col items-center mb-4"
              >
                <span className="text-[9px] text-white/40 tracking-[0.3em] uppercase mb-2">MORNING READINESS</span>
                <span className="text-xs text-white/70 font-light tracking-widest">{rechargeStatus.summary}</span>
              </motion.div>

              <div 
                className="relative flex items-center justify-center cursor-pointer hover:scale-105 transition-transform w-[200px] h-[200px]"
                onClick={() => onOpenDetail('recharge')}
              >
                {/* Organic Blob Morphing Background */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{ animation: 'blob-pulse 4s ease-in-out infinite alternate' }}
                >
                  {/* Blob 1 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-500/50 to-teal-300/30 blur-3xl"
                    style={{ 
                      animation: 'blob-morph-1 15s ease-in-out infinite alternate, blob-spin-cw 25s linear infinite' 
                    }}
                  />
                  {/* Blob 2 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-bl from-cyan-500/40 to-blue-400/30 blur-3xl"
                    style={{ 
                      animation: 'blob-morph-2 18s ease-in-out infinite alternate, blob-spin-ccw 30s linear infinite' 
                    }}
                  />
                  {/* Blob 3 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-sky-400/40 to-indigo-500/30 blur-3xl"
                    style={{ 
                      animation: 'blob-morph-3 20s ease-in-out infinite alternate, blob-spin-cw 35s linear infinite' 
                    }}
                  />
                </div>

                {/* Text Layer (Absolute Hover) */}
                <div 
                  className="relative z-20 flex items-start text-white drop-shadow-2xl"
                  style={{ textShadow: `0 0 ${dragProgress * 30}px rgba(255,255,255,${dragProgress * 0.8})` }}
                >
                  <span className="text-[120px] font-thin tracking-tighter leading-none">{Math.floor(batteryLevel)}</span>
                  <span className="text-3xl font-light mt-4 opacity-60">%</span>
                </div>
              </div>

              {/* System Status Breakdown */}
              <AnimatePresence>
                {hasIgnited && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex items-center justify-center gap-3 mt-6"
                  >
                    {rechargeStatus.tags.map((tag) => {
                      const Icon = tag.icon;
                      return (
                        <div key={tag.id} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] px-3 py-1.5 rounded-full">
                          <Icon className={`w-3.5 h-3.5 ${tag.color}`} />
                          <span className="text-[10px] text-white/70 font-light tracking-wider">{tag.text}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="daytime-container"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative flex items-center justify-center w-full h-full px-4"
            >
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Vitality Battery Card */}
                <motion.div 
                  onClick={() => onOpenDetail('battery')}
                  className="relative h-40 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] overflow-hidden cursor-pointer group flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Dynamic Battery Icon */}
                  <div className="relative w-8 h-12 border border-white/20 rounded-md p-0.5 flex flex-col justify-end mb-4">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-white/20 rounded-t-sm" />
                    <motion.div
                      className="w-full rounded-sm"
                      animate={{ 
                        height: `${batteryLevel}%`, 
                        backgroundColor: batteryLevel > 20 ? '#ffffff' : '#ef4444' 
                      }}
                      transition={{ duration: 1 }}
                    />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-4 h-4 text-black/50 mix-blend-overlay" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-start">
                      <span className="text-4xl font-thin text-white tracking-tighter leading-none">{Math.floor(batteryLevel)}</span>
                      <span className="text-sm font-light text-white/70 ml-0.5">%</span>
                    </div>
                    <div className="mt-1 flex flex-col items-center">
                      <div className="text-[9px] text-white/50 tracking-[0.2em] uppercase flex items-center gap-1">
                        <span className="text-white/80 font-medium tracking-widest">核心精力</span>
                        <span>VITALITY</span>
                      </div>
                      <div className="text-[8px] text-white/30 mt-0.5 font-light tracking-wider">当前身心状态的综合余量</div>
                    </div>
                  </div>
                </motion.div>

                {/* Burn Level Card */}
                <motion.div 
                  onClick={() => onOpenDetail('burn')}
                  className="relative h-40 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] overflow-hidden cursor-pointer group flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Dynamic Pool Icon */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 mb-4" style={{ boxShadow: `0 0 20px ${burnVisuals.glow}` }}>
                    <motion.div 
                      className="absolute inset-0 transition-all duration-1000"
                      style={{ background: burnVisuals.sphereBg }}
                      animate={{
                        borderRadius: [
                          '45% 55% 40% 60% / 55% 45% 60% 40%',
                          '55% 45% 60% 40% / 45% 55% 40% 60%',
                          '40% 60% 55% 45% / 60% 40% 55% 45%',
                          '45% 55% 40% 60% / 55% 45% 60% 40%'
                        ]
                      }}
                      transition={{ duration: burnVisuals.pulse ? 2 : 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={burnVisuals.pulse ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Waves className={`w-5 h-5 ${burnVisuals.color}`} />
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-thin text-white tracking-tighter leading-none">{Math.floor(burnLevel)}</span>
                    </div>
                    <div className="mt-1 flex flex-col items-center">
                      <div className={`text-[9px] tracking-[0.2em] uppercase flex items-center gap-1 ${burnVisuals.color}`}>
                        <span className="font-medium tracking-widest">负荷水位</span>
                        <span>BURN</span>
                      </div>
                      <div className="text-[8px] text-white/30 mt-0.5 font-light tracking-wider">累计的压力与消耗指数</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider */}
      {phase === 'morning' && !hasIgnited && (
        <motion.div 
          ref={containerRef}
          className="absolute bottom-12 w-64 h-14 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center px-1 overflow-hidden backdrop-blur-xl z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-medium text-white/30 tracking-[0.2em] uppercase">
              滑动点火
            </span>
          </div>
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{ x: dragProgress === 0 ? 0 : undefined }}
            className="w-12 h-12 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </motion.div>
          
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-white/10 rounded-full pointer-events-none"
            style={{ width: `calc(48px + ${dragProgress * (256 - 48)}px)` }}
          />
        </motion.div>
      )}
    </div>
  );
};

type MetricId = 'sleep' | 'heartRate' | 'steps' | 'stress' | 'calories' | 'spo2' | 'temperature' | 'menstruation';

const METRICS_DATA: Record<MetricId, any> = {
  menstruation: { id: 'menstruation', title: '经期健康管理', icon: CalendarHeart, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-2">
        <CalendarHeart className="w-4 h-4 text-pink-400/70" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-[10px] text-white/40 px-1">
          <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-medium">
          <div className="w-5 h-5 rounded-full border border-pink-500 text-pink-400 flex items-center justify-center">23</div>
          <div className="w-5 h-5 rounded-full bg-pink-300 text-pink-900 flex items-center justify-center">24</div>
          <div className="w-5 h-5 rounded-full bg-pink-300 text-pink-900 flex items-center justify-center">25</div>
          <div className="w-5 h-5 rounded-full bg-pink-300 text-pink-900 flex items-center justify-center">26</div>
          <div className="w-5 h-5 rounded-full bg-pink-300 text-pink-900 flex items-center justify-center">27</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">28</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">29</div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-medium">
          <div className="w-5 h-5 flex items-center justify-center text-white/80">30</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">31</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">1</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">2</div>
          <div className="w-5 h-5 flex items-center justify-center text-white/80">3</div>
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">4</div>
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">5</div>
        </div>
        <div className="flex justify-between items-end mt-1">
          <div>
            <div className="text-[11px] font-bold text-white mb-0.5 tracking-wider">3月23日</div>
            <div className="text-[8px] text-white/40">上次经期</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-white mb-0.5 tracking-wider">已来 <span className="text-sm">6</span> 天</div>
            <div className="text-[8px] text-white/40">经期中</div>
          </div>
        </div>
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">第 6 天</span>
      <span className="text-[9px] text-pink-400/80 ml-2">经期中</span>
    </>
  )},
  sleep: { id: 'sleep', title: '睡眠恢复度', icon: Moon, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Moon className="w-4 h-4 text-white/70" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-white tracking-tighter">85</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">分</span>
      </div>
      <div className="mt-2 text-[10px] text-white/50 font-light tracking-wide flex items-center gap-2">
        <span>深睡 22%</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>1h 45m</span>
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">85 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">分</span></span>
    </>
  )},
  heartRate: { id: 'heartRate', title: '当前/静息心率', icon: Heart, bigRender: (onMeasure: () => void) => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heart className="w-4 h-4 text-white/70" />
        <button onClick={(e) => { e.stopPropagation(); onMeasure(); }} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Plus className="w-3 h-3 text-white" />
        </button>
        <div className="flex items-center text-white/50 text-[10px]">
          <span className="text-[9px] tracking-widest uppercase">14:30</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-white tracking-tighter">72</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">bpm</span>
      </div>
      <div className="mt-2 text-[10px] text-white/50 font-light tracking-wide">
        静息 54 bpm
      </div>
    </>
  ), smallRender: (onMeasure: () => void) => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">72 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">bpm</span></span>
      <button onClick={(e) => { e.stopPropagation(); onMeasure(); }} className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Plus className="w-2 h-2 text-white" />
      </button>
    </>
  )},
  steps: { id: 'steps', title: '今日步数', icon: Footprints, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Footprints className="w-4 h-4 text-white/70" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-white tracking-tighter">6,430</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">步</span>
      </div>
      <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
        <div className="bg-[#00E5FF] h-full" style={{ width: '64%' }} />
      </div>
      <div className="mt-1 text-[9px] text-white/50 font-light tracking-wide">
        目标完成 64%
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">6,430 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">步</span></span>
    </>
  )},
  stress: { id: 'stress', title: '压力', icon: Brain, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Brain className="w-4 h-4 text-white/70" />
        <div className="flex items-center text-white/50 text-[10px]">
          <span className="text-[9px] tracking-widest uppercase">14:35</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-white tracking-tighter">32</span>
      </div>
      <div className="mt-2 text-[10px] text-[#00FF9D] font-light tracking-wide">
        副交感神经活跃
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">32</span>
      <span className="text-[9px] text-white/30 ml-2">14:35</span>
    </>
  )},
  calories: { id: 'calories', title: '卡路里消耗', icon: Flame, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Flame className="w-4 h-4 text-white/70" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-white tracking-tighter">450</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">kcal</span>
      </div>
      <div className="mt-2 text-[10px] text-white/50 font-light tracking-wide">
        (估算值)
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">450 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">kcal</span></span>
      <span className="text-[9px] text-white/30 ml-2">(估算值)</span>
    </>
  )},
  spo2: { id: 'spo2', title: '血氧饱和度', icon: Droplet, bigRender: (onMeasure: () => void) => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Droplet className="w-4 h-4 text-white/70" />
        <button onClick={(e) => { e.stopPropagation(); onMeasure(); }} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Plus className="w-3 h-3 text-white" />
        </button>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-white tracking-tighter">98</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">%</span>
      </div>
      <div className="mt-2 text-[10px] text-white/50 font-light tracking-wide">
        夜间平均
      </div>
    </>
  ), smallRender: (onMeasure: () => void) => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">98 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">%</span></span>
      <button onClick={(e) => { e.stopPropagation(); onMeasure(); }} className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Plus className="w-2 h-2 text-white" />
      </button>
    </>
  )},
  temperature: { id: 'temperature', title: '基础体温偏差', icon: Thermometer, bigRender: () => (
    <>
      <div className="flex items-start justify-between mb-6">
        <Thermometer className="w-4 h-4 text-white/70" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-white tracking-tighter">+0.2</span>
        <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">°C</span>
      </div>
      <div className="mt-2 text-[10px] text-white/50 font-light tracking-wide">
        夜间平均体温
      </div>
    </>
  ), smallRender: () => (
    <>
      <span className="text-sm font-bold text-white tracking-wide">+0.2 <span className="text-[9px] text-white/50 ml-1 uppercase tracking-widest">°C</span></span>
    </>
  )}
};

const Dashboard = ({ onRefresh, isCalibrated, onOpenBaseline, onOpenDetail, onMeasure }: { onRefresh: () => void, isCalibrated: boolean, onOpenBaseline: () => void, onOpenDetail: (type: 'battery' | 'burn' | 'recharge' | 'breathe' | 'stretch' | MetricId) => void, onMeasure: (type: 'heartRate' | 'spo2') => void }) => {
  const [bigCards, setBigCards] = useState<MetricId[]>(['menstruation', 'sleep', 'heartRate', 'steps']);
  const [smallCards, setSmallCards] = useState<MetricId[]>(['stress', 'calories', 'spo2', 'temperature']);
  const [showSettings, setShowSettings] = useState(false);

  // Simulate a positive shift in baseline for the mature phase
  const hasPositiveShift = true;

  const moveCard = (id: MetricId, from: 'big' | 'small', direction: 'up' | 'down') => {
    const list = from === 'big' ? [...bigCards] : [...smallCards];
    const index = list.indexOf(id);
    if (direction === 'up' && index > 0) {
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index + 1], list[index]] = [list[index], list[index + 1]];
    }
    if (from === 'big') setBigCards(list);
    else setSmallCards(list);
  };

  const toggleCardSize = (id: MetricId, currentSize: 'big' | 'small') => {
    if (currentSize === 'big') {
      setBigCards(bigCards.filter(c => c !== id));
      setSmallCards([...smallCards, id]);
    } else {
      if (bigCards.length >= 4) {
        // Swap with the last big card
        const lastBig = bigCards[bigCards.length - 1];
        setBigCards([...bigCards.slice(0, -1), id]);
        setSmallCards([...smallCards.filter(c => c !== id), lastBig]);
      } else {
        setSmallCards(smallCards.filter(c => c !== id));
        setBigCards([...bigCards, id]);
      }
    }
  };

  return (
    <div className="px-4 pb-8 space-y-6 relative z-10">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase">我的控制台</h2>
          {isCalibrated && (
            <button 
              onClick={onOpenBaseline}
              className={`relative flex items-center justify-center transition-colors ${hasPositiveShift ? 'text-[#00FF9D]' : 'text-white/30 hover:text-white/80'}`}
            >
              <Dna className="w-3.5 h-3.5" />
              {hasPositiveShift && (
                <div className="absolute inset-0 bg-[#00FF9D] blur-sm opacity-30 rounded-full" />
              )}
            </button>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={onRefresh} className="text-white/30 hover:text-white/80 transition-colors active:scale-95">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setShowSettings(true)} className="text-white/30 hover:text-white/80 transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {bigCards.map((id, index) => {
          const metric = METRICS_DATA[id];
          const positionClasses = [
            'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_70%)]',
            'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)]',
            'bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]',
            'bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]'
          ];
          return (
            <div key={id} onClick={() => onOpenDetail(id)} className="relative p-5 rounded-[2rem] bg-white/[0.04] border border-white/[0.08] overflow-hidden group cursor-pointer">
              <div className={`absolute inset-0 ${positionClasses[index % 4]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              {metric.bigRender(() => onMeasure(id as 'heartRate' | 'spo2'))}
            </div>
          );
        })}
      </div>

      {/* Pill List */}
      <div className="space-y-2.5">
        {smallCards.map(id => {
          const metric = METRICS_DATA[id];
          const Icon = metric.icon;
          return (
            <div key={id} onClick={() => onOpenDetail(id)} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.05] transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-white/60" />
                <span className="text-[11px] text-white/80 font-light tracking-widest">{metric.title}</span>
              </div>
              <div className="flex-1 border-b border-dotted border-white/20 mx-4 opacity-30" />
              {metric.smallRender(() => onMeasure(id as 'heartRate' | 'spo2'))}
            </div>
          );
        })}
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#151517] sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md shadow-2xl h-[85vh] sm:h-[80vh] flex flex-col relative"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-medium text-white tracking-wide">调整控制台布局</h3>
                <button onClick={() => setShowSettings(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 pr-3 -mr-3 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                {/* Big Cards Section */}
                <div>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h4 className="text-xs font-medium text-white/40 tracking-widest">大卡片展示 (最多4个)</h4>
                    <span className="text-xs text-white/40">{bigCards.length}/4</span>
                  </div>
                  <div className="space-y-3">
                    {bigCards.map((id, index) => {
                      const metric = METRICS_DATA[id];
                      const Icon = metric.icon;
                      return (
                        <div key={id} className="flex items-center justify-between p-4 rounded-2xl bg-[#222326] border border-white/5">
                          <div className="flex items-center gap-4">
                            <Icon className="w-5 h-5 text-white/70" />
                            <span className="text-[15px] text-white/90">{metric.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-1">
                              <button disabled={index === 0} onClick={() => moveCard(id, 'big', 'up')} className="text-white/30 hover:text-white disabled:opacity-30 transition-colors">
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button disabled={index === bigCards.length - 1} onClick={() => moveCard(id, 'big', 'down')} className="text-white/30 hover:text-white disabled:opacity-30 transition-colors">
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button onClick={() => toggleCardSize(id, 'big')} className="text-white/40 hover:text-white transition-colors">
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {bigCards.length === 0 && (
                      <div className="p-4 rounded-2xl border border-dashed border-white/10 text-center text-sm text-white/30">
                        暂无大卡片
                      </div>
                    )}
                  </div>
                </div>

                {/* Small Cards Section */}
                <div>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h4 className="text-xs font-medium text-white/40 tracking-widest">小卡片展示</h4>
                    <span className="text-xs text-white/40">{smallCards.length}</span>
                  </div>
                  <div className="space-y-3">
                    {smallCards.map((id, index) => {
                      const metric = METRICS_DATA[id];
                      const Icon = metric.icon;
                      return (
                        <div key={id} className="flex items-center justify-between p-4 rounded-2xl bg-[#222326] border border-white/5">
                          <div className="flex items-center gap-4">
                            <Icon className="w-5 h-5 text-white/70" />
                            <span className="text-[15px] text-white/90">{metric.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button onClick={() => toggleCardSize(id, 'small')} className="text-white/40 hover:text-white transition-colors">
                              <ChevronUp className="w-5 h-5" />
                            </button>
                            <div className="flex flex-col gap-1">
                              <button disabled={index === 0} onClick={() => moveCard(id, 'small', 'up')} className="text-white/30 hover:text-white disabled:opacity-30 transition-colors">
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button disabled={index === smallCards.length - 1} onClick={() => moveCard(id, 'small', 'down')} className="text-white/30 hover:text-white disabled:opacity-30 transition-colors">
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {smallCards.length === 0 && (
                      <div className="p-4 rounded-2xl border border-dashed border-white/10 text-center text-sm text-white/30">
                        暂无小卡片
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TacticsJournal = ({ onOpenDetail }: { onOpenDetail: (type: 'battery' | 'burn' | 'recharge' | 'breathe' | 'stretch') => void }) => {
  return (
    <div className="px-4 pb-16 pt-4 relative z-10">
      <h2 className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase mb-5 px-2">战术日志</h2>
      
      {/* Intervention Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
        <div 
          className="min-w-[280px] snap-center p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] cursor-pointer relative overflow-hidden group"
          onClick={() => onOpenDetail('breathe')}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-white/60" />
              <span className="text-[10px] font-medium text-white/60 tracking-widest uppercase">AI 推荐</span>
            </div>
            <h3 className="text-xl font-light text-white mb-2 tracking-wide">3 分钟呼吸法</h3>
            <p className="text-[11px] text-white/40 leading-relaxed font-light">
              降低心率变异性，快速恢复认知带宽。
            </p>
          </div>
        </div>
        
        <div 
          className="min-w-[280px] snap-center p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.04] cursor-pointer hover:bg-white/[0.03] transition-colors duration-500"
          onClick={() => onOpenDetail('stretch')}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-white/30" />
            <span className="text-[10px] font-medium text-white/30 tracking-widest uppercase">物理干预</span>
          </div>
          <h3 className="text-xl font-light text-white mb-2 tracking-wide">轻度拉伸</h3>
          <p className="text-[11px] text-white/40 leading-relaxed font-light">
            缓解久坐带来的肌肉紧张。
          </p>
        </div>
      </div>
    </div>
  );
};

const BreatheDetailView = ({ onClose }: { onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [showSummary, setShowSummary] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cycle = () => {
      setPhase('inhale');
      if (navigator.vibrate) navigator.vibrate(50);
      setTimeout(() => {
        setPhase('exhale');
        if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
      }, 4000);
    };
    cycle();
    const interval = setInterval(cycle, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (showSummary) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C]/95 px-4 backdrop-blur-sm">
        <button onClick={onClose} className="mb-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="w-full max-w-md bg-[#151517] rounded-[2rem] p-8 border border-white/5 shadow-2xl">
          <h3 className="text-xs font-medium tracking-widest text-white/50 mb-8">收益价值 (BENEFIT VALUE)</h3>
          <div className="grid grid-cols-1 gap-3 mb-8">
            <div className="flex flex-col items-center justify-center py-6 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
              <span className="text-sm font-light text-emerald-400 mb-2">心率平稳</span>
              <span className="text-[10px] text-white/40">有效降低交感神经亢奋</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
              <span className="text-sm font-light text-emerald-400 mb-2">专注力回升</span>
              <span className="text-[10px] text-white/40">缓解脑力疲劳，提升认知效率</span>
            </div>
          </div>
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.04]">
            <p className="text-xs text-white/40 leading-relaxed">
              降频呼吸能为您有效阻断交感神经亢奋，是应对高密度脑力输出的最优手段，帮助您快速恢复身心平衡。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#0F1014] text-white overflow-hidden">
      {/* Top Half: Immersive Execution Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 overflow-hidden">
        {/* Breathing Halo */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.05) 50%, transparent 100%)',
            boxShadow: 'inset 0 0 60px rgba(14,165,233,0.1), 0 0 100px rgba(2,132,199,0.2)',
            backdropFilter: 'blur(20px)'
          }}
          animate={{
            scale: phase === 'inhale' ? 1.5 : 1,
            opacity: phase === 'inhale' ? 1 : 0.6,
          }}
          transition={{
            duration: phase === 'inhale' ? 4 : 6,
            ease: "easeInOut"
          }}
        />
        
        {/* Timer */}
        <div className="z-10 text-6xl font-thin tracking-widest text-white drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        
        {/* Status Text */}
        <div className="z-10 mt-8 text-xs text-white/50 tracking-widest">
          跟随手机震动，维持深度呼气。
        </div>

        {/* Toggle Prompt Button */}
        <button 
          onClick={() => setShowPrompt(!showPrompt)}
          className="absolute bottom-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
        >
          {showPrompt ? (
            <X className="w-5 h-5 text-white/50" />
          ) : (
            <Info className="w-5 h-5 text-white/50" />
          )}
        </button>

        {/* Interrupt Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-xs text-white/30 hover:text-white/60 transition-colors z-20"
        >
          中断
        </button>
      </div>

      {/* Bottom Half: ROI Data Audit Area (40%) */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div 
            className="shrink-0 max-h-[55%] overflow-y-auto bg-gradient-to-t from-[#0F1014] to-[#1A1C23] border-t border-white/5 rounded-t-3xl p-6 sm:p-8 flex flex-col relative"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <h3 className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-8">
              收益价值 (BENEFIT VALUE)
            </h3>

            {/* Bento Data Display */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                <span className="text-sm font-light text-emerald-400 mb-2">心率平稳</span>
                <span className="text-[10px] text-white/40">有效降低交感神经亢奋</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                <span className="text-sm font-light text-emerald-400 mb-2">专注力回升</span>
                <span className="text-[10px] text-white/40">缓解脑力疲劳，提升认知效率</span>
              </div>
            </div>

            {/* AI Diagnosis Bottom Bar */}
            <div className="mt-auto p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
              <p className="text-[11px] text-white/60 leading-relaxed font-light">
                降频呼吸能为您有效阻断交感神经亢奋，是应对高密度脑力输出的最优手段，帮助您快速恢复身心平衡。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StretchDetailView = ({ onClose }: { onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes total
  const [currentStretch, setCurrentStretch] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  
  const stretches = [
    { name: '颈部拉伸', duration: 60, desc: '缓慢转动头部，感受颈部肌肉的延展' },
    { name: '肩部环绕', duration: 60, desc: '双肩向上向后画圆，释放肩颈压力' },
    { name: '躯干扭转', duration: 60, desc: '保持骨盆稳定，上半身向两侧轻柔扭转' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate current stretch based on timeLeft
    const elapsed = 180 - timeLeft;
    const index = Math.min(Math.floor(elapsed / 60), 2);
    if (index !== currentStretch) {
      setCurrentStretch(index);
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }
  }, [timeLeft, currentStretch]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentStretchData = stretches[currentStretch];
  const currentStretchTimeLeft = 60 - ((180 - timeLeft) % 60);

  if (showSummary) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C]/95 px-4 backdrop-blur-sm">
        <button onClick={onClose} className="mb-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="w-full max-w-md bg-[#151517] rounded-[2rem] p-8 border border-white/5 shadow-2xl">
          <h3 className="text-xs font-medium tracking-widest text-white/50 mb-6">执行反馈 (EXECUTION FEEDBACK)</h3>
          <div className="flex flex-col items-center justify-center py-8 bg-white/[0.02] rounded-2xl border border-white/[0.04] mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-lg font-light text-white/90">拉伸干预已完成</span>
            <span className="text-xs text-white/40 mt-2">核心躯干能量传输效率已恢复</span>
          </div>
          <p className="text-xs text-white/40 leading-relaxed text-center">
            通过轻度拉伸，您可以有效缓解肌肉僵硬，促进血液循环，提升身体的灵活性与舒适度。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#0F1014] text-white overflow-hidden">
      {/* Top Half: Immersive Execution Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 overflow-hidden">
        {/* Stretching Visuals */}
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-white/5 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-3 h-3 bg-emerald-400 rounded-full absolute top-0 -translate-y-1/2 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
          <div className="w-full h-full rounded-full border border-white/5 scale-75" />
          <div className="w-full h-full rounded-full border border-white/5 scale-50" />
        </motion.div>
        
        <div className="z-10 text-center mb-8">
          <h2 className="text-2xl font-light tracking-widest mb-3">{currentStretchData.name}</h2>
          <p className="text-[11px] text-white/50 tracking-wider max-w-[200px] leading-relaxed">{currentStretchData.desc}</p>
        </div>

        {/* Timer */}
        <div className="z-10 text-6xl font-thin tracking-widest text-white drop-shadow-lg">
          {formatTime(currentStretchTimeLeft)}
        </div>
        
        {/* Status Text */}
        <div className="z-10 mt-10 flex gap-3">
          {stretches.map((_, idx) => (
            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${idx === currentStretch ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-white/20'}`} />
          ))}
        </div>

        {/* Toggle Prompt Button */}
        <button 
          onClick={() => setShowPrompt(!showPrompt)}
          className="absolute bottom-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
        >
          {showPrompt ? (
            <X className="w-5 h-5 text-white/50" />
          ) : (
            <Info className="w-5 h-5 text-white/50" />
          )}
        </button>

        {/* Interrupt Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-xs text-white/30 hover:text-white/60 transition-colors z-20"
        >
          中断
        </button>
      </div>

      {/* Bottom Half: ROI Data Audit Area (40%) */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div 
            className="shrink-0 max-h-[55%] overflow-y-auto bg-gradient-to-t from-[#0F1014] to-[#1A1C23] border-t border-white/5 rounded-t-3xl p-6 sm:p-8 flex flex-col relative"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <h3 className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-6">
              收益价值 (BENEFIT VALUE)
            </h3>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
                <Activity className="w-5 h-5 text-white/50" />
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed font-light text-center">
                当前轻度拉伸可有效阻断肌肉僵硬累积，恢复核心躯干的能量传输效率。请跟随上方指示完成动作。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RechargeDetailView = () => {
  const [driftMetric, setDriftMetric] = useState<'DEEP' | 'HRV' | 'RHR'>('HRV');

  const dates = [
    { label: '周二, 3月10日', type: 'high' },
    { label: '周三, 3月11日', type: 'stable' },
    { label: '周四, 3月12日', type: 'current', active: true },
    { label: '周五, 3月13日', type: 'stable' },
    { label: '周六, 3月14日', type: 'high' },
  ];

  return (
    <div className="bg-[#0F1014] min-h-full pb-10 space-y-12">
      {/* Date Selector */}
      <div className="flex items-center justify-center gap-6 py-8 overflow-hidden relative border-b border-white/5">
        <div className="absolute left-0 w-12 h-full bg-gradient-to-r from-[#0F1014] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-12 h-full bg-gradient-to-l from-[#0F1014] to-transparent z-10 pointer-events-none" />
        
        {dates.map((date, i) => (
          <div key={i} className="flex flex-col items-center flex-shrink-0">
            <span className={`text-[11px] tracking-widest transition-colors ${date.active ? 'text-[#FFFFFF] font-medium scale-110' : 'text-[#A0A0A5] font-light opacity-50'}`}>
              {date.label}
            </span>
            <div className={`w-[2px] h-[2px] rounded-full mt-2 
              ${date.type === 'high' ? 'bg-[#DC143C]' : date.type === 'stable' ? 'bg-[#A0A0A5]' : 'bg-[#CC5500]'} 
              ${date.active ? 'opacity-100' : 'opacity-50'}`} 
            />
          </div>
        ))}
      </div>

      {/* Module 1: Hero Score & AI Insights */}
      <div className="relative pt-12 px-5 flex flex-col items-center">
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-4 flex items-center gap-2">
          <span className="w-2 h-[1px] bg-white/30" />
          MORNING READINESS
          <span className="w-2 h-[1px] bg-white/30" />
        </div>
        
        <h2 className="text-9xl font-thin tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-8">
          75
        </h2>

        {/* AI Insight Card */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-5 shadow-2xl space-y-4">
          <p className="text-[13px] text-[#A0A0A5] leading-[1.6] font-light">
            昨夜深度睡眠略显不足，身体的疲惫感 <span className="text-[#FFFFFF] font-bold">未完全消除</span>，同时神经系统仍处于 <span className="text-[#FFFFFF] font-bold">紧绷状态</span>，未能得到充分的放松。
          </p>
          <p className="text-[13px] text-[#EAB308] font-bold leading-[1.6]">
            今日恢复度 75%，状态不错，可以正常安排工作和运动，适当注意劳逸结合即可。
          </p>
        </div>
      </div>

      {/* Module 2: Attribution Bar Chart */}
      <div className="px-5">
        <h3 className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-6">归因分析 (ATTRIBUTION)</h3>
        
        <div className="space-y-4 relative">
          {/* Center Zero Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Negative Item 1 */}
          <div className="flex items-center w-full relative">
            <div className="w-1/2 pr-4 flex justify-end items-center gap-3">
              <span className="text-[11px] text-white/60">睡眠结构</span>
              <div className="h-1.5 bg-rose-500/80 rounded-l-full w-[60%]" />
            </div>
            <div className="w-1/2 pl-4 flex items-center">
              <span className="text-[11px] text-rose-400 font-mono">-18</span>
            </div>
          </div>

          {/* Negative Item 2 */}
          <div className="flex items-center w-full relative">
            <div className="w-1/2 pr-4 flex justify-end items-center gap-3">
              <span className="text-[11px] text-white/60">自主神经</span>
              <div className="h-1.5 bg-amber-500/80 rounded-l-full w-[40%]" />
            </div>
            <div className="w-1/2 pl-4 flex items-center">
              <span className="text-[11px] text-amber-400 font-mono">-12</span>
            </div>
          </div>

          {/* Positive Item 1 */}
          <div className="flex items-center w-full relative">
            <div className="w-1/2 pr-4 flex justify-end items-center">
              <span className="text-[11px] text-emerald-400 font-mono">+15</span>
            </div>
            <div className="w-1/2 pl-4 flex items-center gap-3">
              <div className="h-1.5 bg-emerald-500/80 rounded-r-full w-[50%]" />
              <span className="text-[11px] text-white/60">体温恢复</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Annotated Traceability Timeline */}
      <div className="px-5">
        <h3 className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-6">夜间溯源 (TRACEABILITY)</h3>
        <TraceabilityTimeline />
      </div>

      {/* Module 4: Baseline Drift Chart - Removed */}
      <div className="px-5">
      </div>
    </div>
  );
};

const hourlyData = Array.from({ length: 24 }).map((_, i) => {
  let burn = 5;
  let steps = 0;
  let hr = 60;
  let hrv = 60;

  if (i >= 8 && i <= 10) { burn = 15; steps = 1500; hr = 85; hrv = 40; }
  else if (i === 11) { burn = 38; steps = 500; hr = 115; hrv = 25; } // L5
  else if (i === 12) { burn = 18; steps = 2000; hr = 90; hrv = 35; }
  else if (i === 13) { burn = 2; steps = 0; hr = 55; hrv = 75; } // Flatline
  else if (i >= 14 && i <= 18) { burn = 28; steps = 800; hr = 95; hrv = 30; } // L4
  else if (i > 18) { burn = 10; steps = 300; hr = 70; hrv = 50; }
  else if (i < 8) { burn = 2; steps = 0; hr = 50; hrv = 80; }
  
  return { hour: i, burn, steps, hr, hrv };
});

const hrData = Array.from({ length: 48 }).map((_, i) => {
  const hourIndex = Math.floor(i / 2);
  const base = hourlyData[hourIndex].hr;
  return Math.max(40, base + (Math.random() * 20 - 10));
});

const hrvData = Array.from({ length: 48 }).map((_, i) => {
  const hourIndex = Math.floor(i / 2);
  const base = hourlyData[hourIndex].hrv;
  return Math.max(10, base + (Math.random() * 15 - 7.5));
});

const TrajectoryDetailView = ({ mode }: { mode: 'battery' | 'burn' }) => {
  const [activeToggle, setActiveToggle] = useState('hr');
  const [scrubberX, setScrubberX] = useState(mode === 'burn' ? 45.8 : 60.4); // 11:00 for burn, 14:30 for battery
  const [isDragging, setIsDragging] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrubberX(mode === 'burn' ? 45.8 : 60.4);
  }, [mode]);

  const isBattery = mode === 'battery';

  const dates = [
    { label: '周二, 3月10日', type: 'high' },
    { label: '周三, 3月11日', type: 'stable' },
    { label: '周四, 3月12日', type: 'current', active: true },
    { label: '周五, 3月13日', type: 'stable' },
    { label: '周六, 3月14日', type: 'high' },
  ];

  const batteryEvents = [
    { time: '13:00 - 13:45', type: 'recover', text: '深度维稳期 · 电量流失完全停滞', icon: <Waves className="w-3 h-3 text-emerald-400" />, showAddTag: false },
    { time: '13:10', type: 'meditation', text: '3 分钟降频呼吸 · 挽回算力消耗', icon: <Brain className="w-3 h-3 text-sky-400" />, showAddTag: false },
  ];

  const burnEvents = [
    { time: '10:00 - 11:30', type: 'drain', text: '极高频燃耗期 · 伴随心率异常飙升', icon: <Flame className="w-3 h-3 text-rose-500" />, showAddTag: true },
    { time: '11:35', type: 'mark', text: '摄入咖啡因 ·', icon: <Coffee className="w-3 h-3 text-amber-500" />, showAddTag: false },
    { time: '14:00 - 14:30', type: 'drain', text: '中度输出期 (30m) ·', icon: <Activity className="w-3 h-3 text-rose-400" />, showAddTag: false },
  ];

  const timelineEvents = mode === 'battery' ? batteryEvents : burnEvents;

  // Dynamic X-axis logic based on sleep data
  const wakeTime = "07:15";
  const sleepTime = "23:59";
  
  const [wakeH, wakeM] = wakeTime.split(':').map(Number);
  const [sleepH, sleepM] = sleepTime.split(':').map(Number);
  
  const wakeMinutes = wakeH * 60 + wakeM;
  const sleepMinutes = sleepH * 60 + sleepM;
  const totalMinutesRange = sleepMinutes - wakeMinutes;

  const wakeFloat = wakeH + wakeM / 60;
  const sleepFloat = sleepH + sleepM / 60;

  // Calculate paths for the dynamic range
  const startIndex = Math.floor(wakeFloat * 2);
  const endIndex = Math.ceil(sleepFloat * 2);
  const visibleHrData = hrData.slice(startIndex, endIndex + 1);
  const visibleHrvData = hrvData.slice(startIndex, endIndex + 1);
  
  const hrPath = visibleHrData.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (visibleHrData.length - 1)) * 100},${100 - (val / 150) * 100}`).join(' ');
  const hrvPath = visibleHrvData.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (visibleHrvData.length - 1)) * 100},${100 - (val / 100) * 100}`).join(' ');

  // Calculate time from percentage relative to wake-sleep range
  const getTimeFromPercentage = (percent: number) => {
    const minutesFromWake = Math.round((percent / 100) * totalMinutesRange);
    const totalMinutes = wakeMinutes + minutesFromWake;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const displayHours = hours % 24;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Calculate battery and burn from percentage (mock logic)
  const getStatsFromPercentage = (percent: number) => {
    const minutesFromWake = Math.round((percent / 100) * totalMinutesRange);
    const totalMinutes = wakeMinutes + minutesFromWake;
    const hourIndex = Math.min(23, Math.max(0, Math.floor(totalMinutes / 60)));
    const data = hourlyData[hourIndex];
    const halfHourIndex = Math.min(47, Math.max(0, Math.floor(totalMinutes / 30)));

    let battery = 100;
    if (percent < 41.6) { // before 10:00
      battery = Math.round(98 - (percent / 41.6) * 10);
    } else if (percent < 47.9) { // 10:00 - 11:30 (L4)
      battery = Math.round(88 - ((percent - 41.6) / 6.3) * 20);
    } else if (percent < 54.1) { // 11:30 - 13:00
      battery = Math.round(68 - ((percent - 47.9) / 6.2) * 6);
    } else if (percent < 57.3) { // 13:00 - 13:45 (Flatline)
      battery = 62;
    } else { // 13:45 onwards
      battery = Math.round(62 - ((percent - 57.3) / 42.7) * 15);
    }

    let burnLevel = 'L1';
    let color = '#1A3636';
    if (data.burn > 35) { burnLevel = 'L5'; color = '#991B1B'; }
    else if (data.burn >= 26) { burnLevel = 'L4'; color = '#DC143C'; }
    else if (data.burn >= 16) { burnLevel = 'L3'; color = '#CC5500'; }
    else if (data.burn >= 6) { burnLevel = 'L2'; color = '#A0A0A5'; }

    return { 
      battery, 
      burnLevel, 
      burnValue: Math.round(data.burn), 
      color,
      hr: Math.round(hrData[halfHourIndex]),
      hrv: Math.round(hrvData[halfHourIndex]),
      steps: data.steps
    };
  };

  const currentStats = getStatsFromPercentage(scrubberX);
  const currentTime = getTimeFromPercentage(scrubberX);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateScrubber(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateScrubber(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateScrubber = (clientX: number) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;
    setScrubberX(percentage);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(2); // very light tick
    }
  };

  const handleEventClick = (timeStr: string) => {
    const timeMatch = timeStr.match(/(\d{2}):(\d{2})/);
    if (timeMatch) {
      const hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const eventMinutes = hours * 60 + minutes;
      const percent = ((eventMinutes - wakeMinutes) / totalMinutesRange) * 100;
      setScrubberX(Math.max(0, Math.min(100, percent)));
    }
  };

  return (
    <div className="bg-[#0F1014] min-h-full pb-10">
      {/* 1. Infinite Time Ribbon */}
      <div className="flex items-center justify-center gap-6 py-8 overflow-hidden relative">
        <div className="absolute left-0 w-12 h-full bg-gradient-to-r from-[#0F1014] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-12 h-full bg-gradient-to-l from-[#0F1014] to-transparent z-10 pointer-events-none" />
        
        {dates.map((date, i) => (
          <div key={i} className="flex flex-col items-center flex-shrink-0">
            <span className={`text-[11px] tracking-widest transition-colors ${date.active ? 'text-[#FFFFFF] font-medium scale-110' : 'text-[#A0A0A5] font-light opacity-50'}`}>
              {date.label}
            </span>
            <div className={`w-[2px] h-[2px] rounded-full mt-2 
              ${date.type === 'high' ? 'bg-[#DC143C]' : date.type === 'stable' ? 'bg-[#A0A0A5]' : 'bg-[#CC5500]'} 
              ${date.active ? 'opacity-100' : 'opacity-50'}`} 
            />
          </div>
        ))}
      </div>

      {/* 2. AI Insight Card */}
      <div className="px-5 mb-8">
        <div className="bg-[#1C1D22]/60 backdrop-blur-md rounded-2xl p-5 relative">
          <div className="flex flex-col gap-4">
            {mode === 'battery' ? (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">当前带宽</span>
                    <span className="text-xl text-[#FFFFFF] font-thin">62%</span>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">掉电斜率</span>
                    <span className="text-xl text-[#A0A0A5] font-thin">平稳 (-4.5%/h)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">预估高能续航</span>
                  <span className="text-sm text-emerald-500/80 font-thin">3.5H</span>
                </div>
                <div className="w-full h-[1px] bg-white/5 my-1" />
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">累计燃耗</span>
                    <span className="text-xl text-[#FFFFFF] font-thin">85 (沸腾)</span>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">算力折损</span>
                    <span className="text-xl text-[#A0A0A5] font-thin">38%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#A0A0A5] uppercase tracking-widest">机体经济性</span>
                  <span className="text-sm text-emerald-500/80 font-thin">顶级 (+24% 优于基线)</span>
                </div>
                <div className="w-full h-[1px] bg-white/5 my-1" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Phase Trajectory Map */}
      <div className="px-5 mb-6">
        <div 
          ref={chartRef}
          className="relative h-[280px] w-full rounded-2xl overflow-hidden bg-[#0F1014] touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Heatmap Background (Burn Bar Chart) */}
          <div className={`absolute inset-x-0 top-0 bottom-8 flex items-end justify-between px-1 transition-opacity duration-500 ${mode === 'battery' ? 'opacity-20 grayscale' : 'opacity-100'}`}>
            {hourlyData.slice(wakeH, sleepH + 1).map((data, i) => {
              let colorClass = 'from-[#1A3636]/40';
              if (data.burn > 35) colorClass = 'from-[#991B1B]/90';
              else if (data.burn >= 26) colorClass = 'from-[#DC143C]/90';
              else if (data.burn >= 16) colorClass = 'from-[#CC5500]/70';
              else if (data.burn >= 6) colorClass = 'from-[#A0A0A5]/50';

              const isBoiling = data.burn > 35;

              return (
                <div 
                  key={i} 
                  className={`w-[4%] bg-gradient-to-t ${colorClass} to-transparent rounded-t-sm transition-all ${isBoiling ? 'animate-pulse' : ''}`} 
                  style={{ height: `${Math.min(100, (data.burn / 40) * 100)}%` }} 
                />
              );
            })}
          </div>

          {/* Foreground Main Line (Vitality) - Area Chart */}
          <svg className="absolute inset-x-0 top-0 bottom-8 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <filter id="glow-battery">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={mode === 'battery' ? "#E0F2FE" : "#ffffff"} stopOpacity="0.2" />
                <stop offset="100%" stopColor={mode === 'battery' ? "#E0F2FE" : "#ffffff"} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path 
              d="M0,100 L0,2 C20,5 30,8 41.6,12 C44,20 46,28 47.9,32 C50,35 52,37 54.1,38 L57.3,38 C59,38 60.4,38 60.4,38 L60.4,100 Z" 
              fill="url(#area-gradient)"
              stroke="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Past Line */}
            <path 
              d="M0,2 C20,5 30,8 41.6,12 C44,20 46,28 47.9,32 C50,35 52,37 54.1,38 L57.3,38 C59,38 60.4,38 60.4,38" 
              fill="none" 
              stroke={mode === 'battery' ? "#E0F2FE" : "#ffffff"} 
              strokeWidth={mode === 'battery' ? "2" : "1"} 
              vectorEffect="non-scaling-stroke"
              filter={mode === 'battery' ? "url(#glow-battery)" : undefined}
              strokeOpacity={mode === 'battery' ? 1 : 0.5}
            />
            {/* Future Prediction Line (Battery Mode Only) */}
            {mode === 'battery' && (
              <path 
                d="M60.4,38 C65,42 70,48 75,80" 
                fill="none" 
                stroke="#A0A0A5" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
                className="animate-pulse"
              />
            )}
            {/* Future Line (Burn Mode) */}
            {mode === 'burn' && (
              <path 
                d="M60.4,38 C70,45 85,52 100,60" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1" 
                vectorEffect="non-scaling-stroke"
                strokeOpacity={0.5}
              />
            )}
          </svg>
          
          {/* Prediction Anchor (Battery Mode) */}
          {mode === 'battery' && (
            <div className="absolute w-2 h-2 rounded-full bg-[#A0A0A5] shadow-[0_0_8px_rgba(160,160,165,0.8)]" style={{ left: '75%', top: 'calc(80% - 4px)' }}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-[#A0A0A5] font-light bg-[#1C1D22]/80 px-2 py-0.5 rounded border border-white/5">
                18:00 预估触及 20% 保护线
              </div>
            </div>
          )}

          {/* Scrubber */}
          <div 
            className="absolute top-0 bottom-8 w-[1px] bg-white/50 pointer-events-none transition-all duration-75 ease-out"
            style={{ left: `${scrubberX}%` }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1C1D22]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-[#A0A0A5] font-light tracking-wider flex items-center gap-2 shadow-xl z-20">
              {mode === 'burn' ? (
                <>
                  <span className="text-[#FFFFFF]">{currentTime}</span>
                  <span className="w-[1px] h-2.5 bg-white/20" />
                  <span className="font-medium" style={{ color: currentStats.color }}>瞬时燃耗 {currentStats.burnLevel}</span>
                  <span className="w-[1px] h-2.5 bg-white/20" />
                  <span>伴随心率 <span className="text-[#ff4d4d]">{currentStats.hr} bpm</span></span>
                </>
              ) : (
                <>
                  <span className="text-[#FFFFFF]">{currentTime}</span>
                  <span className="w-[1px] h-2.5 bg-white/20" />
                  <div className="flex items-center gap-1">
                    <span>燃耗</span>
                    <span className="text-[#FFFFFF]">{currentStats.burnValue}</span>
                  </div>
                  <span className="w-[1px] h-2.5 bg-white/20" />
                  <span>电量 <span className="text-[#FFFFFF]">{currentStats.battery}%</span></span>
                </>
              )}
            </div>
            
            {/* Glowing Node on the line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-75 ease-out"
              style={{ top: `${100 - currentStats.battery}%`, marginTop: '-5px' }}
            />
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-2 left-4 text-[9px] text-[#A0A0A5] font-light">{wakeTime}</div>
          <div className="absolute bottom-2 right-4 text-[9px] text-[#A0A0A5] font-light">{sleepTime}</div>
        </div>
      </div>

      {/* 4. Micro-Vitals Toggle */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'hr', label: '心率' },
            { id: 'hrv', label: '心率变异性' },
            { id: 'steps', label: '步数' },
          ].map(toggle => (
            <button
              key={toggle.id}
              onClick={() => setActiveToggle(toggle.id)}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider transition-colors whitespace-nowrap ${
                activeToggle === toggle.id 
                  ? 'bg-white/10 text-[#FFFFFF] font-medium border border-white/20' 
                  : 'bg-[#1C1D22]/40 text-[#A0A0A5] font-light border border-white/5'
              }`}
            >
              {toggle.label}
            </button>
          ))}
        </div>
      </div>

      {/* Micro-Vitals Chart */}
      <div className="px-5 mb-10">
        <div className="relative h-[100px] w-full rounded-xl overflow-hidden bg-[#1C1D22]/20 border border-white/5">
          {/* HR / HRV Lines */}
          {activeToggle === 'hr' && (
            <svg className="absolute inset-x-0 top-0 bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d={hrPath} fill="none" stroke="#ff4d4d" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          )}
          {activeToggle === 'hrv' && (
            <svg className="absolute inset-x-0 top-0 bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d={hrvPath} fill="none" stroke="#4da6ff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          )}
          
          {/* Steps Bar Chart */}
          {activeToggle === 'steps' && (
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-1 h-full pt-4">
              {hourlyData.slice(wakeH, sleepH + 1).map((data, i) => (
                <div 
                  key={i} 
                  className="w-[4%] bg-emerald-500/50 rounded-t-sm" 
                  style={{ height: `${Math.min(100, (data.steps / 2500) * 100)}%` }} 
                />
              ))}
            </div>
          )}

          {/* Sync Scrubber for Mini Chart */}
          <div 
            className="absolute top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none transition-all duration-75 ease-out"
            style={{ left: `${scrubberX}%` }}
          >
            <div className="absolute top-2 left-2 whitespace-nowrap bg-[#1C1D22]/90 backdrop-blur-md border border-white/10 rounded-md px-2 py-1 text-[10px] text-[#A0A0A5] font-light flex items-center gap-2">
              {activeToggle === 'hr' && <span>心率 <span className="text-[#ff4d4d] font-medium">{currentStats.hr} bpm</span></span>}
              {activeToggle === 'hrv' && <span>HRV <span className="text-[#4da6ff] font-medium">{currentStats.hrv} ms</span></span>}
              {activeToggle === 'steps' && <span>步数 <span className="text-emerald-400 font-medium">{currentStats.steps}</span></span>}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const ConfidenceTrack = ({ onClick }: { onClick: () => void }) => {
  const targetProgress = 28; // 4/14 = ~28%
  const currentDay = 4;
  const totalDays = 14;
  const [showRipple, setShowRipple] = useState(false);

  return (
    <div className="w-full pt-2 pb-4 cursor-pointer group relative z-10" onClick={onClick}>
      <div className="relative w-full">
        {/* Floating Label */}
        <div className="relative h-4 mb-1">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${targetProgress}%`, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-0 top-0 h-full"
            onAnimationComplete={() => setShowRipple(true)}
          >
            <div className="absolute right-0 translate-x-1/2 -top-1 text-[9px] font-thin tracking-widest text-[#00E5FF] whitespace-nowrap">
              数字孪生校准中 · DAY {currentDay}/{totalDays}
            </div>
          </motion.div>
        </div>

        {/* Track Background */}
        <div className="w-full h-[1px] bg-[#1A1C20] relative">
          {/* Progress Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${targetProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-0 top-0 h-full bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.8)]"
          >
            {/* Ripple Effect at the tip */}
            <AnimatePresence>
              {showRipple && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00E5FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,1)]"
                  style={{ marginRight: '-3px' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HolographicSphere = ({ isCalibrated }: { isCalibrated: boolean }) => {
  // Generate particles
  const particles = Array.from({ length: 60 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = isCalibrated ? 30 + Math.random() * 10 : 20 + Math.random() * 60;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = Math.random() * 2 + 1;
    return { id: i, x, y, size, angle, radius };
  });

  return (
    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
      <motion.div
        animate={isCalibrated ? { rotate: 360 } : { rotate: 0 }}
        transition={isCalibrated ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
        className="relative w-full h-full flex items-center justify-center"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{ 
              x: isCalibrated ? Math.cos(p.angle) * (20 + Math.random()*5) : p.x, 
              y: isCalibrated ? Math.sin(p.angle) * (20 + Math.random()*5) : p.y,
              opacity: isCalibrated ? 0.8 : [0.2, 0.6, 0.2],
              scale: isCalibrated ? 1 : [1, 1.5, 1]
            }}
            transition={{ 
              duration: isCalibrated ? 2 : 3 + Math.random() * 2, 
              repeat: isCalibrated ? 0 : Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-[#00E5FF]"
            style={{ 
              width: p.size, 
              height: p.size,
              boxShadow: isCalibrated ? '0 0 10px rgba(0,229,255,0.8)' : '0 0 4px rgba(0,229,255,0.4)'
            }}
          />
        ))}
        {isCalibrated && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#00E5FF]/20 blur-xl"
          />
        )}
      </motion.div>
    </div>
  );
};

const TruthCard = ({ title, value, unit, range, isCalibrated, status }: { title: string, value: string, unit: string, range: string, isCalibrated: boolean, status: 'optimal' | 'sufficient' | 'drifting' }) => {
  const isDrifting = status === 'drifting';
  
  return (
    <div className={`relative p-4 rounded-2xl bg-[#141518] border ${isCalibrated && isDrifting ? 'border-[#FFB000]/30 shadow-[inset_0_0_20px_rgba(255,176,0,0.05)]' : 'border-white/5'} overflow-hidden`}>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-xs text-white/60 font-medium mb-1">{title}</div>
          {isCalibrated ? (
            <div className="text-[10px] text-white/30 tracking-wider">绿区浮动：{range}</div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 rounded-full border-[1px] border-t-white/40 border-r-transparent border-b-transparent border-l-transparent"
              />
              <span className="text-[10px] text-white/30 tracking-wider">收集切片中 (4/14)</span>
            </div>
          )}
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-mono ${isCalibrated && isDrifting ? 'text-[#FFB000]' : (isCalibrated ? 'text-white/90' : 'text-white/50')}`}>{value}</span>
            <span className="text-[10px] text-white/40">{unit}</span>
          </div>
          {!isCalibrated && (
            <div className="text-[9px] text-white/20 mt-1">今日读数</div>
          )}
        </div>
      </div>
      {isCalibrated && isDrifting && (
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#FFB000]/50 shadow-[0_0_10px_rgba(255,176,0,0.8)]" />
      )}
    </div>
  );
};

const MeasurementModal = ({ type, onClose, onComplete }: { type: 'heartRate' | 'spo2', onClose: () => void, onComplete: (value: number) => void }) => {
  const [progress, setProgress] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(true);

  useEffect(() => {
    if (!isMeasuring) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsMeasuring(false);
          const newValue = type === 'heartRate' ? Math.floor(Math.random() * 20 + 60) : Math.floor(Math.random() * 3 + 96);
          onComplete(newValue);
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isMeasuring, type, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#1C1D22] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
      >
        <h3 className="text-white font-medium mb-6">{type === 'heartRate' ? '正在测量心率...' : '正在测量血氧...'}</h3>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-6">
          <motion.div className="bg-emerald-400 h-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-white/50 text-sm">{isMeasuring ? '请保持静止...' : '测量完成'}</p>
        {!isMeasuring && (
          <button onClick={onClose} className="mt-6 w-full py-3 rounded-xl bg-white text-black font-semibold">
            知道了
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

const BaselinePage = ({ onClose, onCalibrate, isCalibrated }: { onClose: () => void, onCalibrate: () => void, isCalibrated: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#0A0A0C] h-full flex flex-col overflow-hidden relative shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0F1014]/80 backdrop-blur-xl sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-xs font-medium tracking-widest uppercase text-white/50">
            身体基线档案
          </span>
          <div className="w-10" />
        </div>
        
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Module 1: Holographic Core */}
          <div className="flex flex-col items-center justify-center pt-12 pb-8 border-b border-white/5">
            <HolographicSphere isCalibrated={isCalibrated} />
            <h2 className="text-lg font-medium text-white tracking-wider mb-2">
              {isCalibrated ? '身体基线已锁定' : '构建专属身体基线'}
            </h2>
            <p className="text-xs text-white/40 font-light tracking-widest">
              {isCalibrated ? '基于近 30 天滚动数据动态锚定' : '还需 10 天完成基础测绘'}
            </p>
          </div>

        {/* Module 2: Baseline Drift Radar */}
        <div className="p-6 border-b border-white/5">
          <h3 className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase mb-6">基线漂移雷达</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
                <div>
                  <div className="text-xs text-white/90 font-medium">极佳锚定</div>
                  <div className="text-[10px] text-white/40 mt-0.5">3 个指标处于历史最佳</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div>
                  <div className="text-xs text-white/70 font-medium">稳态区间</div>
                  <div className="text-[10px] text-white/40 mt-0.5">1 个指标符合常规波动</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFB000] shadow-[0_0_8px_rgba(255,176,0,0.4)]" />
                <div>
                  <div className="text-xs text-[#FFB000] font-medium">偏离基线</div>
                  <div className="text-[10px] text-[#FFB000]/60 mt-0.5">1 个指标正在恶化</div>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 relative flex items-center justify-center">
              {/* Semi-circle radar */}
              <svg viewBox="0 0 100 50" className="w-full h-full absolute top-0 left-0 transform rotate-180">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
                {isCalibrated && (
                  <>
                    <path d="M 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_4px_rgba(0,229,255,0.5)]" />
                    <path d="M 50 10 A 40 40 0 0 1 70 15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 70 15 A 40 40 0 0 1 90 50" fill="none" stroke="#FFB000" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_4px_rgba(255,176,0,0.3)]" />
                  </>
                )}
              </svg>
              <div className="absolute bottom-4 text-center">
                <div className="text-2xl font-mono text-white/90">{isCalibrated ? '+1.2' : '--'}</div>
                <div className="text-[9px] text-white/30 tracking-widest uppercase mt-1">综合漂移率</div>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3: Absolute Truth Grid */}
        <div className="p-6">
          <h3 className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase mb-4">底层绝对事实</h3>
          <div className="space-y-3">
            <TruthCard 
              title="心率变异性 HRV" 
              value="52" 
              unit="ms" 
              range="46ms - 58ms" 
              isCalibrated={isCalibrated} 
              status="optimal"
            />
            <TruthCard 
              title="静息心率 RHR" 
              value="64" 
              unit="bpm" 
              range="58bpm - 62bpm" 
              isCalibrated={isCalibrated} 
              status="drifting"
            />
            <TruthCard 
              title="体表温差 Temp" 
              value="-0.2" 
              unit="°C" 
              range="-0.5°C - +0.5°C" 
              isCalibrated={isCalibrated} 
              status="sufficient"
            />
            <TruthCard 
              title="呼吸速率 Resp" 
              value="14.2" 
              unit="rpm" 
              range="13.5rpm - 15.0rpm" 
              isCalibrated={isCalibrated} 
              status="optimal"
            />
            <TruthCard 
              title="深度睡眠 Deep" 
              value="1h 45m" 
              unit="" 
              range="1h 30m - 2h 00m" 
              isCalibrated={isCalibrated} 
              status="optimal"
            />
          </div>
        </div>

        {/* Dev Controls */}
        <div className="px-6 mt-8 flex justify-center">
          {!isCalibrated ? (
            <button 
              onClick={() => {
                onCalibrate();
              }}
              className="px-6 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-xs tracking-widest uppercase"
            >
              模拟完成标定 (Day 14)
            </button>
          ) : (
            <button 
              onClick={() => {
                window.location.reload();
              }}
              className="px-6 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-xs tracking-widest uppercase"
            >
              重置状态
            </button>
          )}
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
};

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'services', label: '服务', icon: Compass },
    { id: 'devices', label: '设备', icon: Watch },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-[#0F1014]/90 backdrop-blur-xl border-t border-white/5 pb-6 pt-2 pointer-events-auto">
        <div className="flex items-center justify-around px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-colors ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-white/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Traceability Timeline Component ---
const TraceabilityTimeline = () => {
  const [visibleLayers, setVisibleLayers] = useState({
    deep: true,
    light: true,
    rem: true,
    awake: true,
    hr: true
  });
  const [activeAnchor, setActiveAnchor] = useState<any | null>(null);
  const [taggedAnchors, setTaggedAnchors] = useState<Record<string, boolean>>({});

  const data = React.useMemo(() => {
    const d = [];
    
    // Use safe date construction to avoid NaN on different browsers
    const createTime = (hours: number, minutes: number, dayOffset = 0) => {
      const date = new Date(2026, 2, 24); // March 24, 2026
      date.setHours(hours, minutes, 0, 0);
      date.setDate(date.getDate() + dayOffset);
      return date.getTime();
    };

    // Nap in the afternoon
    let napTime = createTime(14, 0);
    const napSegments = [
      { duration: 10, stage: 'light', hrBase: 60 },
      { duration: 30, stage: 'deep', hrBase: 55 },
      { duration: 20, stage: 'light', hrBase: 58 },
    ];
    
    napSegments.forEach(seg => {
      const segmentEndTime = napTime + seg.duration * 60 * 1000;
      while (napTime < segmentEndTime) {
        const hr = seg.hrBase + (Math.random() * 8 - 4);
        d.push({
          time: napTime,
          hr: hr,
          stage: seg.stage,
          anchor: null
        });
        napTime += 2 * 60 * 1000;
      }
    });

    // Gap between nap and night sleep
    d.push({
      time: createTime(15, 0),
      hr: null,
      stage: 'awake'
    });
    d.push({
      time: createTime(23, 56),
      hr: null,
      stage: 'awake'
    });

    let currentTime = createTime(23, 58);
    
    const segments = [
      { duration: 40, stage: 'deep', hrBase: 45 },
      { duration: 10, stage: 'awake', hrBase: 65 },
      { duration: 30, stage: 'light', hrBase: 50 },
      { duration: 20, stage: 'rem', hrBase: 55 },
      { duration: 60, stage: 'deep', hrBase: 42 },
      { duration: 15, stage: 'awake', hrBase: 80, anchor: { id: 'a1', type: 'awake', title: '觉醒异常', desc: '持续清醒，伴随心率飙升。', tags: ['噪音干扰', '起夜', '做梦'] } },
      { duration: 50, stage: 'light', hrBase: 48 },
      { duration: 30, stage: 'deep', hrBase: 44 },
      { duration: 40, stage: 'rem', hrBase: 58 },
      { duration: 90, stage: 'light', hrBase: 50 },
      { duration: 60, stage: 'deep', hrBase: 45 },
    ];

    segments.forEach(seg => {
      const segmentEndTime = currentTime + seg.duration * 60 * 1000;
      while (currentTime < segmentEndTime) {
        const hr = seg.hrBase + (Math.random() * 8 - 4);
        d.push({
          time: currentTime,
          hr: hr,
          stage: seg.stage,
          anchor: (currentTime === segmentEndTime - Math.floor(seg.duration/2) * 60 * 1000) ? seg.anchor : null
        });
        currentTime += 2 * 60 * 1000;
      }
    });
    
    d.push({
      time: createTime(7, 28, 1), // Next day
      hr: 50,
      stage: 'light'
    });
    
    return d;
  }, []);

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleTagClick = (anchorId: string, tag: string) => {
    setTaggedAnchors(prev => ({ ...prev, [anchorId]: true }));
    setTimeout(() => {
      setActiveAnchor(null);
    }, 1500);
  };

  const CustomLineDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.anchor || cx == null || cy == null || isNaN(cx) || isNaN(cy)) return null;

    const isTagged = taggedAnchors[payload.anchor.id];
    const color = 'rgba(249, 115, 22, 1)'; // orange-500
    const glowColor = 'rgba(249, 115, 22, 0.4)';

    return (
      <g transform={`translate(${cx},${cy})`} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveAnchor(payload.anchor); }} style={{ pointerEvents: 'auto' }}>
        <motion.circle
          r={isTagged ? 4 : 8}
          fill={color}
          initial={{ opacity: 0.8 }}
          animate={{ 
            boxShadow: isTagged ? 'none' : `0 0 20px ${glowColor}`,
            scale: isTagged ? 1 : [1, 1.2, 1],
            opacity: isTagged ? 0.5 : [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: isTagged ? 0 : Infinity }}
        />
        {!isTagged && (
          <circle r={4} fill="#fff" />
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      const stageMap: Record<string, string> = {
        'deep': '深睡',
        'light': '浅睡',
        'rem': '快速眼动',
        'awake': '清醒'
      };

      const timeStr = new Date(data.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

      return (
        <div className="bg-[#2A2D35] text-white p-2.5 rounded-lg shadow-xl border border-white/10 flex flex-col gap-1 min-w-[100px]">
          <div className="text-[10px] text-white/60">{timeStr}</div>
          {visibleLayers.hr && data.hr && (
            <div className="text-xs font-medium">{Math.round(data.hr)} 次/分</div>
          )}
          {visibleLayers[data.stage as keyof typeof visibleLayers] && (
            <div className="text-xs">{stageMap[data.stage]}</div>
          )}
        </div>
      );
    }
    return null;
  };

    const renderSleepStageBackground = ({ xAxisMap, yAxisMap }: any) => {
      if (!xAxisMap || !yAxisMap) return null;
      const xAxis = Object.values(xAxisMap)[0] as any;
      const yAxis = Object.values(yAxisMap).find((y: any) => y.id === 'stage') as any;
      if (!xAxis || !yAxis) return null;

      const getStageConfig = (stage: string) => {
        switch(stage) {
          case 'deep': return { color: '#4f46e5', yVal: 10, height: 15 }; // indigo-600
          case 'light': return { color: '#6366f1', yVal: 25, height: 15 }; // indigo-500
          case 'rem': return { color: '#60a5fa', yVal: 40, height: 15 }; // blue-400
          case 'awake': return { color: 'transparent', yVal: 55, height: 0 };
          default: return { color: 'transparent', yVal: 55, height: 0 };
        }
      };

      const blocks: any[] = [];
      let currentBlock: any = null;

      data.forEach((entry) => {
        if (!currentBlock) {
          currentBlock = { stage: entry.stage, startTime: entry.time, endTime: entry.time };
        } else if (currentBlock.stage === entry.stage) {
          currentBlock.endTime = entry.time;
        } else {
          blocks.push(currentBlock);
          currentBlock = { stage: entry.stage, startTime: entry.time, endTime: entry.time };
        }
      });
      if (currentBlock) blocks.push(currentBlock);

      return (
        <g>
          {blocks.map((block, index) => {
            const x1 = xAxis.scale(block.startTime);
            const x2 = xAxis.scale(block.endTime);
            if (isNaN(x1) || isNaN(x2)) return null;

            const config = getStageConfig(block.stage);
            
            const yTop = yAxis.scale(config.yVal + config.height);
            const yBottom = yAxis.scale(config.yVal);
            if (isNaN(yTop) || isNaN(yBottom)) return null;

            const rectHeight = Math.abs(yBottom - yTop);
            const rectY = Math.min(yTop, yBottom);

            let verticalLine = null;
            if (index > 0) {
              const prevConfig = getStageConfig(blocks[index - 1].stage);
              const prevYTop = yAxis.scale(prevConfig.yVal + prevConfig.height);
              const currentYTop = config.color === 'transparent' ? yAxis.scale(55) : yTop;
              if (!isNaN(prevYTop) && !isNaN(currentYTop)) {
                verticalLine = (
                  <line 
                    x1={x1} y1={prevYTop} 
                    x2={x1} y2={currentYTop} 
                    stroke={config.color !== 'transparent' ? config.color : prevConfig.color} 
                    strokeWidth={2} 
                    opacity={(visibleLayers[block.stage as keyof typeof visibleLayers] || visibleLayers[blocks[index - 1].stage as keyof typeof visibleLayers]) ? 1 : 0.1}
                  />
                );
              }
            }

            return (
              <g key={index}>
                {verticalLine}
                {config.color !== 'transparent' && (
                  <rect 
                    x={x1} 
                    y={rectY} 
                    width={Math.max(0, x2 - x1)} 
                    height={rectHeight} 
                    fill={config.color} 
                    rx={2}
                    opacity={visibleLayers[block.stage as keyof typeof visibleLayers] ? 1 : 0.1}
                    style={{ transition: 'opacity 0.3s' }}
                  />
                )}
              </g>
            );
          })}
        </g>
      );
    };

  const ToggleBtn = ({ label, color, active, onClick }: { label: string, color: string, active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-full py-2 rounded-full text-[10px] transition-all duration-300 flex items-center justify-center gap-1.5
        ${active ? 'bg-[#2A2D35] text-white' : 'bg-[#1A1C23] text-white/40'}`}
    >
      {color !== 'transparent' && (
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, opacity: active ? 1 : 0.4 }} />
      )}
      {label}
    </button>
  );

  return (
    <div className="relative w-full bg-[#12131A] rounded-3xl p-5 border border-white/5 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-1">睡眠总时长 7 小时 31 分钟</h3>
        <p className="text-xs text-white/40">3月24日, 周二</p>
      </div>

      <div className="flex gap-4">
        {/* Chart Area */}
        <div className="flex-1 h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="time" 
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                ticks={[data[0].time, data[data.length - 1].time]}
              />
              <YAxis 
                yAxisId="hr"
                orientation="right"
                domain={[40, 150]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                ticks={[50, 60, 70, 80]}
                width={30}
              />
              <YAxis 
                yAxisId="stage"
                domain={[0, 60]}
                hide
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                isAnimationActive={false}
              />
              
              <Customized component={renderSleepStageBackground} />
              
              <Line 
                yAxisId="hr"
                type="monotone" 
                dataKey="hr" 
                stroke="#ef4444" 
                strokeWidth={1.5} 
                dot={<CustomLineDot />}
                activeDot={visibleLayers.hr ? { r: 4, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 } : false}
                style={{ opacity: visibleLayers.hr ? 1 : 0.1, transition: 'opacity 0.3s' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Toggles */}
        <div className="w-20 flex flex-col gap-2 justify-center shrink-0">
          <ToggleBtn label="深睡" color="#4f46e5" active={visibleLayers.deep} onClick={() => toggleLayer('deep')} />
          <ToggleBtn label="浅睡" color="#6366f1" active={visibleLayers.light} onClick={() => toggleLayer('light')} />
          <ToggleBtn label="快速眼动" color="#60a5fa" active={visibleLayers.rem} onClick={() => toggleLayer('rem')} />
          <ToggleBtn label="清醒" color="transparent" active={visibleLayers.awake} onClick={() => toggleLayer('awake')} />
          <ToggleBtn label="心率" color="#ef4444" active={visibleLayers.hr} onClick={() => toggleLayer('hr')} />
        </div>
      </div>

      {/* Popover */}
      <AnimatePresence>
        {activeAnchor && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[280px] bg-[#1A1C23]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            {taggedAnchors[activeAnchor.id] ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-xs text-white/80">已标记，正在优化您的基线模型</span>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${activeAnchor.type === 'metabolic' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'}`} />
                  <div>
                    <h4 className="text-xs font-medium text-white/90 mb-1">{activeAnchor.title}</h4>
                    <p className="text-[10px] text-white/60 leading-relaxed">{activeAnchor.desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeAnchor.tags.map((tag: string) => (
                    <button 
                      key={tag}
                      onClick={() => handleTagClick(activeAnchor.id, tag)}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                  <button 
                    onClick={() => handleTagClick(activeAnchor.id, '其他')}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    其他
                  </button>
                </div>
              </>
            )}
            
            {/* Close button for popover */}
            {!taggedAnchors[activeAnchor.id] && (
              <button 
                onClick={() => setActiveAnchor(null)}
                className="absolute top-3 right-3 text-white/30 hover:text-white/70"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [activeTab, setActiveTab] = useState('home');
  const [activeDetail, setActiveDetail] = useState<'battery' | 'burn' | 'recharge' | 'breathe' | 'stretch' | MetricId | null>(null);
  const [measurementModal, setMeasurementModal] = useState<{ type: 'heartRate' | 'spo2' } | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showBaselinePage, setShowBaselinePage] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false); // Toggle for mature phase

  const [phase, setPhase] = useState<'morning' | 'transitioning' | 'daytime'>('morning');
  const [hasIgnited, setHasIgnited] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [burnLevel, setBurnLevel] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshText, setRefreshText] = useState('');
  const [showRipple, setShowRipple] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (phase === 'morning') {
      let start = 0;
      const end = 85;
      const duration = 2500;
      const startTime = performance.now();
      
      const animateScore = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setBatteryLevel(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        }
      };
      
      requestAnimationFrame(animateScore);
    }
  }, [phase]);

  const handleRefresh = async () => {
    if (isRefreshing || phase !== 'daytime') return;
    setIsRefreshing(true);
    if (navigator.vibrate) navigator.vibrate(10);

    const texts = [
      '正在连接算力终端...',
      '提取原始体征切片...',
      '重构今日相变轨迹...'
    ];

    for (const text of texts) {
      setRefreshText(text);
      await new Promise(r => setTimeout(r, 800));
    }

    setShowRipple(true);
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
    
    await new Promise(r => setTimeout(r, 300));

    const startBattery = batteryLevel;
    const targetBattery = Math.max(10, startBattery - Math.floor(Math.random() * 15 + 5));
    const startBurn = burnLevel;
    const targetBurn = Math.min(150, startBurn + Math.floor(Math.random() * 30 + 10));

    const duration = 1200;
    const startTime = performance.now();

    const animateGrowth = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      setBatteryLevel(startBattery + (targetBattery - startBattery) * easeProgress);
      setBurnLevel(startBurn + (targetBurn - startBurn) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateGrowth);
      } else {
        setTimeout(() => {
          setIsRefreshing(false);
          setShowRipple(false);
          setRefreshText('');
        }, 200);
      }
    };
    requestAnimationFrame(animateGrowth);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && phase === 'daytime' && !isRefreshing) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current > 0 && phase === 'daytime' && !isRefreshing) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY.current;
      if (diff > 0) {
        setPullDistance(Math.min(diff * 0.4, 80));
      } else {
        setPullDistance(0);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 50 && !isRefreshing) {
      handleRefresh();
    }
    setPullDistance(0);
    touchStartY.current = 0;
  };

  return (
    <motion.div 
      key="main-app"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-screen bg-[#0F1014] text-white font-sans selection:bg-white/20 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-md mx-auto relative min-h-screen sm:border-x border-white/10 shadow-2xl bg-[#0F1014] overflow-hidden pb-24">
            
            {/* Pull to refresh indicator */}
            <div 
              className="absolute top-0 left-0 right-0 flex justify-center items-end overflow-hidden z-40 bg-gradient-to-b from-[#0F1014] to-transparent pointer-events-none"
              style={{ height: pullDistance, opacity: pullDistance / 80 }}
            >
              <span className="text-[10px] text-white/50 tracking-widest uppercase mb-4">
                {pullDistance > 50 ? '释放同步' : '下拉同步'}
              </span>
            </div>

            {/* Refresh Indicator & Ripple */}
            <AnimatePresence>
              {isRefreshing && (
                <motion.div 
                  className="absolute inset-0 z-[100] pointer-events-none overflow-hidden"
                >
                  {/* Ripple Effect */}
                  {showRipple && (
                    <motion.div
                      className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/5"
                      initial={{ width: 0, height: 0, opacity: 1 }}
                      animate={{ width: '200vw', height: '200vw', opacity: 0, borderWidth: '20px' }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  )}

                  {/* Top Text Indicator */}
                  <div className="absolute top-0 left-0 right-0 h-20 flex items-end justify-center pb-4 bg-gradient-to-b from-[#0F1014] via-[#0F1014]/80 to-transparent">
                    <AnimatePresence mode="wait">
                      {!showRipple && refreshText && (
                        <motion.div
                          key={refreshText}
                          initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          transition={{ duration: 0.4 }}
                          className="text-white/90 tracking-[0.2em] font-light text-xs"
                        >
                          {refreshText}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={activeTab === 'home' ? 'block' : 'hidden'}>
              {/* Top Status Bar */}
              <div className="flex justify-between items-center px-6 pt-6 pb-2 text-[10px] text-white/40 font-medium tracking-widest">
                <span>上次同步: 14:35</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-white/60" />
                  <span className="text-white/60">44%</span>
                </div>
              </div>

              <AIAdvisor scrollYProgress={scrollYProgress} onOpenDetail={setActiveDetail} score={batteryLevel} />
              
              {/* 暂时隐藏数字孪生校准进度条
              <AnimatePresence>
                {!isCalibrated && (
                  <motion.div
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ 
                      opacity: [1, 1, 0], 
                      height: ['auto', 'auto', 0],
                      filter: ['brightness(1)', 'brightness(3) blur(4px)', 'brightness(1) blur(0px)'],
                      scale: [1, 1.02, 0.98],
                      transition: { duration: 1.2, times: [0, 0.6, 1], ease: "easeInOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <ConfidenceTrack onClick={() => setShowBaselinePage(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
              */}

              <div className="relative z-0">
                <PhaseTheater 
                  phase={phase}
                  setPhase={setPhase}
                  hasIgnited={hasIgnited}
                  setHasIgnited={setHasIgnited}
                  batteryLevel={batteryLevel}
                  burnLevel={burnLevel}
                  setBurnLevel={setBurnLevel}
                  setBatteryLevel={setBatteryLevel}
                  onOpenDetail={setActiveDetail} 
                />
                <Dashboard onRefresh={handleRefresh} isCalibrated={isCalibrated} onOpenBaseline={() => setShowBaselinePage(true)} onOpenDetail={setActiveDetail} onMeasure={(type) => setMeasurementModal({ type })} />
                <TacticsJournal onOpenDetail={setActiveDetail} />
              </div>
            </div>

            {activeTab !== 'home' && (
              <div className="flex-1 flex items-center justify-center text-white/50 min-h-[80vh]">
                <div className="text-sm tracking-widest uppercase">
                  {activeTab === 'services' && '服务内容开发中...'}
                  {activeTab === 'devices' && '设备管理开发中...'}
                  {activeTab === 'profile' && '个人中心开发中...'}
                </div>
              </div>
            )}

            {/* Secondary Page Overlay */}
            <AnimatePresence>
              {activeDetail && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-0 sm:inset-y-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50 bg-[#0F1014] flex flex-col"
                >
                  {activeDetail === 'breathe' ? (
                    <BreatheDetailView onClose={() => setActiveDetail(null)} />
                  ) : activeDetail === 'stretch' ? (
                    <StretchDetailView onClose={() => setActiveDetail(null)} />
                  ) : (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0F1014]/80 backdrop-blur-xl sticky top-0 z-10">
                        <button 
                          onClick={() => setActiveDetail(null)}
                          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                          {activeDetail === 'battery' ? '核心精力' : activeDetail === 'burn' ? '负荷水位' : activeDetail === 'recharge' ? '恢复质量' : activeDetail === 'breathe' ? '呼吸干预' : activeDetail === 'stretch' ? '物理干预' : METRICS_DATA[activeDetail as MetricId]?.title}
                        </span>
                        {(activeDetail === 'battery' || activeDetail === 'burn' || activeDetail === 'recharge') ? (
                          <button
                            onClick={() => setShowInfoModal(true)}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Info className="w-5 h-5 text-white/70" />
                          </button>
                        ) : (
                          <div className="w-10" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 overflow-y-auto p-0">
                        {activeDetail === 'recharge' ? (
                          <RechargeDetailView />
                        ) : activeDetail === 'battery' || activeDetail === 'burn' ? (
                          <TrajectoryDetailView mode={activeDetail} />
                        ) : (
                          <div className="p-6 text-white/50 text-center mt-20 text-sm">
                            {METRICS_DATA[activeDetail as MetricId]?.title} 详情数据正在同步...
                          </div>
                        )}
                      </div>

                      {/* Info Modal */}
                      <AnimatePresence>
                        {showInfoModal && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                            onClick={() => setShowInfoModal(false)}
                          >
                            <motion.div
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.95, opacity: 0 }}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-[#1C1D22] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-medium text-white">
                                  {activeDetail === 'battery' ? '核心精力 (Vitality)' : activeDetail === 'burn' ? '负荷水位 (Burn)' : '夜间充能指数 (Morning Readiness)'}
                                </h3>
                                <button onClick={() => setShowInfoModal(false)} className="text-white/50 hover:text-white">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="text-sm text-white/70 leading-relaxed font-light space-y-3">
                                {activeDetail === 'battery' && (
                                  <>
                                    <p className="text-white/90 font-medium mb-2">核心精力 (Vitality / Core Compute)</p>
                                    <p>反映您当前可调用的身心能量总和与实时认知带宽。它代表了中枢神经系统与代谢储备的即时可用性，可能影响您的专注程度与思维敏捷度。</p>
                                    
                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">核心计算维度 (CORE METRICS)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-white/70">实时可用带宽：</strong> 基于晨间基线与日间实时消耗计算出的剩余能量百分比。</li>
                                        <li><strong className="text-white/70">掉电斜率 (Drain Slope)：</strong> 监测每小时的能量流失速率。斜率过陡通常预示着过度消耗或潜在的病理性疲劳。</li>
                                        <li><strong className="text-white/70">高能续航预估：</strong> 系统根据当前消耗强度，为您提供高强度活动持续时间的参考建议。</li>
                                      </ul>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">指导意义 (GUIDANCE)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-emerald-400">充沛 (&gt;80%)：</strong> 巅峰认知状态。适合应对高难度的逻辑思考、深度创作或复杂任务处理。</li>
                                        <li><strong className="text-sky-400">稳健 (40-79%)：</strong> 标准执行状态。适合进行日常事务处理、团队沟通及常规脑力活动。</li>
                                        <li><strong className="text-amber-400">枯竭 (&lt;40%)：</strong> 状态可能欠佳。此时建议适当放缓节奏，或尝试通过“物理干预”与“呼吸干预”来帮助身心状态的平稳恢复。</li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                                {activeDetail === 'burn' && (
                                  <>
                                    <p className="text-white/90 font-medium mb-2">负荷水位 (Allostatic Load / Burn)</p>
                                    <p>追踪您今日持续累积的生理疲劳与心理压力反应。它反映了机体为了应对外部环境与内部任务所付出的“代价”，为您提供预防过度疲劳的参考信息。</p>
                                    
                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">核心计算维度 (CORE METRICS)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-white/70">累计燃耗值：</strong> 自苏醒以来，机体承受的所有应激反应的总和。</li>
                                        <li><strong className="text-white/70">瞬时燃耗等级 (L1-L4)：</strong> 实时监测心率、心率变异性及代谢波动的强度。L4 提示机体可能正处于较高的应激状态。</li>
                                        <li><strong className="text-white/70">机体经济性：</strong> 评估您在同等任务负荷下，生理指标的波动幅度。高经济性意味着您的生理韧性极佳，能以更小的代价完成任务。</li>
                                      </ul>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">指导意义 (GUIDANCE)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-emerald-400">低耗 (L1-L2)：</strong> 理想的稳态。机体正高效管理负荷，未产生明显的疲劳堆积。</li>
                                        <li><strong className="text-amber-400">沸腾 (L3)：</strong> 持续的高压状态。建议关注精力的平稳，可尝试进行 3-5 分钟的呼吸调节以缓解压力。</li>
                                        <li><strong className="text-rose-500">过载 (L4)：</strong> 极限应激状态。建议优先考虑休息与放松，避免持续的高强度负荷，以维护长期的身心健康。</li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                                {activeDetail === 'recharge' && (
                                  <>
                                    <p className="text-white/90 font-medium mb-2">夜间充能指数 (Morning Readiness)</p>
                                    <p>该指数是评估您身体在睡眠期间恢复程度的核心指标，直接决定了您今日精力的初始上限与抗压阈值。</p>
                                    
                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">核心计算维度 (CORE METRICS)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-white/70">自主神经系统 (ANS) 恢复率：</strong> 深度分析睡眠期间的心率变异性 (HRV) 均值与趋势，评估副交感神经的激活程度。</li>
                                        <li><strong className="text-white/70">静息心率 (RHR) 探底效率：</strong> 追踪入睡后心率降至最低点所需的时间。探底越早，身体获得深度恢复的时间越长。</li>
                                        <li><strong className="text-white/70">睡眠结构完整度：</strong> 评估深度睡眠（躯体修复）与快速眼动期 (REM，认知与情绪修复) 的比例与连续性。</li>
                                        <li><strong className="text-white/70">核心体温偏离：</strong> 监测夜间体温相较于个人 30 天基线的微小波动，预警潜在的免疫系统应激或代谢异常。</li>
                                      </ul>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                      <p className="text-white/80 font-medium text-xs">指导意义 (GUIDANCE)</p>
                                      <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
                                        <li><strong className="text-emerald-400">卓越 (&gt;85)：</strong> 身心得到深度修复。适合应对高强度的脑力挑战、体能训练或重要事务处理。</li>
                                        <li><strong className="text-sky-400">良好 (70-84)：</strong> 恢复状态达标。适合进行日常活动，建议根据实际感受安排适度休息。</li>
                                        <li><strong className="text-amber-400">欠佳 (&lt;70)：</strong> 恢复情况可能受限。建议适度降低任务强度，避免过度劳累，可尝试通过正念或拉伸来促进恢复。</li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {measurementModal && (
                <MeasurementModal 
                  type={measurementModal.type} 
                  onClose={() => setMeasurementModal(null)} 
                  onComplete={(value) => {
                    // In a real app, I would update the state of the heart rate/spo2 value here.
                    console.log(`New ${measurementModal.type} value:`, value);
                    setMeasurementModal(null);
                  }}
                />
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {showBaselinePage && <BaselinePage onClose={() => setShowBaselinePage(false)} onCalibrate={() => setIsCalibrated(true)} isCalibrated={isCalibrated} />}
            </AnimatePresence>
          </div>
          
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
  );
}
