import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Volume2, 
  VolumeX, 
  Check, 
  Eye, 
  Search, 
  CornerUpRight, 
  ExternalLink, 
  Globe, 
  Languages,
  User,
  Heart,
  Sparkles
} from 'lucide-react';

// Interfaces for our simulated Telegram posts
interface TelegramMessage {
  id: string;
  forwardedFrom: string;
  avatarColor: string; // Tailwind class
  imageUrl: string;
  imageAlt: string;
  textBN: string;
  textEN: string;
  time: string;
  views: number;
  date: string;
  channelLink: string;
  initialReactions: {
    emoji: string;
    count: number;
    userReacted: boolean;
  }[];
}

export const TelegramProofFeed: React.FC = () => {
  const [messages, setMessages] = useState<TelegramMessage[]>([
    {
      id: 'tg-1',
      forwardedFrom: 'RONY VHAI 📊',
      avatarColor: 'from-orange-500 to-amber-600',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600',
      imageAlt: 'P2P Successful Transaction Screen',
      textBN: 'আলহামদুলিল্লাহ ভাই আপনার ইন্ডিকেটর ছিলেন বলে আজকে আমি এত দূর আসতে পারছি 💖 Tk. 7,000 Sold successfully!',
      textEN: 'Alhamdulillah brother, because of your indicator I have been able to come this far today! Tk. 7,000 Sold successfully!',
      time: '5:21 PM',
      views: 605,
      date: 'July 28',
      channelLink: 'https://t.me/+K8Kjxh16WjdlYTQ1',
      initialReactions: [
        { emoji: '❤️', count: 6, userReacted: false },
        { emoji: '🔥', count: 3, userReacted: false },
        { emoji: '🤔', count: 2, userReacted: false }
      ]
    },
    {
      id: 'tg-2',
      forwardedFrom: 'TRADER JUNAYED 💥100',
      avatarColor: 'from-sky-500 to-indigo-600',
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
      imageAlt: 'Samsung S24 Ultra with Stylus in hand',
      textBN: '✅✅শুভ ভাই আমি আর তোমাকে কি বলবো যে স্বপ্ন আমার বড় ভাই পূরণ করে নাই😭😭 সেই স্বপ্ন ভাই তোমার গ্রুপে থেকে তোমার ইন্ডিকেটর ব্যবহার করে আমি পূরণ করছি তুমি আমার বড় ভাইয়ের মত ভাই ভাই যমুনা ফিউচার পার্কে আছি samsung 24 আল্ট্রা মোবাইলটা নিলাম🤟🤟 আমি মনে করি এগুলো আল্লাহ আমাকে দিছে🤲🤲 তুমি শুধু উসিলা তোমার দীর্ঘায়ু কামনা করি ভাই তোমাদের জন্য দোয়া করি🤲🤲🤲🤲 তুমি আরো দূরে এগিয়ে যাও love you xhuvo bhai ❤️❤️❤️❤️',
      textEN: '✅ Shuvo bhai, what can I say! The dream that even my elder brother didn\'t fulfill 😭😭, I fulfilled by staying in your group and using your indicator. You are like an elder brother to me! Brother, I am at Jamuna Future Park, bought this Samsung S24 Ultra mobile 🤟. I believe Allah gave me this 🤲. You are just the medium. I wish you long life, brother, I pray for you 🤲. May you go much further, love you xhuvo bhai ❤️❤️❤️❤️',
      time: '6:03 PM',
      views: 642,
      date: 'July 28',
      channelLink: 'https://t.me/+K8Kjxh16WjdlYTQ1',
      initialReactions: [
        { emoji: '🔥', count: 4, userReacted: false },
        { emoji: '❤️', count: 1, userReacted: false }
      ]
    },
    {
      id: 'tg-3',
      forwardedFrom: 'TDR RAHMAN QX 💎',
      avatarColor: 'from-purple-500 to-pink-600',
      imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600',
      imageAlt: 'Premium iPhone 13 Pro in hand',
      textBN: 'profit er to diye i phn 13 pro kinchi ❤️ Vai ami kichu din por Apnr new jeta bair korchen oitao kinbo vai',
      textEN: 'Bought this iPhone 13 Pro with the trading profit! ❤️ Brother, after a few days, I will also buy the new one you are releasing!',
      time: '3:06 PM',
      views: 803,
      date: 'July 27',
      channelLink: 'https://t.me/+K8Kjxh16WjdlYTQ1',
      initialReactions: [
        { emoji: '❤️', count: 14, userReacted: false },
        { emoji: '🥰', count: 2, userReacted: false }
      ]
    },
    {
      id: 'tg-4',
      forwardedFrom: 'TRADER FARHAN 📊',
      avatarColor: 'from-emerald-500 to-teal-600',
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
      imageAlt: 'Deep Purple iPhone 14 Pro Max Luxury',
      textBN: 'আলহামদুলিল্লাহ শুভ ভাই মহান রবের দরবারে লাখ লাখ শুকরিয়া🥰💖 ইন্ডিকেটর এর মাধ্যমে আমি স্বপ্নেও কল্পনা করতে পারছিনা গাড়ি কেনার টাকা বানায় ফেললাম ৫০০ডলার ডিপোজিট করে Just imagine 🤘🤘',
      textEN: 'Alhamdulillah Shuvo bhai, millions of thanks to the Almighty Lord 🥰💖. Through your indicator, I couldn\'t even imagine in my dreams, I made enough money to buy a car by depositing just $500. Just imagine! 🤘🤘',
      time: '3:48 PM',
      views: 758,
      date: 'July 13',
      channelLink: 'https://t.me/+K8Kjxh16WjdlYTQ1',
      initialReactions: [
        { emoji: '❤️', count: 10, userReacted: false },
        { emoji: '🏆', count: 1, userReacted: false }
      ]
    },
    {
      id: 'tg-5',
      forwardedFrom: 'TRADER JUNAYED 💥100',
      avatarColor: 'from-sky-500 to-indigo-600',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?auto=format&fit=crop&q=80&w=600',
      imageAlt: 'Huge Stack of Cash bills held in hand',
      textBN: 'আলহামদুলিল্লাহ শুভ ভাই 🥹 তাও মাত্র ৩৫ দিনে এত টাকা প্রফিট উইথড্র দিলাম🔥🔥',
      textEN: 'Alhamdulillah Shuvo bhai 🥹 and that too only in 35 days, withdrew so much profit! 🔥🔥',
      time: '11:26 PM',
      views: 664,
      date: 'July 14',
      channelLink: 'https://t.me/+K8Kjxh16WjdlYTQ1',
      initialReactions: [
        { emoji: '🔥', count: 12, userReacted: false },
        { emoji: '👏', count: 4, userReacted: false },
        { emoji: '🏆', count: 2, userReacted: false }
      ]
    }
  ]);

  // Translation States (per message ID)
  const [translations, setTranslations] = useState<Record<string, 'BN' | 'EN'>>({
    'tg-1': 'BN',
    'tg-2': 'BN',
    'tg-3': 'BN',
    'tg-4': 'BN',
    'tg-5': 'BN'
  });

  // Floating Emoji animations
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Handle Dynamic Reaction Toggle
  const handleReaction = (messageId: string, emojiIndex: number, emojiChar: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id !== messageId) return msg;
      
      const newReactions = [...msg.initialReactions];
      const reaction = newReactions[emojiIndex];
      
      if (reaction.userReacted) {
        reaction.count -= 1;
        reaction.userReacted = false;
      } else {
        reaction.count += 1;
        reaction.userReacted = true;
        
        // Spawn Floating Emojis as interactive rewards
        const spawnId = Math.random().toString(36).substring(2, 9);
        const randomX = Math.floor(Math.random() * 60) - 30; // offset around the button
        
        setFloatingEmojis(old => [...old, { id: spawnId, emoji: emojiChar, x: randomX, y: 0 }]);
        
        // Clean up animation
        setTimeout(() => {
          setFloatingEmojis(old => old.filter(item => item.id !== spawnId));
        }, 1200);
      }
      
      return { ...msg, initialReactions: newReactions };
    }));
  };

  // Toggle Translation
  const toggleTranslation = (messageId: string) => {
    setTranslations(prev => ({
      ...prev,
      [messageId]: prev[messageId] === 'BN' ? 'EN' : 'BN'
    }));
  };

  return (
    <div id="telegram-proofs-feed" className="w-full max-w-lg mx-auto rounded-[32px] overflow-hidden border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-[#17212b] relative font-sans text-slate-100 flex flex-col h-[640px] sm:h-[720px]">
      
      {/* 1. Header of the Telegram Channel Channel */}
      <div className="bg-[#17212b] border-b border-slate-900/40 px-4 py-3 shrink-0 flex items-center justify-between relative z-20 shadow-md">
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Channel Logo and Info */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 p-[1.5px] shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden flex items-center justify-center">
                <span className="text-[10px] font-black tracking-tight text-emerald-400 uppercase font-mono">XHUVO</span>
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-sm font-extrabold text-white leading-tight flex items-center space-x-1">
                <span>XHUVO QX OFFICIAL</span>
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500 flex items-center justify-center text-[8px] text-white">✓</span>
              </h3>
              <p className="text-[11px] text-sky-400 font-medium">9.3K subscribers</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
            <Search className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50 transition"
            title={isMuted ? "Unmute Notifications" : "Mute Notifications"}
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-400" /> : <Volume2 className="w-4.5 h-4.5" />}
          </button>
          <button className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
            <MoreVertical className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 2. Pinned Message Banner */}
      <div className="bg-[#1e2c3a] border-b border-slate-950/40 px-4 py-2 shrink-0 flex items-center justify-between text-xs relative z-10 cursor-pointer hover:bg-slate-800/30 transition">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-1 h-8 bg-sky-400 rounded" />
          <div className="text-left min-w-0">
            <p className="text-sky-400 font-bold text-[10px] uppercase tracking-wider">Pinned Message</p>
            <p className="text-slate-200 truncate text-[11px]">↗️ █▬█ █ ▀█▀ XHUVO QX INFINITY V5/V6 VIP KEY SIGNALS...</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-sky-400/80 hover:text-sky-400 flex items-center space-x-0.5">
          <span>PINNED</span>
        </span>
      </div>

      {/* 3. Message Area with Telegram Doodle Wallpaper */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-6 relative bg-sky-950/20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(251,191,36,0.06) 0%, transparent 40%), 
                            radial-gradient(circle at 80% 70%, rgba(56,189,248,0.07) 0%, transparent 45%),
                            linear-gradient(135deg, #0e1621 0%, #17212b 100%)`
        }}
      >
        {/* Floating Particle Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          <AnimatePresence>
            {floatingEmojis.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: 350, x: f.x, scale: 0.8 }}
                animate={{ opacity: 0, y: 150, scale: 1.5, rotate: f.x * 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-3xl left-[45%]"
              >
                {f.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Interactive Message Cards */}
        {messages.map((msg, index) => {
          const currentLang = translations[msg.id];
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-end space-x-2 max-w-[88%] mr-auto"
            >
              {/* Dummy Avatar */}
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${msg.avatarColor} shrink-0 shadow flex items-center justify-center text-[10px] font-black text-white uppercase`}>
                {msg.forwardedFrom.charAt(0)}
              </div>

              {/* Message Bubble container */}
              <div className="bg-[#182533] border border-slate-800/40 rounded-2xl rounded-bl-none overflow-hidden text-left relative shadow-lg flex flex-col">
                
                {/* 1. Forwarded Header */}
                <div className="px-3 py-2 bg-slate-900/30 border-b border-slate-900/20 text-[10px] text-sky-400/90 font-mono tracking-wide flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <CornerUpRight className="w-3 h-3 text-sky-400" />
                    <span>Forwarded from <strong className="text-sky-300 font-sans">{msg.forwardedFrom}</strong></span>
                  </span>
                  
                  {/* Inline Translator Toggle Button */}
                  <button
                    onClick={() => toggleTranslation(msg.id)}
                    className="ml-2 px-1.5 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/20 text-sky-300 font-bold font-sans text-[8px] uppercase flex items-center space-x-0.5 transition"
                    title="Translate this message"
                  >
                    <Languages className="w-2.5 h-2.5 text-sky-400" />
                    <span>{currentLang === 'BN' ? 'Translate' : 'Original'}</span>
                  </button>
                </div>

                {/* 2. Main High-Resolution Showcase Photo */}
                <div className="relative group overflow-hidden">
                  <img 
                    src={msg.imageUrl} 
                    alt={msg.imageAlt}
                    className="w-full h-44 sm:h-52 object-cover border-b border-slate-900/30 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Telegram Style Photo Details watermark */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono tracking-tight font-black flex items-center space-x-1 backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>VERIFIED PROOF</span>
                  </div>
                </div>

                {/* 3. Text Message Bubble */}
                <div className="p-3.5 space-y-3">
                  <div className="text-xs text-slate-100 font-sans leading-relaxed tracking-wide">
                    {currentLang === 'BN' ? (
                      <p className="font-medium text-slate-100">{msg.textBN}</p>
                    ) : (
                      <div className="space-y-1.5 text-slate-200 bg-sky-500/5 p-2.5 rounded-xl border border-sky-500/10 italic">
                        <span className="text-[9px] text-sky-400 font-mono uppercase tracking-widest font-black block">Translation</span>
                        <p className="font-sans font-medium">"{msg.textEN}"</p>
                      </div>
                    )}
                  </div>

                  {/* 4. Interactive Clickable Reactions Drawer */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-800/50">
                    {msg.initialReactions.map((react, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleReaction(msg.id, rIdx, react.emoji)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all flex items-center space-x-1 cursor-pointer select-none ${
                          react.userReacted 
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)] scale-105' 
                            : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-transparent'
                        }`}
                      >
                        <span className="text-sm">{react.emoji}</span>
                        <span className="text-[10px]">{react.count}</span>
                      </button>
                    ))}
                  </div>

                  {/* 5. Message Footer (Views counter + Time + Read status ticks) */}
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-0.5">
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>{msg.views}</span>
                      </span>
                      <span>•</span>
                      <span>{msg.date}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span>{msg.time}</span>
                      <span className="text-sky-400 font-black">✓✓</span>
                    </div>
                  </div>

                </div>

                {/* 6. Click to verify in original post */}
                <a
                  href={msg.channelLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-sky-950/40 hover:bg-sky-950/70 border-t border-slate-900/30 text-[10px] font-bold text-sky-400 flex items-center justify-center space-x-1.5 transition uppercase tracking-wider font-sans"
                >
                  <span>Open t.me original post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Footer Join Button */}
      <div className="p-3.5 bg-[#17212b] border-t border-slate-900/50 shrink-0 flex items-center justify-between relative z-10">
        <div className="text-left">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Join Telegram</p>
          <p className="text-[10px] text-slate-500 leading-none">Get live signals &amp; proofs daily</p>
        </div>
        
        <a
          href="https://t.me/+K8Kjxh16WjdlYTQ1"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 transition-all flex items-center space-x-1.5 uppercase font-sans cursor-pointer animate-breathing-glow"
        >
          <span>Join Channel</span>
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </a>
      </div>

    </div>
  );
};
