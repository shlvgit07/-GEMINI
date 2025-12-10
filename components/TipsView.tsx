import React from 'react';
import { TIPS_DATA } from '../data/tips';
import { Lightbulb, Clock, Table2, BrainCircuit } from 'lucide-react';
import { Button } from './Button';

interface TipsViewProps {
  onBack: () => void;
}

export const TipsView: React.FC<TipsViewProps> = ({ onBack }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'trace': return <Table2 className="w-6 h-6 text-purple-600" />;
      case 'time': return <Clock className="w-6 h-6 text-orange-600" />;
      case 'algo': return <BrainCircuit className="w-6 h-6 text-blue-600" />;
      default: return <Lightbulb className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'trace': return 'bg-purple-50 border-purple-100';
      case 'time': return 'bg-orange-50 border-orange-100';
      case 'algo': return 'bg-blue-50 border-blue-100';
      default: return 'bg-yellow-50 border-yellow-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">טיפים להצלחה</h1>
          <p className="text-slate-600">עצות זהב לתכנות, חשיבה אלגוריתמית וניהול המבחן</p>
        </div>
        <Button onClick={onBack} variant="outline" className="!py-2">
          חזרה
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TIPS_DATA.map((tip) => (
          <div 
            key={tip.id} 
            className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${getColor(tip.category)}`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {getIcon(tip.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-slate-700 leading-relaxed">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};