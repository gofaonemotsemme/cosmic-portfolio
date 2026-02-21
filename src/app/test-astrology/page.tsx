'use client'

import { useState } from 'react'

export default function TestAstrology() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    datetime: '1990-06-15T18:30:00Z',
    latitude: 40.7128,
    longitude: -74.0060
  })

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/astrology/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Test Astrology API</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Input</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Datetime (ISO)</label>
              <input 
                type="text" 
                value={formData.datetime}
                onChange={(e) => setFormData({...formData, datetime: e.target.value})}
                className="w-full p-2 bg-slate-700 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Latitude</label>
              <input 
                type="number" 
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
                className="w-full p-2 bg-slate-700 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Longitude</label>
              <input 
                type="number" 
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
                className="w-full p-2 bg-slate-700 rounded text-white"
              />
            </div>
            <button 
              onClick={testApi}
              disabled={loading}
              className="w-full py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test API'}
            </button>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Response</h2>
          {result ? (
            <pre className="bg-slate-900 p-4 rounded overflow-auto max-h-96 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400">Click "Test API" to see results</p>
          )}
        </div>
      </div>
    </div>
  )
}