import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    location: '',
    topics: [],
    customTopic: '',
    style: ''
  });

  const newsTopics = [
    { id: 'politics', label: 'Politics' },
    { id: 'technology', label: 'Technology' },
    { id: 'sports', label: 'Sports' },
    { id: 'finance', label: 'Finance & Stocks' },
    { id: 'other', label: 'Other' }
  ];

  const newsStyles = [
    { id: 'professional', label: 'Professional', desc: 'Formal and factual' },
    { id: 'goofy', label: 'Goofy', desc: 'Fun and lighthearted' },
    { id: 'elmo', label: 'Elmo', desc: 'Friendly and simple' },
    { id: 'cyber', label: 'Cyber', desc: 'Tech-forward style' },
    { id: 'pirate', label: 'Pirate', desc: 'Arr matey!' }
  ];

  const toggleTopic = (topicId) => {
    setPreferences(prev => ({
      ...prev,
      topics: prev.topics.includes(topicId)
        ? prev.topics.filter(t => t !== topicId)
        : [...prev.topics, topicId]
    }));
  };

  const canProceed = () => {
    if (step === 0) return preferences.location;
    if (step === 1) return preferences.topics.length > 0 && (!preferences.topics.includes('other') || preferences.customTopic);
    if (step === 2) return preferences.style;
    return false;
  };

  const handleNext = () => {
    if (canProceed()) setStep(step + 1);
  };

  const getBackgroundGradient = () => {
    switch (preferences.style) {
      case 'goofy':
        return 'bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-100';
      case 'professional':
        return 'bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100';
      case 'elmo':
        return 'bg-gradient-to-r from-red-50 via-pink-50 to-red-100';
      case 'cyber':
        return 'bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50';
      case 'pirate':
        return 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50';
      default:
        return 'bg-gradient-to-r from-purple-50 via-blue-50 to-rose-50';
    }
  };

  const getHeaderGradient = () => {
    switch (preferences.style) {
      case 'goofy':
        return 'bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500';
      case 'professional':
        return 'bg-gradient-to-r from-slate-600 via-blue-500 to-slate-700';
      case 'elmo':
        return 'bg-gradient-to-r from-red-400 via-pink-400 to-red-500';
      case 'cyber':
        return 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400';
      case 'pirate':
        return 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-purple-400 via-blue-400 to-rose-400';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} flex items-center justify-center p-8 transition-all duration-500`}>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-semibold tracking-tight ${getHeaderGradient()} bg-clip-text text-transparent mb-2 transition-all duration-500`}>
            NEWSCASTER.AI
          </h1>
          <div className="w-24 h-px bg-black mx-auto mt-4"></div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center items-center gap-2 mb-16">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                s === step ? 'bg-black w-8' : s < step ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Steps (0,1,2,3) */}
        {step === 0 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-3">Welcome</h2>
              <p className="text-gray-600 text-sm">Enter location you wish to receive news from</p>
            </div>
            <input
              type="text"
              value={preferences.location}
              onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-lg"
              placeholder="City, State"
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-3">Your Interests</h2>
              <p className="text-gray-600 text-sm">Select the topics you'd like to follow</p>
            </div>
            {newsTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 text-left border transition-all ${
                  preferences.topics.includes(topic.id)
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-light">{topic.label}</span>
                  {preferences.topics.includes(topic.id) && <Check className="w-5 h-5 text-black" />}
                </div>
              </button>
            ))}
            {preferences.topics.includes('other') && (
              <input
                type="text"
                value={preferences.customTopic}
                onChange={(e) => setPreferences({ ...preferences, customTopic: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors text-lg mt-6"
                placeholder="Specify your interest"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-3">Delivery Style</h2>
              <p className="text-gray-600 text-sm">How would you like to receive your news?</p>
            </div>
            {newsStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setPreferences({ ...preferences, style: style.id })}
                className={`w-full px-6 py-4 text-left border transition-all ${
                  preferences.style === style.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-light">{style.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{style.desc}</div>
                  </div>
                  {preferences.style === style.id && <Check className="w-5 h-5 text-black" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {step < 2 && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full mt-12 py-4 font-light text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
              canProceed()
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {step === 2 && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full mt-12 py-4 font-light text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
              canProceed()
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Complete
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {step === 3 && (
          <div className="space-y-8 text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-light text-black mb-3">All Set!</h2>
              <p className="text-gray-600 text-sm mb-6">Your preferences have been saved.</p>
              <div className="bg-white/50 p-6 rounded-lg text-left space-y-2">
                <p className="text-sm"><strong>Location:</strong> {preferences.location}</p>
                <p className="text-sm"><strong>Topics:</strong> {preferences.topics.map(t => newsTopics.find(topic => topic.id === t)?.label).join(', ')}</p>
                {preferences.customTopic && <p className="text-sm"><strong>Custom Topic:</strong> {preferences.customTopic}</p>}
                <p className="text-sm"><strong>Style:</strong> {newsStyles.find(s => s.id === preferences.style)?.label}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setStep(0);
                setPreferences({ location: '', topics: [], customTopic: '', style: '' });
              }}
              className="w-full mt-12 py-4 font-light text-sm uppercase tracking-wide bg-black text-white hover:bg-gray-800 transition-all"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
