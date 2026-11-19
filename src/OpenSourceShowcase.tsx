import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

const ease = (t: number, start: number, end: number) => {
  const k = Math.max(0, Math.min(1, (t - start) / (end - start)));
  return k * k * (3 - 2 * k);
};

const marker = (x: number, y: number, width: number, height: number, progress: number, dark = false): React.CSSProperties => ({
  position: 'absolute', left: x, top: y, width: width * progress, height,
  background: '#ffdb65', mixBlendMode: dark ? 'screen' : 'multiply',
  opacity: dark ? .48 : .72, borderRadius: 2,
});

export const ReadmeScroll: React.FC<{t: number}> = ({t}) => {
  const scroll = ease(t, .25, 2.55);
  const wide = ease(t, 2.65, 4.05);
  const scale = 1.78 - .59 * wide;
  const y = 15 - 258 * scroll + 78 * wide;
  return <AbsoluteFill style={{overflow: 'hidden', background: '#0d1117'}}>
    <div style={{position: 'absolute', left: 540 - 572 * scale, top: y, transformOrigin: '0 0', transform: 'scale(' + scale + ')'}}>
      <Img src={staticFile('showcase/llamassage-readme.png')} style={{display:'block', width:1166}}/>
      <div style={marker(465,247,213,19,ease(t,.95,1.55),true)}/>
      <div style={marker(380,267,160,18,ease(t,1.55,2.05),true)}/>
    </div>
  </AbsoluteFill>;
};

export const CorpusEmail: React.FC<{t: number; opacity: number}> = ({t,opacity}) => {
  const zoom = ease(t, 1.55, 2.85);
  const scale = 1 + 1.12 * zoom;
  const centerX = 491.5 - 99 * zoom;
  const centerY = 393 + 145 * zoom;
  return <AbsoluteFill style={{opacity,overflow:'hidden'}}>
    <AbsoluteFill style={{backgroundColor:'rgba(0,0,0,0.17)',backdropFilter:'blur(6px)'}}/>
    <div style={{position:'absolute',left:540 - centerX * scale,top:925 - centerY * scale,
      width:983,transformOrigin:'0 0',transform:'scale(' + scale + ')',
      boxShadow:'0 12px 44px #0005',borderRadius:6,overflow:'hidden'}}>
      <Img src={staticFile('showcase/llamassage-email.png')} style={{display:'block',width:'100%'}}/>
      <div style={marker(480,27,421,30,ease(t,.16,.98))}/>
      <div style={marker(235,531,315,21,ease(t,2.55,4.85))}/>
    </div>
    <div style={{position:'absolute',bottom:40,left:38,textAlign:'left',
      color:'rgba(255,255,255,.32)',font:'400 21px "Segoe UI", Arial, sans-serif',
      textShadow:'0 1px 3px #0005',opacity:ease(t,0,.28)}}>
      * XERJ corpus hub / flutter-godot-llamassageapp
    </div>
  </AbsoluteFill>;
};
