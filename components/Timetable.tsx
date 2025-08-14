// components/Timetable.tsx - Class timetable component
'use client';
import { useState } from 'react';

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const schedule = {
    Monday: [
      { time: '9:00 - 10:00', class: 'Hatha Yoga', trainer: 'Javier Morales' },
      { time: '10:00 - 11:00', class: 'Vinyasa Flow', trainer: 'Raj Gupta' },
      { time: '11:00 - 12:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '14:00 - 15:00', class: 'Vinyasa Flow', trainer: 'Mia Thompson' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
    Tuesday: [
      { time: '9:00 - 10:00', class: 'Yin Yoga', trainer: 'Ava Garcia' },
      { time: '10:00 - 11:00', class: 'Power Yoga', trainer: 'Mia Thompson' },
      { time: '11:00 - 12:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '14:00 - 15:00', class: 'Yin Yoga', trainer: 'Ava Garcia' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
    Wednesday: [
      { time: '9:00 - 10:00', class: 'Vinyasa Flow', trainer: 'Javier Morales' },
      { time: '10:00 - 11:00', class: 'Vinyasa Flow', trainer: 'Raj Gupta' },
      { time: '11:00 - 12:00', class: 'Power Yoga', trainer: 'Mia Thompson' },
      { time: '14:00 - 15:00', class: 'Vinyasa Flow', trainer: 'Mia Thompson' },
    ],
    Thursday: [
      { time: '9:00 - 10:00', class: 'Yin Yoga', trainer: 'Ava Garcia' },
      { time: '10:00 - 11:00', class: 'Yin Yoga', trainer: 'Javier Morales' },
      { time: '11:00 - 12:00', class: 'Hatha Yoga', trainer: 'Ava Garcia' },
      { time: '14:00 - 15:00', class: 'Vinyasa Flow', trainer: 'Mia Thompson' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
    Friday: [
      { time: '9:00 - 10:00', class: 'Hatha Yoga', trainer: 'Javier Morales' },
      { time: '10:00 - 11:00', class: 'Hatha Yoga', trainer: 'Mia Thompson' },
      { time: '11:00 - 12:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '14:00 - 15:00', class: 'Vinyasa Flow', trainer: 'Mia Thompson' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
    Saturday: [
      { time: '9:00 - 10:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '10:00 - 11:00', class: 'Vinyasa Flow', trainer: 'Raj Gupta' },
      { time: '11:00 - 12:00', class: 'Hatha Yoga', trainer: 'Javier Morales' },
      { time: '14:00 - 15:00', class: 'Vinyasa Flow', trainer: 'Mia Thompson' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
    Sunday: [
      { time: '9:00 - 10:00', class: 'Vinyasa Flow', trainer: 'Catherine Miller' },
      { time: '10:00 - 11:00', class: 'Yin Yoga', trainer: 'Mia Thompson' },
      { time: '11:00 - 12:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '14:00 - 15:00', class: 'Yin Yoga', trainer: 'Catherine Miller' },
      { time: '15:00 - 16:00', class: 'Power Yoga', trainer: 'Ava Garcia' },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yoga-sand to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">Timetable of classes</h2>
          <p className="text-xl text-gray-600">
            Each instructor is certified in their respective yoga discipline and is dedicated to guiding you on your
            journey
          </p>
        </div>

        {/* Day Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedDay === day ? 'bg-yoga-sage text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-6">{selectedDay} Schedule</h3>
            <div className="space-y-4">
              {schedule[selectedDay as keyof typeof schedule]?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-yoga-sand to-white rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-yoga-earth font-semibold">{item.time}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.class}</div>
                      <div className="text-gray-600">{item.trainer}</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yoga-sage rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.class.charAt(0)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
