import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users } from 'lucide-react';

/**
 * The cards under each section. You can extend the cards arrays.
 */
const aptitudeCards = [
  { key: 'logic', title: 'Logical Reasoning', description: 'Pattern recognition & logic' },
  { key: 'math', title: 'Problem Solving', description: 'Quantitative reasoning' },
  { key: 'visual', title: 'Visual-Spatial', description: 'Shapes & orientation' }
];

const softCards = [
  { key: 'communication', title: 'Communication', description: 'Clarity & expression' },
  { key: 'teamwork', title: 'Teamwork', description: 'Collaboration' },
  { key: 'creativity', title: 'Creativity', description: 'Idea generation' }
];

export default function SectionCards({ onCardClick }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Aptitude column */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
        <div className="flex items-center mb-4">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold">Aptitude</h3>
        </div>
        <div className="grid gap-4">
          {aptitudeCards.map(c => (
            <motion.div
              key={c.key}
              whileHover={{ scale: 1.02 }}
              onClick={() => onCardClick({ section: 'aptitude', cardKey: c.key })}
              className="cursor-pointer p-4 rounded-lg border border-purple-50 hover:shadow-md transition"
            >
              <h4 className="font-medium text-gray-800">{c.title}</h4>
              <p className="text-sm text-gray-500">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Soft Skills column */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
        <div className="flex items-center mb-4">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold">Soft Skills</h3>
        </div>
        <div className="grid gap-4">
          {softCards.map(c => (
            <motion.div
              key={c.key}
              whileHover={{ scale: 1.02 }}
              onClick={() => onCardClick({ section: 'soft', cardKey: c.key })}
              className="cursor-pointer p-4 rounded-lg border border-purple-50 hover:shadow-md transition"
            >
              <h4 className="font-medium text-gray-800">{c.title}</h4>
              <p className="text-sm text-gray-500">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
