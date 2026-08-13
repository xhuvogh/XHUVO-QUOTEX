import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, ShieldCheck, Award, MessageCircle, ExternalLink, 
  TrendingUp, Play, CheckCircle2, Video, Search, Filter, 
  Plus, Send, Sparkles, ChevronDown, Check, Copy, Eye, ArrowLeft,
  Mic, Square, Volume2, Pause, VolumeX
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useStore } from '../context/StoreContext';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  profitAmount: string;
  verified: boolean;
  date: string;
}

interface VocalFeedback {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  profitAmount: string;
  duration: string;
  date: string;
  notesBN: string;
  notesEN: string;
  audioBlobUrl?: string; // Set when user records live
  verified: boolean;
}

interface SocialVideo {
  id: string;
  title: string;
  banglaTitle: string;
  platform: 'TikTok' | 'Telegram' | 'YouTube Shorts';
  traderName: string;
  traderHandle: string;
  avatar: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  views: string;
  likes: string;
  rating: number;
  tags: string[];
  description: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Shakil Hossain',
    role: 'Quotex Trader',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'XHUVO QX INFINITY indicator ta ek kothay osadharon! Real market 1M candle a non-repaint arrow dekhe trade niye 10 tar moddhe 9 tai direct win without martingale. bKash personal a payment korar 5 min er moddhe TradingView a script access peye gechi.',
    profitAmount: '+$1,450 / week',
    verified: true,
    date: '1 day ago'
  },
  {
    id: 't-2',
    name: 'Ariful Islam',
    role: 'Pocket Option Scalper',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Real market 1M binary trading er jonno er theke bhalo indicator Bangladesh a r nai. Pre-alert sound buzzer shune entry neya jay ejonno fast candle miss hoy na. Developer XHUVO bhai khub e helpful Telegram a.',
    profitAmount: '+$2,100 / week',
    verified: true,
    date: '3 days ago'
  },
  {
    id: 't-3',
    name: 'Naimur Rahman',
    role: 'Forex & Binary Trader',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'First e V5 Starter nisi, tarpor profit kore INFINITY te upgrade korsi. 100% non-repaint signals, candle close jawar por arrow kono din shifts ba repaints hoy na. 100% recommended for Bangladeshi traders!',
    profitAmount: '+$3,250 / month',
    verified: true,
    date: '5 days ago'
  },
  {
    id: 't-4',
    name: 'Tanvir Ahmed',
    role: 'Quotex Real Market Trader',
    location: 'Rajshahi, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Nagad a payment kore Telegram a TxID r TradingView username diycilam, instantly script authorization peye gechi. EUR/USD r GBP/USD real market a non-MTG direct wins super accurate!',
    profitAmount: '+$1,850 / week',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 't-5',
    name: 'Mehedi Hasan',
    role: 'Binary Options Pro',
    location: 'Khulna, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Real market EUR/USD and GBP/USD e fast 1M binary entry accurate noise-free signals dey. 15+ AI filters algorithm script ta shotti e top level quality.',
    profitAmount: '+$2,400 / week',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 't-6',
    name: 'Fahim Chowdhury',
    role: 'Live Market Scalper',
    location: 'Barishal, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'XHUVO QX INFINITY kine amar trading losses shob recover hoise. Direct TradingView indicator access + Telegram proofs group er daily update dekhe 100% trust kora jay.',
    profitAmount: '+$2,900 / week',
    verified: true,
    date: '2 weeks ago'
  }
];

const SOCIAL_VIDEOS: SocialVideo[] = [
  {
    id: 'tiktok-main',
    title: 'XHUVO QX INFINITY Perfect Entry Proof',
    banglaTitle: 'টিকটক লাইভ ট্রেড প্রুফ ও ইন্ডিকেটর ফিডব্যাক সেশন।',
    platform: 'TikTok',
    traderName: 'Xhuvo Official Trader',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EA6vQJ/',
    embedUrl: 'https://www.tiktok.com/embed/7667853909330939157',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    views: '48.5K',
    likes: '4.2K',
    rating: 5.0,
    tags: ['TikTok Featured', 'Quotex 1M', 'Non-Repaint'],
    description: 'XHUVO QX INFINITY ইন্ডিকেটর দিয়ে কোটেক্সে ট্রেড করে প্রথম দিনেই ১ মিনিটে ব্যাক-টু-ব্যাক প্রফিট পাওয়া সরাসরি ভিডিও রেকর্ড।'
  },
  {
    id: 'tiktok-clip-2',
    title: 'Quotex 1M Non-Repaint Live Signal Review',
    banglaTitle: 'কোটেক্স ১ মিনিট ট্রেডিং লাইভ সিগন্যাল রিভিউ। ১০০% নন-রিপেইন্ট রেজাল্ট।',
    platform: 'TikTok',
    traderName: 'Bengali Trader Community',
    traderHandle: '@xhuvoofficial8',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EDju3a/',
    embedUrl: 'https://www.tiktok.com/embed/7665250933391101202',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    views: '29.4K',
    likes: '2.7K',
    rating: 5.0,
    tags: ['TikTok Review', 'Binary Strategy', 'Pocket Option'],
    description: 'পকেট অপশন এবং কোটেক্স উভয় মার্কেটেই সমান নিখুঁত কাজ করার সরাসরি ভিডিও।'
  },
  {
    id: 'tiktok-v5',
    title: 'XHUVO QX V5 Ultimate Setup & Strategy Proof',
    banglaTitle: 'কোটেক্স V5 ইন্ডিকেটর এর নিখুঁত সিগন্যাল প্রমাণ এবং সেটআপ গাইড।',
    platform: 'TikTok',
    traderName: 'Pro Trader Shuvo',
    traderHandle: '@xhuvoqx',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EA34fq/',
    embedUrl: 'https://www.tiktok.com/embed/7644545672175242504',
    thumbnailUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=600',
    views: '51.2K',
    likes: '4.9K',
    rating: 5.0,
    tags: ['Xhuvo V5', 'Quotex Live', 'Strategy'],
    description: 'XHUVO QX V5 আল্টিমেট সিগন্যাল সেটআপ এবং কোটেক্স ক্যান্ডেল অ্যাকুরেসি প্রমাণ ভিডিও।'
  },
  {
    id: 'telegram-clip-1',
    title: 'Secured VIP Telegram Feedback Session',
    banglaTitle: 'টেলিগ্রাম ভিআইপি মেম্বার ফিডব্যাক ও সিগন্যাল প্রমাণ সরাসরি ভিডিও রেকর্ড।',
    platform: 'Telegram',
    traderName: 'VIP Telegram Group',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://t.me/c/2946179614/7556',
    embedUrl: 'private-telegram-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    views: '32.1K',
    likes: '3.8K',
    rating: 5.0,
    tags: ['Telegram VIP', 'Live Proof', 'Private Chat'],
    description: 'টেলিগ্রাম ভিআইপি গ্রুপের লাইভ ভিডিও প্রুফ যেখানে প্রতিটা অ্যারো আসার পর সরাসরি লাইভ ট্রেড নেওয়া হয়েছে।'
  },
  {
    id: 'yt-shorts-1',
    title: 'XHUVO QX INFINITY Official Video Walkthrough',
    banglaTitle: 'কোটেক্স মাস্টারক্লাস গাইড: কিভাবে নন-রিপেইন্ট সিগন্যাল ফলো করে ট্রেড করবেন।',
    platform: 'YouTube Shorts',
    traderName: 'Xhuvo Official YouTube',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://youtube.com/shorts/FIJS66YHj8Q?si=5yTj2Ysp8UXZSf0F',
    embedUrl: 'https://www.youtube-nocookie.com/embed/FIJS66YHj8Q?autoplay=1&mute=1&loop=1&playlist=FIJS66YHj8Q&modestbranding=1&rel=0&playsinline=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    views: '65.8K',
    likes: '5.9K',
    rating: 5.0,
    tags: ['YouTube Shorts', 'Official Tutorial', 'No Martingale'],
    description: 'কোনো মার্টিংগেল ছাড়া ডাইরেক্ট উইন স্ট্র্যাটেজি ব্যবহার করে ১ মিনিটে ৪৮০ ডলার লাভ করার ভিডিও প্রমাণ।'
  }
];

interface FeedbackPageProps {
  onBackToStore: () => void;
}

const INITIAL_VOCALS: VocalFeedback[] = [
  {
    id: 'vocal-1',
    name: 'Hasan Mahmud',
    role: 'Quotex VIP Scalper',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$340 / week',
    duration: '0:14',
    date: '1 day ago',
    notesBN: 'ইন্ডিকেটর সিগন্যালগুলো ক্যান্ডেল শুরু হওয়ার আগে থেকেই সাউন্ড অ্যালার্ট দেয়। কাজ করা অনেক সহজ হয়।',
    notesEN: 'The indicator signals play audio alerts before the candle begins. Makes trading so much easier.',
    verified: true
  },
  {
    id: 'vocal-2',
    name: 'Sabina Yeasmin',
    role: '1-Min Binary Scalper',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$180 / week',
    duration: '0:09',
    date: '2 days ago',
    notesBN: 'প্রথম দিনেই ৩টি ওটিসি সিগন্যাল নিয়ে ৩টিতেই প্রফিট পেয়েছি। থ্যাংক ইউ শুভ ভাই!',
    notesEN: 'Took 3 OTC signals on the first day and got profits in all 3. Thank you brother Shuvon!',
    verified: true
  },
  {
    id: 'vocal-3',
    name: 'Rahat Chowdhury',
    role: 'Quotex Day Trader',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$520 / week',
    duration: '0:11',
    date: '3 days ago',
    notesBN: 'টেলিগ্রাম চ্যানেলে মেম্বার প্রুফ দেখে অর্ডার দিয়েছিলাম। ইন্ডিকেটরটি সত্যিই একুরেট।',
    notesEN: 'Ordered after viewing member proof on the Telegram channel. The indicator is indeed highly accurate.',
    verified: true
  }
];

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onBackToStore }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const store = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<'ALL' | 5 | 4>('ALL');
  const [isPlayingTikTok, setIsPlayingTikTok] = useState(false);
  const [activeVideo, setActiveVideo] = useState<SocialVideo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<'ALL' | 'TikTok' | 'Telegram' | 'YouTube Shorts'>('ALL');

  // Vocal Feedback Playback States
  const [playingVocalId, setPlayingVocalId] = useState<string | null>(null);
  const [vocalPlaybackProgress, setVocalPlaybackProgress] = useState<Record<string, number>>({});
  const playbackIntervalsRef = useRef<Record<string, NodeJS.Timeout>>({});
  const audioElementsRef = useRef<Record<string, HTMLAudioElement | null>>({});

  // Voice Recording / Live Microphone States
  const [recorderState, setRecorderState] = useState<'idle' | 'recording' | 'reviewing'>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [audioPermissionError, setAudioPermissionError] = useState(false);
  const [showVoiceRecorderModal, setShowVoiceRecorderModal] = useState(false);

  // Form info for recording submission
  const [voiceForm, setVoiceForm] = useState({
    name: '',
    location: '',
    role: 'Quotex Trader',
    profitAmount: '+$250 / week',
    rating: 5,
  });

  // MediaRecorder Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Quotex Trader',
    location: '',
    rating: 5,
    comment: '',
    profitAmount: '+$300 / week'
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim() || !newReview.location.trim()) {
      showToast(
        language === 'BN' 
          ? 'অনুগ্রহ করে সব তথ্য পূরণ করুন!' 
          : 'Please fill out all fields!', 
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      store.addTestimonial({
        name: newReview.name,
        role: newReview.role,
        location: newReview.location,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&q=80&w=200`,
        rating: newReview.rating,
        comment: newReview.comment,
        profitAmount: newReview.profitAmount.startsWith('+') ? newReview.profitAmount : '+' + newReview.profitAmount,
        verified: true,
        date: language === 'BN' ? 'এইমাত্র' : 'Just now'
      });
      setIsSubmitting(false);
      setShowForm(false);
      setNewReview({
        name: '',
        role: 'Quotex Trader',
        location: '',
        rating: 5,
        comment: '',
        profitAmount: '+$300 / week'
      });

      showToast(
        language === 'BN' 
          ? 'আপনার ফিডব্যাক সফলভাবে সাবমিট হয়েছে এবং যুক্ত করা হয়েছে!' 
          : 'Your feedback was successfully submitted and added!', 
        'success'
      );
    }, 1500);
  };

  const handleCopyLink = (video: SocialVideo) => {
    navigator.clipboard.writeText(video.videoUrl);
    setCopiedId(video.id);
    showToast(`Copied ${video.platform} video link!`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleForwardTelegram = (video: SocialVideo) => {
    const text = encodeURIComponent(`🔥 Check out this XHUVO QX Video Review (${video.title}):\n${video.videoUrl}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(video.videoUrl)}&text=${text}`, '_blank');
  };

  const handleForwardWhatsApp = (video: SocialVideo) => {
    const text = encodeURIComponent(`🔥 Check out this XHUVO QX Video Proof (${video.title}): ${video.videoUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Web Audio Synth melody generator for pre-recorded feedbacks
  const playVocalSynthMelody = (id: string, durationSeconds: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Select notes based on vocal ID
      let notes = [261.63, 329.63, 392.00, 523.25];
      if (id === 'vocal-1') notes = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 523.25];
      if (id === 'vocal-2') notes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
      if (id === 'vocal-3') notes = [329.63, 392.00, 440.00, 392.00, 523.25, 587.33, 659.25];

      let time = ctx.currentTime + 0.1;
      const noteDuration = 0.45;
      const totalNotesCount = Math.floor(durationSeconds / 0.8);
      
      for (let i = 0; i < totalNotesCount; i++) {
        const freq = notes[i % notes.length];
        
        // 1. Success signal oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + noteDuration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + noteDuration + 0.1);
        
        // 2. Human voice muffled simulation
        const buzzOsc = ctx.createOscillator();
        const buzzGain = ctx.createGain();
        buzzOsc.type = 'sawtooth';
        buzzOsc.frequency.setValueAtTime(110 + (i % 3) * 15, time);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500 + Math.sin(i) * 150, time);
        filter.Q.setValueAtTime(2.0, time);
        
        buzzGain.gain.setValueAtTime(0.03, time);
        buzzGain.gain.exponentialRampToValueAtTime(0.001, time + noteDuration - 0.1);
        
        buzzOsc.connect(filter);
        filter.connect(buzzGain);
        buzzGain.connect(ctx.destination);
        
        buzzOsc.start(time);
        buzzOsc.stop(time + noteDuration);
        
        time += 0.75;
      }
    } catch (e) {
      console.warn("Audio synthesizer failed:", e);
    }
  };

  const handlePlayVocal = (vocal: VocalFeedback) => {
    if (playingVocalId) {
      handleStopVocal(playingVocalId);
    }

    setPlayingVocalId(vocal.id);
    const durationParts = vocal.duration.split(':');
    const totalSeconds = parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10);
    
    setVocalPlaybackProgress(prev => ({ ...prev, [vocal.id]: 0 }));

    if (vocal.audioBlobUrl) {
      try {
        const audio = new Audio(vocal.audioBlobUrl);
        audioElementsRef.current[vocal.id] = audio;
        audio.play();
        
        const interval = setInterval(() => {
          if (audio.ended) {
            handleStopVocal(vocal.id);
          } else {
            const progress = (audio.currentTime / audio.duration) * 100;
            setVocalPlaybackProgress(prev => ({ ...prev, [vocal.id]: progress }));
          }
        }, 100);
        
        playbackIntervalsRef.current[vocal.id] = interval;
      } catch (err) {
        showToast("Error playing recorded feedback", "error");
        setPlayingVocalId(null);
      }
    } else {
      playVocalSynthMelody(vocal.id, totalSeconds);
      
      let elapsed = 0;
      const step = 0.1;
      const interval = setInterval(() => {
        elapsed += step;
        const progress = Math.min((elapsed / totalSeconds) * 100, 100);
        setVocalPlaybackProgress(prev => ({ ...prev, [vocal.id]: progress }));
        
        if (elapsed >= totalSeconds) {
          handleStopVocal(vocal.id);
        }
      }, 100);
      
      playbackIntervalsRef.current[vocal.id] = interval;
    }
  };

  const handleStopVocal = (id: string) => {
    if (playbackIntervalsRef.current[id]) {
      clearInterval(playbackIntervalsRef.current[id]);
      delete playbackIntervalsRef.current[id];
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    if (audioElementsRef.current[id]) {
      try {
        audioElementsRef.current[id]?.pause();
        audioElementsRef.current[id] = null;
      } catch (e) {}
    }

    setPlayingVocalId(null);
    setVocalPlaybackProgress(prev => ({ ...prev, [id]: 0 }));
  };

  useEffect(() => {
    return () => {
      Object.keys(playbackIntervalsRef.current).forEach(id => {
        clearInterval(playbackIntervalsRef.current[id]);
      });
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // MICROPHONE RECORDING LOGIC
  const startVoiceRecording = async () => {
    setAudioPermissionError(false);
    audioChunksRef.current = [];
    setRecordingSeconds(0);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      
      analyserRef.current = analyser;
      audioContextRef.current = audioContext;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        setMicVolume(Math.min(Math.round((average / 128) * 100), 100));
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      
      animationFrameRef.current = requestAnimationFrame(updateVolume);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedBlob(audioBlob);
        setRecordedUrl(audioUrl);
        setRecorderState('reviewing');
      };

      mediaRecorder.start();
      setRecorderState('recording');

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.warn("Microphone access denied:", err);
      setAudioPermissionError(true);
      showToast(
        language === 'BN' 
          ? 'মাইক্রোফোন অ্যাক্সেস করতে ব্যর্থ হয়েছে! অনুগ্রহ করে পারমিশন দিন।' 
          : 'Failed to access microphone! Please enable permissions.', 
        'error'
      );
    }
  };

  const stopVoiceRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    setMicVolume(0);
  };

  const cancelVoiceRecording = () => {
    stopVoiceRecording();
    setRecordedBlob(null);
    setRecordedUrl(null);
    setRecordingSeconds(0);
    setRecorderState('idle');
  };

  const saveVoiceRecording = () => {
    if (!voiceForm.name.trim() || !voiceForm.location.trim()) {
      showToast(
        language === 'BN' ? 'অনুগ্রহ করে আপনার নাম ও ঠিকানা প্রদান করুন।' : 'Please enter your name and location.', 
        'error'
      );
      return;
    }

    if (!recordedUrl) {
      showToast(
        language === 'BN' ? 'কোনো অডিও রেকর্ড পাওয়া যায়নি!' : 'No recorded audio feedback found!', 
        'error'
      );
      return;
    }

    const minutes = Math.floor(recordingSeconds / 60);
    const secs = recordingSeconds % 60;
    const durationStr = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;

    store.addVocal({
      name: voiceForm.name,
      role: voiceForm.role,
      location: voiceForm.location,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      rating: voiceForm.rating,
      profitAmount: voiceForm.profitAmount,
      duration: durationStr,
      date: language === 'BN' ? 'এইমাত্র' : 'Just now',
      notesBN: 'রেকর্ডকৃত ভয়েস ফিডব্যাক। মেম্বার কর্তৃক সরাসরি রিভিউ প্রদান করা হয়েছে।',
      notesEN: 'Recorded live voice review. Feedback submitted directly by member.',
      audioBlobUrl: recordedUrl,
      verified: true
    });
    
    cancelVoiceRecording();
    setShowVoiceRecorderModal(false);
    setVoiceForm({
      name: '',
      location: '',
      role: 'Quotex Trader',
      profitAmount: '+$250 / week',
      rating: 5,
    });

    showToast(
      language === 'BN' 
        ? 'আপনার ভয়েস ফিডব্যাক সফলভাবে আপলোড হয়েছে!' 
        : 'Your voice feedback has been successfully uploaded!', 
      'success'
    );
  };

  // Filter & Search logic
  const filteredTestimonials = store.testimonials.filter(t => {
    if (t.private) return false;
    if (t.showOnFeedbackPage === false) return false;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'ALL' || t.rating === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const filteredVocals = store.vocals.filter(v => {
    if (v.private) return false;
    if (v.showOnFeedbackPage === false) return false;
    return true;
  });

  const filteredVideos = store.videos.filter(v => {
    if (v.private) return false;
    if (v.showOnFeedbackPage === false) return false;
    if (selectedVideoCategory !== 'ALL' && v.platform !== selectedVideoCategory) return false;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#06040d] text-slate-100 font-sans pb-28 md:pb-8 relative shadow-2xl">
      {/* Background Orbs */}
      <div className="ambient-orb-purple top-10 left-10" />
      <div className="ambient-orb-cyan bottom-10 right-10" />
      <div className="ambient-orb-pink top-1/2 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10 space-y-16">
        
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <button
            onClick={onBackToStore}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 font-mono font-bold text-xs flex items-center gap-2 hover:bg-purple-900/20 transition-all cursor-pointer hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'BN' ? 'স্টোরে ফিরে যান' : 'BACK TO STORE'}</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/30">
            <Award className="w-4 h-4 text-purple-400" />
            <span>{language === 'BN' ? '১০০% ভেরিফাইড মেম্বার রিভিউ এবং ট্রেডিং প্রুফ' : '100% VERIFIED MEMBER REVIEWS & TRADING PROOF'}</span>
          </div>
        </div>

        {/* PAGE INTRO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-mono text-white">
            {language === 'BN' ? (
              <>মেম্বার <span className="gradient-text-purple-pink">ফিডব্যাক ও লাইভ প্রমাণ</span></>
            ) : (
              <>MEMBERS <span className="gradient-text-purple-pink">FEEDBACK &amp; LIVE PROOF</span></>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            {language === 'BN' ? (
              'আমাদের ৮,৪০০+ সফল কোটেক্স ট্রেডারদের রিয়েল প্রফিট স্ক্রিনশট, অডিও অ্যালার্ট এবং ভিডিও প্রুফ ফিডব্যাক। আপনার নিজের রিভিউ ও লাভ শেয়ার করুন।'
            ) : (
              'Verified trading results, profit screenshots, feedback recordings, and audio pre-alert confirmations from our community of over 8,400+ active traders.'
            )}
          </p>
        </div>

        {/* PERFORMANCE STATS MODULE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bento-card p-5 text-center flex flex-col justify-center items-center rounded-2xl border border-purple-500/20 shadow-md">
            <div className="text-2xl sm:text-4xl font-bold font-mono text-white">8,400+</div>
            <div className="text-xs text-purple-300 font-mono mt-1 uppercase">{language === 'BN' ? 'সক্রিয় ট্রেডার' : 'ACTIVE TRADERS'}</div>
          </div>
          <div className="bento-card p-5 text-center flex flex-col justify-center items-center rounded-2xl border border-purple-500/20 shadow-md">
            <div className="text-2xl sm:text-4xl font-bold font-mono text-amber-400 flex items-center justify-center gap-1">⭐ 4.9</div>
            <div className="text-xs text-purple-300 font-mono mt-1 uppercase">{language === 'BN' ? 'গড় রেটিং' : 'AVERAGE RATING'}</div>
          </div>
          <div className="bento-card p-5 text-center flex flex-col justify-center items-center rounded-2xl border border-purple-500/20 shadow-md">
            <div className="text-2xl sm:text-4xl font-bold font-mono text-emerald-400">95.0%</div>
            <div className="text-xs text-purple-300 font-mono mt-1 uppercase">{language === 'BN' ? 'সিগন্যাল নির্ভুলতা' : 'SIGNAL ACCURACY'}</div>
          </div>
          <div className="bento-card p-5 text-center flex flex-col justify-center items-center rounded-2xl border border-purple-500/20 shadow-md">
            <div className="text-2xl sm:text-4xl font-bold font-mono text-purple-400">100%</div>
            <div className="text-xs text-purple-300 font-mono mt-1 uppercase">{language === 'BN' ? 'নন-রিপেইন্ট রেজাল্ট' : 'NON-REPAINT PROOF'}</div>
          </div>
        </div>

        {/* VIDEO FEEDBACK CATEGORY & HUB - REMOVED */}
        {false && <div className="space-y-8 pt-8 border-t border-purple-500/20">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono">
              <Video className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>{language === 'BN' ? '১. ভিডিও রিভিউ ও প্রুফ' : '1. VIDEO REVIEWS & PROOF'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight uppercase">
              {language === 'BN' ? 'লাইভ ভিডিও ফিডব্যাক' : 'Trader Video Feedbacks'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans">
              {language === 'BN' ? 'ইউটিউব শর্টস, টিকটক এবং টেলিগ্রাম লাইভ সেশনের ভিডিও প্রুফ দেখুন ও বন্ধুদের ফরওয়ার্ড করুন।' : 'Watch authentic recorded trade sessions, signal buzzer confirmations, and live reviews from social networks.'}
            </p>
          </div>

          {/* FEATURED TIKTOK VIDEO REVIEW CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto liquid-glass-modal rounded-[24px] p-6 sm:p-8 border border-purple-400/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_55px_rgba(168,85,247,0.4)] relative overflow-hidden animate-breathing-glow"
          >
            {/* Header Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-500/30">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(217,70,239,0.5)] animate-pulse-badge">
                  <Video className="w-3.5 h-3.5" />
                  {language === 'BN' ? 'বিশেষ ফিডব্যাক ভিডিও রিভিউ' : 'FEATURED TIKTOK VIDEO REVIEW'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-purple-300">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>{language === 'BN' ? '১০০% নন-রিপেইন্ট গ্যারান্টি' : 'VERIFIED TRADER • 100% NON-REPAINT PROOF'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* TikTok Video Embed / Player Box */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950 aspect-[9/16] max-h-[440px] mx-auto w-full flex items-center justify-center group">
                {!isPlayingTikTok ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/60 to-slate-950/80 flex flex-col items-center justify-between p-6 text-center">
                    <div className="w-full flex justify-between items-center text-xs font-mono text-purple-200">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 border border-purple-400/40">TikTok @xhuvoofficial</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-current" /> 5.0 Star</span>
                    </div>

                    <div className="space-y-4 my-auto flex flex-col items-center">
                      <button
                        onClick={() => setIsPlayingTikTok(true)}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-110 transition-transform cursor-pointer border-2 border-white/40 group-hover:shadow-[0_0_50px_rgba(217,70,239,0.9)]"
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </button>
                      <p className="text-[11px] font-mono text-purple-200 font-bold animate-pulse">
                        {language === 'BN' ? 'প্লে করতে ক্লিক করুন' : 'CLICK TO PLAY LIVE TIKTOK VIDEO'}
                      </p>
                    </div>

                    <div className="w-full text-left space-y-1 bg-black/60 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                      <p className="text-xs font-bold text-white font-sans">XHUVO QX INFINITY 95% Accuracy Live Trade Proof</p>
                      <p className="text-[11px] text-slate-300 font-sans line-clamp-2">"কোটেক্স ১ মিনিট ট্রেডিং লাইভ সিগন্যাল রিভিউ। ১০০% নন-রিপেইন্ট রেজাল্ট।"</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative bg-slate-950 flex flex-col items-center justify-center p-2">
                    <iframe
                      src="https://www.tiktok.com/embed/7667853909330939157"
                      title="Xhuvo QX TikTok Video Review"
                      className="w-full h-full rounded-xl border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {/* TikTok Review Info & Direct Action */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-tight">
                    {language === 'BN' ? '১ম দিনেই ব্যাক-টু-ব্যাক প্রফিট' : 'LIVE TIKTOK SIGNAL PROOF REVIEW'}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-300 font-sans leading-relaxed">
                    {language === 'BN' ? (
                      '"XHUVO QX INFINITY ইন্ডিকেটর দিয়ে কোটেক্সে ট্রেড করে প্রথম দিনেই ১ মিনিটে ব্যাক-টু-ব্যাক প্রফিট পেয়েছি! ১০০% নন-রিপেইন্ট অ্যারো সিগন্যাল এবং ৫-১০ সেকেন্ডের আগে অডিও অ্যালার্ট দিয়ে দেয়।"'
                    ) : (
                      '"XHUVO QX INFINITY indicator allows back-to-back 1M direct wins on real market easily. The pre-alert buzzer is insanely fast and lets you enter right as the candle starts!"'
                    )}
                  </p>
                </div>

                {/* Verified Highlights */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'BN' ? '১মিনিট এবং ৫ মিনিট ডাইরেক্ট উইন নন-মার্টিংগেল স্ট্র্যাটেজি' : '1M & 5M Direct Non-MTG Win Strategy'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'BN' ? '৫-১০ সেকেন্ড আগে অগ্রিম অডিও নোটিফিকেশন অ্যালার্ট' : '5-10 Seconds Pre-Alert Sound Confirmation'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'BN' ? 'ট্রেডিংভিউ স্ক্রিপ্ট মেম্বারশিপ এক্সেস গ্যারান্টি' : 'Verified TradingView Community Script Authorization'}</span>
                  </div>
                </div>

                {/* Direct Link to TikTok Video */}
                <div className="pt-3">
                  <a
                    href="https://vt.tiktok.com/ZS4EA6vQJ/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl liquid-glass-button text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),0_0_25px_rgba(217,70,239,0.6)] btn-neon-glow hover:scale-[1.03] transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-fuchsia-300" />
                    <span>{language === 'BN' ? 'টিকটকে সরাসরি ভিডিও দেখুন' : 'WATCH LIVE ON TIKTOK'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Social Video Clips Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {(['ALL', 'TikTok', 'Telegram', 'YouTube Shorts'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedVideoCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  selectedVideoCategory === cat
                    ? 'liquid-glass-button text-white font-bold border border-fuchsia-400/60 shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-105'
                    : 'liquid-glass text-slate-300 hover:text-white hover:border-purple-500/40 hover:scale-[1.02]'
                }`}
              >
                {cat === 'ALL' ? '🔥 ALL CLIPS' : `${cat.toUpperCase()}`}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bento-card rounded-2xl p-4 sm:p-5 border border-purple-500/10 flex flex-col justify-between space-y-4 shadow-lg group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={video.avatar} alt={video.traderName} className="w-8 h-8 rounded-full object-cover border border-purple-500/30" />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white leading-tight">{video.traderName}</h4>
                      <span className="text-[10px] text-purple-400 font-mono">{video.traderHandle}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">{video.platform}</span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-purple-500/20">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-white">
                      <span className="bg-black/60 px-2 py-0.5 rounded-full flex items-center gap-1"><Eye className="w-3 h-3 text-purple-300" /> {video.views}</span>
                      <span className="bg-black/60 px-2 py-0.5 rounded-full text-amber-300 flex items-center gap-1 font-bold">★ {video.rating}</span>
                    </div>
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="mx-auto my-auto w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center border border-white/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(168,85,247,0.6)] cursor-pointer"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                    <div className="flex gap-1">
                      {video.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="bg-slate-900/80 text-[8px] font-mono px-1.5 py-0.5 rounded text-slate-300 border border-white/5">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <h3 className="text-xs font-bold text-white font-mono line-clamp-1 group-hover:text-fuchsia-300">{video.title}</h3>
                  <p className="text-[11px] text-slate-300 italic line-clamp-2">"{video.banglaTitle}"</p>
                </div>

                <div className="pt-2 border-t border-purple-500/10 grid grid-cols-3 gap-1.5">
                  <button onClick={() => handleForwardTelegram(video)} className="py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-400/20 text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer">
                    <Send className="w-3 h-3" /> <span>Telegram</span>
                  </button>
                  <button onClick={() => handleForwardWhatsApp(video)} className="py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/20 text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer">
                    <MessageCircle className="w-3 h-3" /> <span>WhatsApp</span>
                  </button>
                  <button onClick={() => handleCopyLink(video)} className="py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-400/20 text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer">
                    {copiedId === video.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* CSS KEYFRAME ANIMATIONS FOR VOICE SPECTRUM AND RECORD PULSE */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bounceAudioWave {
            0% { height: 15%; }
            50% { height: 85%; }
            100% { height: 30%; }
          }
          @keyframes recordPulse {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
          @keyframes glowRipple {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
        `}} />

        {/* VOCAL FEEDBACKS & AUDIO PROOF BOARD - REMOVED */}
        {false && <div className="space-y-8 pt-12 border-t border-purple-500/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-left space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
                <Mic className="w-3.5 h-3.5 text-pink-400" />
                <span>{language === 'BN' ? '২. ভয়েস ফিডব্যাক ও অডিও প্রুফ' : '2. MEMBER VOCAL REVIEWS & AUDIO PROOF'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight uppercase">
                {language === 'BN' ? 'সরাসরি মেম্বার ভয়েস রিভিউ' : 'Verified Audio Feedbacks'}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-sans">
                {language === 'BN' ? 'আমাদের মেম্বারদের অডিও প্রমাণ শুনুন অথবা নিজের ট্রেড ফিডব্যাক রেকর্ড করে সরাসরি সাবমিট করুন।' : 'Listen to verified voice testimonials from active members or record your own voice review directly.'}
              </p>
            </div>

            <button
              onClick={() => {
                setAudioPermissionError(false);
                setRecorderState('idle');
                setShowVoiceRecorderModal(true);
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-pulse"
            >
              <Mic className="w-4 h-4" />
              <span>{language === 'BN' ? 'ভয়েস ফিডব্যাক রেকর্ড করুন' : 'RECORD VOICE FEEDBACK'}</span>
            </button>
          </div>

          {/* VOCAL REVIEW CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredVocals.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bento-card rounded-2xl p-5 border border-purple-500/20 relative flex flex-col justify-between hover:border-pink-500/40 shadow-lg group transition-all"
              >
                <div>
                  {/* User Info Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={v.avatar} 
                      alt={v.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]" 
                    />
                    <div className="text-left">
                      <div className="flex items-center space-x-1">
                        <h4 className="font-bold text-white text-xs sm:text-sm font-sans">{v.name}</h4>
                        {v.verified && <ShieldCheck className="w-3.5 h-3.5 text-pink-400 fill-pink-400/10" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">{v.role} • {v.location}</p>
                    </div>
                  </div>

                  {/* Rating & Earnings badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(v.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-mono font-bold text-[10px] sm:text-xs">
                      {v.profitAmount}
                    </span>
                  </div>

                  {/* CUSTOM INTEGRATED AUDIO PLAYER WAVEFORM */}
                  <div className="bg-[#0f0925] border border-purple-500/25 rounded-2xl p-3.5 mb-4 flex items-center space-x-3.5">
                    <button
                      onClick={() => playingVocalId === v.id ? handleStopVocal(v.id) : handlePlayVocal(v)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 ${
                        playingVocalId === v.id
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                          : 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105'
                      }`}
                    >
                      {playingVocalId === v.id ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-pink-300 font-bold mb-1.5">
                        <span>{playingVocalId === v.id ? (v.audioBlobUrl ? 'PLAYING RECORDING...' : 'PLAYING SYNTH...') : 'VOCAL REVIEW'}</span>
                        <span>{v.duration}</span>
                      </div>

                      {/* Waveform Visualization Bars */}
                      <div className="flex items-end justify-between h-7 gap-[2px] pt-1">
                        {[...Array(24)].map((_, i) => {
                          const progress = vocalPlaybackProgress[v.id] || 0;
                          const isPlayed = (i / 24) * 100 <= progress;
                          
                          // Dynamic heights for fake waveform shape
                          const heightPattern = [30, 45, 65, 80, 50, 35, 60, 75, 90, 80, 55, 40, 60, 85, 70, 50, 45, 60, 75, 50, 30, 45, 60, 40];
                          const heightVal = heightPattern[i % heightPattern.length];

                          return (
                            <div
                              key={i}
                              className={`w-full rounded-full transition-all duration-200 ${
                                isPlayed 
                                  ? 'bg-pink-500' 
                                  : 'bg-purple-950 border-r border-purple-900/35'
                              }`}
                              style={{
                                height: `${heightVal}%`,
                                animation: playingVocalId === v.id ? `bounceAudioWave 0.5s ease-in-out ${i * 0.04}s infinite alternate` : 'none'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Verbal Comment Subtitle Card */}
                  <div className="text-xs bg-purple-950/20 border border-purple-500/10 p-3 rounded-xl text-left leading-relaxed font-sans mb-4">
                    <p className="text-slate-200">
                      "{language === 'BN' ? v.notesBN : v.notesEN}"
                    </p>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 font-mono pt-2.5 border-t border-purple-500/10 flex justify-between">
                  <span>{language === 'BN' ? 'যাচাইকৃত অডিও ফিডব্যাক' : 'VERIFIED VOICE PROOF'}</span>
                  <span>{v.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>}

        {/* WRITTEN TESTIMONIALS & RESULTS BOARD */}
        <div className="space-y-8 pt-12 border-t border-purple-500/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-left space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <MessageCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>{language === 'BN' ? '১. লিখিত রিভিউ বোর্ড' : '1. WRITTEN REVIEWS BOARD'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight uppercase">
                {language === 'BN' ? 'মেম্বারদের ট্রেডিং প্রুফ ও রিভিউ' : 'Verified Customer Testimonials'}
              </h2>
            </div>

            {/* ACTION FOR SUBMITTING FEEDBACK */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'BN' ? 'ফিডব্যাক সাবমিট করুন' : 'WRITE A TESTIMONIAL'}</span>
            </button>
          </div>

          {/* EXPANDABLE REVIEW SUBMISSION FORM */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <form 
                  onSubmit={handleFormSubmit}
                  className="bento-card p-6 sm:p-8 rounded-2xl border-2 border-purple-500/30 bg-[#0c081e]/80 space-y-5 max-w-3xl mx-auto shadow-2xl relative"
                >
                  <div className="absolute top-4 right-4 text-purple-400 animate-pulse">
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-fuchsia-400" />
                    <span>{language === 'BN' ? 'আপনার ট্রেডিং রিভিউ ও লাভ শেয়ার করুন' : 'Share Your Profit & Review Session'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'আপনার নাম' : 'Your Full Name'}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Shakil Hossain"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-white outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'আপনার জেলা/শহর' : 'Your Location (City, Country)'}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Dhaka, Bangladesh"
                        value={newReview.location}
                        onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-white outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'ট্রেডিং মেথড' : 'Trading Role / Broker Style'}</label>
                      <select 
                        value={newReview.role}
                        onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-purple-200 outline-none focus:border-fuchsia-500 cursor-pointer"
                      >
                        <option value="Quotex Trader">Quotex Scalper</option>
                        <option value="Pocket Option Scalper">Pocket Option Scalper</option>
                        <option value="Binary Options Pro">Binary Options Pro</option>
                        <option value="TradingView Analyst">TradingView Analyst</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'মোট লাভ (সপ্তাহ বা মাসে)' : 'Total Earnings / Profit amount'}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. +$450 / week or +৳12,000 / week"
                        value={newReview.profitAmount}
                        onChange={(e) => setNewReview({...newReview, profitAmount: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-white outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'ইন্ডিকেটর রেটিং (স্টার)' : 'Indicator Rating Stars'}</label>
                      <div className="flex items-center space-x-2 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className="focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                star <= newReview.rating 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-600'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-mono text-purple-300 font-bold block uppercase">{language === 'BN' ? 'আপনার মন্তব্য/মতামত (বাংলা অথবা ইংরেজি)' : 'Your Feedback Review Comment'}</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder={language === 'BN' ? 'XHUVO QX ইন্ডিকেটর নিয়ে আপনার অভিজ্ঞতা কেমন? কতবার উইন পেয়েছেন?' : 'Describe your trade sessions, profit consistency, ease of payment and overall feedback.'}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs sm:text-sm text-white outline-none focus:border-fuchsia-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-xl text-white font-mono font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (language === 'BN' ? 'ফিডব্যাক সাবমিট হচ্ছে...' : 'SUBMITTING REVIEW...') : (language === 'BN' ? 'লাইভ ফিডব্যাক সাবমিট করুন' : 'SUBMIT TESTIMONIAL NOW')}</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEARCH, FILTER & STATS CONTROL PANEL */}
          <div className="bento-card p-4 sm:p-5 rounded-2xl border border-purple-500/20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input 
                type="text" 
                placeholder={language === 'BN' ? 'নাম বা লোকেশন দিয়ে খুঁজুন...' : 'Search reviews or city...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filter:
              </span>
              <button 
                onClick={() => setRatingFilter('ALL')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${ratingFilter === 'ALL' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
              >
                All Rating
              </button>
              <button 
                onClick={() => setRatingFilter(5)} 
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${ratingFilter === 5 ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
              >
                ★ 5 Stars
              </button>
              <button 
                onClick={() => setRatingFilter(4)} 
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${ratingFilter === 4 ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
              >
                ★ 4 Stars
              </button>
            </div>
          </div>

          {/* TESTIMONIALS CARDS INTERACTIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bento-card rounded-2xl p-5 border border-purple-500/20 relative flex flex-col justify-between hover:border-purple-400/50 shadow-md group transition-all"
                >
                  <div>
                    {/* User Profile Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]" 
                      />
                      <div className="text-left">
                        <div className="flex items-center space-x-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm font-sans">{t.name}</h4>
                          {t.verified && <ShieldCheck className="w-3.5 h-3.5 text-purple-400 fill-purple-400/10" />}
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">{t.role} • {t.location}</p>
                      </div>
                    </div>

                    {/* Rating and Earnings Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono font-bold text-[10px] sm:text-xs">
                        {t.profitAmount}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4 font-sans text-left">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="text-[9px] text-slate-400 font-mono pt-2.5 border-t border-purple-500/10 flex items-center justify-between">
                    <span>{language === 'BN' ? 'যাচাইকৃত ট্রেডার' : 'VERIFIED TRADER'}</span>
                    {t.date.startsWith('t.me/') ? (
                      <a
                        href={`https://${t.date}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 font-bold flex items-center space-x-1"
                      >
                        <span>Telegram Proof</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span>{t.date}</span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bento-card border border-purple-500/20 rounded-2xl max-w-xl mx-auto space-y-4">
                <Star className="w-12 h-12 text-slate-600 mx-auto animate-spin" />
                <h3 className="text-base font-bold font-mono text-white">{language === 'BN' ? 'কোনো রিভিউ পাওয়া যায়নি' : 'No Reviews Found'}</h3>
                <p className="text-xs text-slate-400 font-sans">{language === 'BN' ? 'অনুগ্রহ করে ভিন্ন কোনো কীওয়ার্ড দিয়ে অনুসন্ধান করুন।' : 'Try adjusting your search criteria or write a testimonial to be the first!'}</p>
              </div>
            )}
          </div>
        </div>

        {/* TELEGRAM BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center bento-card p-6 sm:p-8 max-w-3xl mx-auto rounded-[24px] space-y-4 border border-purple-500/20 shadow-xl"
        >
          <div className="flex items-center justify-center space-x-2 text-purple-300 font-mono font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>{language === 'BN' ? 'ডেইলি লাইভ প্রফিট স্ক্রিনশট ও মেম্বার ফিডব্যাক' : 'DAILY LIVE PROFIT SCREENSHOTS & FEEDBACK'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {language === 'BN' ? (
              'আমাদের পাবলিক টেলিগ্রাম চ্যানেলে যুক্ত হয়ে প্রতিদিনের লাইভ ভিডিও প্রুফ, কোটেক্স প্রফিট স্ক্রিনশট এবং মেম্বারদের সরাসরি ট্রেড ফিডব্যাক দেখুন।'
            ) : (
              'Join our official public Telegram channel to view daily video proof, Quotex win screenshots, and trader feedback updated every session.'
            )}
          </p>
          <a
            href="https://t.me/+K8Kjxh16WjdlYTQ1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl liquid-glass-button font-bold text-xs text-white shadow-lg shadow-purple-500/20 btn-neon-glow hover:scale-[1.03] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-purple-300" />
            <span>{language === 'BN' ? 'টেলিগ্রাম প্রুফ চ্যানেল ভিজিট করুন' : 'VIEW LIVE TELEGRAM PROOF'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>

      {/* FULLSCREEN SOCIAL VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="liquid-glass-modal rounded-[24px] border-2 border-fuchsia-400/60 max-w-3xl w-full p-6 relative shadow-[0_0_80px_rgba(217,70,239,0.6)] space-y-4">
            
            <div className="flex justify-between items-center border-b border-purple-500/30 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-ping" />
                <h3 className="text-sm font-mono font-bold text-white uppercase">{activeVideo.platform} Video Review</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-mono font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video mx-auto bg-slate-950 border border-purple-500/40 w-full flex items-center justify-center">
              {activeVideo.embedUrl === 'private-telegram-video' ? (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center bg-[#090514]/90 backdrop-blur-sm z-10 font-sans">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-sky-400">
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">TELEGRAM SECURED VIDEO</span>
                    <span>VIP CHANNEL ONLY</span>
                  </div>
                  
                  <div className="space-y-4 my-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center animate-bounce">
                      <Send className="w-8 h-8 fill-sky-500/10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wide">
                        🔐 সুরক্ষিত টেলিগ্রাম ভিআইপি ভিডিও
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        এটি একটি সংরক্ষিত টেলিগ্রাম ভিডিও যা শুধুমাত্র আমাদের VIP মেম্বারদের জন্য। ভিডিওটি সরাসরি আপনার টেলিগ্রাম অ্যাপে দেখতে নিচের <strong>"Open App / ভিডিও দেখুন"</strong> বাটনে ক্লিক করুন।
                      </p>
                    </div>
                  </div>

                  <a 
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(14,165,233,0.4)] transition"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>টেলিগ্রাম অ্যাপে দেখুন (Open in Telegram)</span>
                  </a>
                </div>
              ) : (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full rounded-xl border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>

            <div className="space-y-2 text-left">
              <h4 className="text-sm font-bold text-white font-mono">{activeVideo.title}</h4>
              <p className="text-xs text-purple-200 font-sans">{activeVideo.banglaTitle}</p>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => handleForwardTelegram(activeVideo)}
                className="flex-1 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-sky-400/40 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Forward Telegram
              </button>
              <a
                href={activeVideo.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl liquid-glass-button text-white font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" /> Open App
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FULLSCREEN LIVE VOICE RECORDER MODAL */}
      {showVoiceRecorderModal && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="liquid-glass-modal rounded-[28px] border-2 border-pink-500/40 max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_80px_rgba(236,72,153,0.3)] space-y-6 my-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-pink-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-black font-mono text-white uppercase tracking-tight">
                    {language === 'BN' ? 'নতুন ভয়েস রিভিউ রেকর্ডার' : 'LIVE VOICE RECORDER'}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-pink-300 font-sans">
                    {language === 'BN' ? 'আপনার আসল ভয়েস রেকর্ড করে লাভ এবং ইন্ডিকেটর রিভিউ প্রদান করুন।' : 'Record your real voice review and share your indicator experience with others.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  cancelVoiceRecording();
                  setShowVoiceRecorderModal(false);
                }}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-mono font-bold cursor-pointer border border-white/10"
              >
                ✕
              </button>
            </div>

            {/* Grid content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* FORM COLUMN */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h4 className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider">
                  {language === 'BN' ? '১. আপনার প্রোফাইল তথ্য' : '1. YOUR PROFILE DETAILS'}
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">{language === 'BN' ? 'সম্পূর্ণ নাম' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      placeholder={language === 'BN' ? 'যেমন: সাকিব হাসান' : 'e.g. Shakib Hasan'}
                      value={voiceForm.name}
                      onChange={(e) => setVoiceForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/20 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">{language === 'BN' ? 'শহর / ঠিকানা' : 'Location'}</label>
                      <input 
                        type="text" 
                        placeholder={language === 'BN' ? 'যেমন: ঢাকা' : 'e.g. Dhaka'}
                        value={voiceForm.location}
                        onChange={(e) => setVoiceForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/20 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">{language === 'BN' ? 'সাপ্তাহিক প্রফিট' : 'Weekly Profit'}</label>
                      <input 
                        type="text" 
                        placeholder="+$350 / week"
                        value={voiceForm.profitAmount}
                        onChange={(e) => setVoiceForm(prev => ({ ...prev, profitAmount: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/20 text-xs text-white outline-none focus:border-pink-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">{language === 'BN' ? 'রোল / উপাধি' : 'Trader Designation'}</label>
                      <input 
                        type="text" 
                        placeholder="Quotex VIP Member"
                        value={voiceForm.role}
                        onChange={(e) => setVoiceForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/20 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">{language === 'BN' ? 'রেটিং প্রদান করুন' : 'Rate Your Experience'}</label>
                      <div className="flex items-center space-x-1.5 h-10">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setVoiceForm(prev => ({ ...prev, rating: star }))}
                            className="text-slate-600 hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                star <= voiceForm.rating 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-600'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE VOICE CONSOLE */}
              <div className="md:col-span-5 bento-card border border-purple-500/25 rounded-2xl p-5 flex flex-col justify-between items-center text-center relative overflow-hidden bg-slate-950/60">
                <h4 className="text-[10px] font-mono font-bold text-pink-300 uppercase tracking-wider self-start mb-2">
                  {language === 'BN' ? '২. অডিও রেকর্ডার' : '2. AUDIO RECORDER CONSOLE'}
                </h4>

                {/* IDLE RECORDING VIEW */}
                {recorderState === 'idle' && (
                  <div className="my-auto py-4 space-y-4 flex flex-col items-center">
                    <button
                      onClick={startVoiceRecording}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] group border border-white/25 animate-pulse"
                    >
                      <Mic className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                    </button>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white font-mono">
                        {language === 'BN' ? 'রেকর্ড করতে চাপুন' : 'TAP TO RECORD'}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal max-w-[180px] mx-auto font-sans">
                        {language === 'BN' ? 'আপনার মাইক্রোফোন ব্যবহার করে অন্তত ৫ সেকেন্ড ফিডব্যাক বলুন।' : 'Uses your microphone to capture real high-quality trader testimonials.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* ACTIVE RECORDING VIEW */}
                {recorderState === 'recording' && (
                  <div className="my-auto py-3 space-y-4 flex flex-col items-center w-full">
                    {/* Recording status with pulse ring */}
                    <div className="relative">
                      <button
                        onClick={stopVoiceRecording}
                        className="w-20 h-20 rounded-full bg-red-600 hover:scale-105 text-white flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                        style={{ animation: 'recordPulse 1.5s infinite' }}
                      >
                        <Square className="w-8 h-8 fill-current" />
                      </button>
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-black animate-ping" />
                    </div>

                    <div className="space-y-1 w-full">
                      <span className="font-mono text-2xl font-black text-red-500 tracking-wider">
                        {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60) < 10 ? '0' : ''}{recordingSeconds % 60}
                      </span>
                      <p className="text-[10px] text-red-400 font-mono font-bold animate-pulse">
                        {language === 'BN' ? 'লাইভ রেকর্ডিং হচ্ছে...' : 'MICROPHONE LIVE RECORDING...'}
                      </p>
                    </div>

                    {/* Microphone Volume Visualizer Bars */}
                    <div className="flex items-end justify-center gap-1.5 h-10 w-full px-2">
                      {[...Array(12)].map((_, i) => {
                        const scaleVal = micVolume > 0 ? (micVolume / 100) : 0.15;
                        const heightFactor = [20, 45, 75, 95, 60, 40, 65, 85, 100, 70, 45, 20];
                        const computedHeight = Math.max(10, Math.round(heightFactor[i % 12] * scaleVal));
                        return (
                          <div 
                            key={i} 
                            className="w-1.5 rounded-full bg-gradient-to-t from-pink-500 to-red-500 transition-all duration-75"
                            style={{ height: `${computedHeight}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* REVIEWING RECORDED AUDIO VIEW */}
                {recorderState === 'reviewing' && (
                  <div className="my-auto py-2 space-y-4 flex flex-col items-center w-full">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-1 w-full">
                      <p className="text-xs font-bold text-white font-mono uppercase text-emerald-400">
                        {language === 'BN' ? 'রেকর্ডিং সম্পন্ন!' : 'RECORDING SUCCESSFUL!'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {language === 'BN' ? `মোট সময়: ${recordingSeconds} সেকেন্ড` : `Duration: ${recordingSeconds}s`}
                      </p>
                    </div>

                    {/* Live Playback audio element */}
                    {recordedUrl && (
                      <audio 
                        src={recordedUrl} 
                        controls 
                        className="w-full max-w-[200px] h-9 outline-none border border-purple-500/20 rounded-lg bg-slate-900"
                      />
                    )}

                    <button
                      onClick={cancelVoiceRecording}
                      className="px-4 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/10 text-red-400 font-mono text-[10px] cursor-pointer transition-colors"
                    >
                      {language === 'BN' ? 'পুনরায় রেকর্ড করুন' : 'Discard & Record Again'}
                    </button>
                  </div>
                )}

                {/* Error placeholder */}
                {audioPermissionError && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
                    <VolumeX className="w-10 h-10 text-red-500 mb-2" />
                    <p className="text-xs font-bold text-white font-mono uppercase">{language === 'BN' ? 'অ্যাক্সেস ব্লকড!' : 'Permission Blocked'}</p>
                    <p className="text-[10px] text-slate-400 max-w-[160px] leading-relaxed mt-1 font-sans">
                      {language === 'BN' ? 'ব্রাউজার সেটিংস থেকে মাইক্রোফোন পারমিশন সচল করে পুনরায় চেষ্টা করুন।' : 'Please grant microphone access permission in your browser setting to record audio reviews.'}
                    </p>
                    <button 
                      onClick={() => setAudioPermissionError(false)}
                      className="mt-3 px-3.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-[9px] cursor-pointer"
                    >
                      Retry Check
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Action Buttons footer */}
            <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  cancelVoiceRecording();
                  setShowVoiceRecorderModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 font-mono font-bold text-xs border border-white/10 cursor-pointer"
              >
                {language === 'BN' ? 'বাতিল করুন' : 'CANCEL'}
              </button>
              <button
                disabled={recorderState !== 'reviewing'}
                onClick={saveVoiceRecording}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:scale-[1.01] active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'BN' ? 'ভয়েস ফিডব্যাক পোস্ট করুন' : 'POST VOICE TESTIMONIAL NOW'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
