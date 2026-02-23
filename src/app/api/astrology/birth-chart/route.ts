import { NextRequest, NextResponse } from 'next/server';
import { calculatePlanets } from '@/lib/astronomy/planetCalculator';
import { getZodiacSign } from '@/lib/astrology/signCalculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { datetime, latitude, longitude } = body;
    
    if (!datetime || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: datetime, latitude, longitude' },
        { status: 400 }
      );
    }
    
    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json({ error: 'Invalid datetime' }, { status: 400 });
    }
    
    // Calculate planetary positions
    const planets = await calculatePlanets(birthDate, latitude, longitude);
    
    // Enrich with zodiac signs
    const chart = planets.map(p => ({
      name: p.name,
      ...getZodiacSign(p.longitude),
      longitude: p.longitude,
      latitude: p.latitude,
      distance: p.distance
    }));
    
    // Simple ascendant calculation (placeholder)
    const ascendant = { 
      sign: 'Leo', 
      degree: 15.5,
      longitude: 135.5 
    };
    
    return NextResponse.json({
      datetime: birthDate.toISOString(),
      location: { latitude, longitude },
      ascendant,
      planets: chart
    });
    
  } catch (error) {
    console.error('Birth chart calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add GET handler for browser testing
export async function GET() {
  return NextResponse.json({
    message: "✨ Astrology API is live!",
    usage: {
      method: "POST",
      endpoint: "/api/astrology/birth-chart",
      body: {
        datetime: "1990-06-15T18:30:00Z",
        latitude: 40.7128,
        longitude: -74.0060
      },
      notes: "Send a POST request with birth details to get your birth chart",
      test_page: "/test-astrology"
    },
    status: "API is working! Use Thunder Client or POST requests to interact."
  });
}

/*
'use client'

adding a line

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onCalculate: (data: any) => void
  isLoading: boolean
}

export default function BirthChartForm({ onCalculate, isLoading }: Props) {
  const [formData, setFormData] = useState({
    date: '1990-06-15',
    time: '12:30',
    latitude: '40.7128',
    longitude: '-74.0060',
    includeInterpretations: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Combine date and time into ISO string
    const datetime = `${formData.date}T${formData.time}:00.000Z`
    
    onCalculate({
      datetime,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      includeInterpretations: formData.includeInterpretations
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-purple-400">✨</span> Enter Birth Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Birth Time (UTC)
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              placeholder="e.g., 40.7128"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              placeholder="e.g., -74.0060"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="interpretations"
            checked={formData.includeInterpretations}
            onChange={(e) => setFormData({ ...formData, includeInterpretations: e.target.checked })}
            className="w-4 h-4 text-purple-600 bg-slate-900 border-purple-500/30 rounded focus:ring-purple-500"
          />
          <label htmlFor="interpretations" className="text-sm text-gray-300">
            Include personalized interpretations
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Consulting the Stars...
            </span>
          ) : (
            'Calculate Birth Chart'
          )}
        </button>
      </form>
    </motion.div>
  )
}
*/