import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

import showcases from './showcases.json';
const grid = showcases.find(slot => slot.kind === 'music-profile')!;
const gridDuration = grid.end! - grid.start;
const strip = 'showcase/Screenshot_20261117_153720_Instagram.jpg';
const smooth = (time: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (time-start)/(end-start)));
  return t*t*(3-2*t);
};

export const MusicScreens: React.FC<{asset: string; kind: string; elapsed: number}> = ({asset, kind, elapsed}) => {
  if (kind === 'music-results') {
    const overlay = smooth(elapsed, 2.65, 3.25);
    return <AbsoluteFill>
      <Img src={staticFile(asset)} style={{position:'absolute',left:140-124*overlay,top:4,width:800-174*overlay,height:416,objectFit:'contain'}}/>
      <Img src={staticFile('showcase/cba-views.jpg')} style={{position:'absolute',right:38,
        top:52,width:433,borderRadius:10,boxShadow:'0 5px 22px #0007',
        opacity:overlay,transform:'translateY('+18*(1-overlay)+'px)'}}/>
      {[0,1,2].map((i) => {
        const age = elapsed - (.85 + i * .61);
        if (age < 0) return null;
        const ease = 1 - (1-Math.min(1, age/.16))**3;
        return <div key={i} style={{position:'absolute',left:26+i*347,top:[431,416,438][i],width:331,
          aspectRatio:'512 / 245',overflow:'hidden',borderRadius:8,boxShadow:'0 4px 18px #0007',
          opacity:ease,transform:'translateY('+12*(1-ease)+'px)'}}>
          <Img src={staticFile(strip)} style={{position:'absolute',width:'300%',left:(-100*i)+'%',top:0}}/>
        </div>;
      })}
    </AbsoluteFill>;
  }
  const followers = kind === 'music-followers';
  const slide = followers ? smooth(elapsed, 0, .56) : 0;
  const scrollTime = followers ? gridDuration + elapsed : elapsed;
  const highlight = smooth(elapsed, .48, 1.05);
  return <AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>
    <div style={{position:'relative',width:944,height:531,overflow:'hidden',borderRadius:12,
      background:'#0c1014',boxShadow:'0 5px 18px #0006'}}>
      {slide < 1 && <Img src={staticFile(followers ? 'showcase/cba-grid.jpg' : asset)}
        style={{position:'absolute',width:'100%',top:-92-1225*scrollTime/gridDuration-531*slide}}/>}
      {followers && <AbsoluteFill style={{justifyContent:'center',background:'#0d0e12',
        transform:'translateY('+531*(1-slide)+'px)'}}>
        <div style={{position:'relative'}}>
          <Img src={staticFile(asset)} style={{display:'block',width:'100%'}}/>
          <div style={{position:'absolute',top:'44%',height:'16%',left:'53.75%',
            width:(12.1*highlight)+'%',background:'#ffdb65',mixBlendMode:'screen',
            opacity:.45,borderRadius:4}}/>
        </div>
      </AbsoluteFill>}
    </div>
  </AbsoluteFill>;
};