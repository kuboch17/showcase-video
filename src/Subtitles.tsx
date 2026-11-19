import React from 'react';
import cues from './captions.json';

const smooth = (fraction: number) => {
  const t = Math.max(0, Math.min(1, fraction));
  return t * t * (3 - 2 * t);
};

export const Subtitles: React.FC<{source: number; time: number; size: number; centerY: number}> = ({source, time, size, centerY}) => {
  const cue = cues.find(c => c.source === source && time >= c.start && time < c.end);
  if (!cue) return null;
  const words = cue.text.split(/\s+/);
  const weights = words.map(word => Math.sqrt(word.length));
  const duration = cue.end - cue.start;
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const lastWordDuration = duration * weights[weights.length - 1] / total;
  const fadeOut = smooth((cue.end - time) / Math.min(.12, lastWordDuration / 3));
  let onset = cue.start;
  return <div style={{position: 'absolute', left: 90, right: 90, top: centerY, transform: 'translateY(-50%)',
    textAlign: 'center', font: '400 ' + Math.min(size, 76) + 'px/1.2 "Segoe UI", Arial, sans-serif',
    color: '#ffe184', textShadow: '0 1px 5px rgba(0,0,0,.75)', pointerEvents: 'none',
    opacity: fadeOut, overflowWrap: 'anywhere'}}>
    {words.map((word, i) => {
      const length = duration * weights[i] / total;
      const opacity = smooth((time - onset) / Math.min(.14, length / 2));
      onset += length;
      return <React.Fragment key={i}><span style={{opacity}}>{word}</span>{' '}</React.Fragment>;
    })}
  </div>;
};
