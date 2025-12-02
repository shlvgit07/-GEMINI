import React, { useState } from 'react';
import { Term } from '../types';
import { DICTIONARY_TERMS } from '../data/terms';
import { Search, ChevronDown, ChevronUp, BookOpen, Terminal, Brain, Code } from 'lucide-react';
import { Button } from './Button';

interface DictionaryViewProps {
  onBack: () => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pseudo' | 'logic' | 'algo'>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);

  const filteredTerms = DICTIONARY_TERMS.filter(term => {
    const matchesSearch = term.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTerm = (id: string) => {
    setExpandedTermId(expandedTermId === id ? null : id);
  };

  const categories = [
    { id: 'all', label: 'הכל', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pseudo', label: 'הוראות מחשב', icon: <Terminal className="w-4 h-4" /> },
    { id: 'algo', label: 'אלגוריתמים', icon: <Code className="w-4 h-4" /> },
    { id: 'logic', label: 'לוגיקה', icon: <Brain className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900">מילון מושגים</h1>
        <Button onClick={onBack} variant="outline" className="!py-2">
          חזרה
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 sticky top-4 z-10">
        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חפש מושג, פקודה או הסבר..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid gap-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <div 
              key={term.id} 
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleTerm(term.id)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    term.category === 'pseudo' ? 'bg-indigo-100 text-indigo-600' :
                    term.category === 'algo' ? 'bg-amber-100 text-amber-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {term.category === 'pseudo' ? <Terminal className="w-5 h-5" /> :
                     term.category === 'algo' ? <Code className="w-5 h-5" /> :
                     <Brain className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{term.title}</h3>
                    <p className="text-sm text-slate-500">{term.description}</p>
                  </div>
                </div>
                {expandedTermId === term.id ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedTermId === term.id && (
                <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2">
                  <div className="border-t border-slate-100 pt-4">
                    {term.codeExample && (
                      <div className="mb-4">
                        <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">דוגמה</div>
                        <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-sm shadow-inner overflow-x-auto" dir="ltr">
                          <pre>{term.codeExample}</pre>
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">הסבר מורחב</div>
                      <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        {term.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>לא נמצאו מושגים התואמים את החיפוש שלך.</p>
          </div>
        )}
      </div>
    </div>
  );
};