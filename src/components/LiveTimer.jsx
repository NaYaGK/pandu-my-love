import React, { useState, useEffect } from 'react';
import { differenceInYears, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, addYears, addDays, addHours, addMinutes } from 'date-fns';

export default function LiveTimer() {
  const [timePassed, setTimePassed] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Start Date: 21 Jan 2022 (User will update exact time later, defaulting to midnight)
    const startDate = new Date(2022, 0, 21, 0, 0, 0);

    const updateTimer = () => {
      const now = new Date();
      
      const years = differenceInYears(now, startDate);
      const dateAfterYears = addYears(startDate, years);
      
      const days = differenceInDays(now, dateAfterYears);
      const dateAfterDays = addDays(dateAfterYears, days);
      
      const hours = differenceInHours(now, dateAfterDays);
      const dateAfterHours = addHours(dateAfterDays, hours);
      
      const minutes = differenceInMinutes(now, dateAfterHours);
      const dateAfterMinutes = addMinutes(dateAfterHours, minutes);
      
      const seconds = differenceInSeconds(now, dateAfterMinutes);

      setTimePassed({ years, days, hours, minutes, seconds });
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center">
      <h2 className="font-playfair text-3xl md:text-5xl text-pink-200 drop-shadow-[0_0_10px_rgba(255,192,203,0.5)] mb-8">
        Every Second With You
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-montserrat text-white">
        {[
          { label: 'Years', value: timePassed.years },
          { label: 'Days', value: timePassed.days },
          { label: 'Hours', value: timePassed.hours },
          { label: 'Minutes', value: timePassed.minutes },
          { label: 'Seconds', value: timePassed.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[80px] md:min-w-[100px] shadow-lg shadow-pink-500/10 hover:shadow-pink-500/30 transition-shadow">
            <span className="text-3xl md:text-5xl font-light tabular-nums text-pink-100">{item.value}</span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-pink-300/80 mt-2">{item.label}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-12 font-dancing text-2xl md:text-3xl text-pink-200/90">
        And I've loved you for every single one of them, Mama.
      </p>
    </div>
  );
}
