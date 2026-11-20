import React from 'react';
import {AbsoluteFill, Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
export {Subtitles} from './Subtitles';
import showcases from './showcases.json';
import {MusicScreens} from './MusicScreens';
import {Tasks} from './ProjectScreens';

import {CorpusEmail, ReadmeScroll} from './OpenSourceShowcase';
import {SymphonyDemo} from './SymphonyDemo';
type Showcase = (typeof showcases)[number];
export const activeShowcase = (source: number, time: number) =>
  showcases.find(slot => slot.source === source && time >= slot.start && (slot.end === null || time < slot.end));


export const showcaseHeight = 1080 * 9 / 16;

export const splitProgress = (slot: Showcase, time: number) => {
  const neighbours = showcases.filter(other => other.source === slot.source);
  const entering = neighbours.some(other => other.end === slot.start) ? 1 : (time - slot.start) / .45;
  const leaving = slot.end === null || neighbours.some(other => other.start === slot.end) ? 1 : (slot.end - time) / .45;
  const t = Math.max(0, Math.min(1, entering, leaving));
  return t*t*(3-2*t);
};

const FinalePhotos: React.FC<{asset: string; seconds: number}> = ({asset, seconds}) => {
  const progress = Math.max(0, Math.min(1, (seconds - 1.15) / .62));
  const slide = progress * progress * (3 - 2 * progress);
  // Split the existing transparent diptych in its gutter to preserve both crops.
  const photo: React.CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'};
  return <>
    <Img src={staticFile(asset)} style={{...photo, clipPath: 'inset(0 32% 0 0)',
      transform: 'translateX(' + 165.5 * (1 - slide) + 'px)'}}/>
    <Img src={staticFile(asset)} style={{...photo, clipPath: 'inset(0 0 0 68%)',
      transform: 'translateX(' + 350 * (1 - slide) + 'px)', opacity: slide}}/>
  </>;
};

export const ProjectCard: React.FC<{slot: Showcase; top: number; opacity: number; time: number; speed: number}> = ({slot,top,opacity,time,speed}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const elapsed = time-slot.start;
  const mediaFrame = Math.floor(elapsed*fps/speed+1e-7);
  if (slot.kind === 'index') {
    const readme = showcases.find(previous => previous.kind === 'llama' && previous.end === slot.start);
    return <>
      {readme && <div style={{position:'absolute',left:0,top,opacity,width:'100%',height:showcaseHeight,overflow:'hidden'}}>
        <ReadmeScroll t={slot.start - readme.start}/>
      </div>}
      <CorpusEmail t={elapsed} opacity={opacity}/>
    </>;
  }
  return <div style={{position:'absolute',left:0,top,opacity,width:'100%',height:showcaseHeight,overflow:'hidden'}}>
    {slot.kind === 'symphony' ? <SymphonyDemo seconds={elapsed/speed}/> : slot.kind === 'tasks' ? <Tasks elapsed={elapsed}/> :
      slot.kind === 'finale' ? <FinalePhotos asset={slot.asset} seconds={elapsed/speed}/> :
      slot.kind.startsWith('music-') ? <MusicScreens kind={slot.kind} asset={slot.asset} elapsed={elapsed}/> :
      slot.kind === 'llama' ? <ReadmeScroll t={elapsed}/> :
      <Sequence from={frame-mediaFrame} layout="none">
        {slot.kind === 'grant' ? <Freeze frame={14*fps-1} active={mediaFrame >= 14*fps}><OffthreadVideo muted src={staticFile(slot.asset)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></Freeze> :
        <AbsoluteFill style={{alignItems:'center',justifyContent:'center',background:'#f0eee5'}}>
          <div style={{width:'80%',font:'600 30px Segoe UI',color:'#006b56',marginBottom:10}}>{slot.title}</div>
          <OffthreadVideo muted src={staticFile(slot.asset)} style={{width:'80%',height:475,objectFit:'contain'}}/>
        </AbsoluteFill>}
      </Sequence>}
  </div>;
};
