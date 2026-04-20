import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Calendar, Radio } from 'lucide-react';

interface ScheduleItem {
  id: string;
  day: string;
  activity: string;
  platform: string;
}

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const unsub = onSnapshot(doc(db, 'config', 'schedule'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        setSchedule(docSnap.data().items);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <div className="animate-pulse h-32 bg-[#1A1A1B] border border-[#2D2D2D] w-full"></div>
      </section>
    );
  }

  if (schedule.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-6 flex items-center gap-3">
        <Calendar className="text-[#FF69B4]" size={28} />
        Transmission <span className="text-[#FF69B4]">Schedule</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {schedule.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#1A1A1B] border border-[#2D2D2D] p-5 hover:border-[#FF69B4] transition-all duration-300 group hover:shadow-[0_0_15px_rgba(255,105,180,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#2D2D2D] group-hover:bg-[#FF69B4] transition-colors"></div>
            <div className="text-[#FF69B4] font-mono text-xs mb-2 uppercase tracking-widest pl-2">
              {item.day}
            </div>
            <div className="text-white font-bold uppercase tracking-wide mb-4 group-hover:text-[#FF69B4] transition-colors pl-2">
              {item.activity}
            </div>
            <div className="flex items-center gap-2 text-[#A3A3A3] font-mono text-xs pl-2">
              <Radio size={14} className="group-hover:animate-pulse text-[#FF69B4]" />
              {item.platform}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
