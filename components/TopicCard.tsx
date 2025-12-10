import React from 'react';
import { Topic } from '../types';
import { Brain, Code, Terminal, Languages, Boxes, Database } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
  disabled?: boolean;
}

const TOPIC_CONFIG: Record<Topic, { label: string; icon: React.ReactNode; desc: string, color: string }> = {
  [Topic.PSEUDO_CODE]: { 
    label: "הוראות מחשב (Pseudo)", 
    icon: <Terminal className="w-8 h-8" />, 
    desc: "סימולציית הרצת קוד, לולאות, תנאים ומשתנים.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:border-indigo-500"
  },
  [Topic.LOGIC_SERIES]: { 
    label: "לוגיקה וצורות", 
    icon: <Brain className="w-8 h-8" />, 
    desc: "זיהוי חוקיות, סדרות מספרים ומבחני אינטליגנציה חזותיים.",
    color: "bg-purple-50 text-purple-600 border-purple-100 group-hover:border-purple-500"
  },
  [Topic.ALGORITHMS]: { 
    label: "חשיבה אלגוריתמית", 
    icon: <Code className="w-8 h-8" />, 
    desc: "פתרון בעיות, תרשימי זרימה, רקורסיה ויעילות.",
    color: "bg-amber-50 text-amber-600 border-amber-100 group-hover:border-amber-500"
  },
  [Topic.ENGLISH]: { 
    label: "אנגלית טכנית", 
    icon: <Languages className="w-8 h-8" />, 
    desc: "הבנת הנקרא ומושגים טכניים באנגלית.",
    color: "bg-sky-50 text-sky-600 border-sky-100 group-hover:border-sky-500"
  },
  [Topic.OOP]: { 
    label: "מונחה עצמים (OOP)", 
    icon: <Boxes className="w-8 h-8" />, 
    desc: "מחלקות, ירושה, פולימורפיזם וכימוס.",
    color: "bg-rose-50 text-rose-600 border-rose-100 group-hover:border-rose-500"
  },
  [Topic.SQL]: {
    label: "מסדי נתונים (SQL)",
    icon: <Database className="w-8 h-8" />,
    desc: "שאילתות, טבלאות, קשרי גומלין וסינון נתונים.",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:border-cyan-500"
  }
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, disabled }) => {
  const config = TOPIC_CONFIG[topic];
  
  return (
    <button
      onClick={() => onClick(topic)}
      disabled={disabled}
      className={`group relative text-right p-6 rounded-2xl border-2 border-transparent transition-all duration-300 w-full hover:shadow-xl ${config.color} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white shadow-sm`}>
          {config.icon}
        </div>
        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity text-current font-bold">
          התחל אימון ←
        </div>
      </div>
      <h3 className="text-xl font-black mb-2">{config.label}</h3>
      <p className="text-sm opacity-80 font-medium">{config.desc}</p>
    </button>
  );
};