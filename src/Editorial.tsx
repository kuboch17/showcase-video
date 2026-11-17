import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import captions from './captions.json';
import showcases from './showcases.json';
import {MusicScreens} from './MusicScreens';
export type Cue={source:number;start:number;end:number;text:string};
export type Showcase={source:number;start:number;end:number;title:string;subtitle:string;tags:string[];instruction:string;asset:string;kind:string};
export const activeShowcase=(source:number,time:number)=>(showcases as Showcase[]).find(s=>s.source===source&&time>=s.start&&time<s.end);
const ranges:{source:number;start:number;end:number}[]=[];
for(const s of showcases){const last=ranges[ranges.length-1];if(last&&last.source===s.source&&s.start-last.end<.45)last.end=Math.max(last.end,s.end);else ranges.push({source:s.source,start:s.start,end:s.end});}
export const showcaseLift=(source:number,time:number)=>{const r=ranges.find(r=>r.source===source&&time>=r.start-.4&&time<r.end+.4);if(!r)return 0;return interpolate(time,[r.start-.4,r.start+.25,r.end-.25,r.end+.4],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:t=>t*t*(3-2*t)});};
export const Subtitles:React.FC<{source:number;time:number;size:number;lift:number}>=({source,time,size,lift})=>{
 const cue=(captions as Cue[]).find(c=>c.source===source&&time>=c.start&&time<c.end);if(!cue)return null;
 return <AbsoluteFill style={{justifyContent:'flex-end',alignItems:'center',paddingBottom:330-160*lift,pointerEvents:'none'}}><div key={`${source}-${cue.start}`} style={{maxWidth:920,padding:'10px 24px',textAlign:'center',fontFamily:'Segoe UI,Arial,sans-serif',fontSize:size,fontWeight:500,lineHeight:1.14,color:'#F2EACD',textShadow:'0 2px 5px rgba(0,0,0,.65)'}}>{cue.text}</div></AbsoluteFill>;
};
export const ProjectCard:React.FC<{slot:Showcase;time:number;lift:number;speed:number}>=({slot,time,lift,speed})=>{
 const frame=useCurrentFrame();
 const opacity=interpolate(time,[slot.start,slot.start+.16,slot.end-.12,slot.end],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const image=slot.kind==='image'||slot.kind.startsWith('music-');
 const progress=Math.max(0,Math.min(1,(time-slot.start)/(slot.end-slot.start)));
 // Same edge as the speaker: no margins, gutters or rounded white placeholders.
 return <div style={{position:'absolute',left:0,top:1365-425*lift,width:1080,height:720,overflow:'hidden',opacity:slot.asset?opacity:1}}>
  {slot.asset?slot.kind.startsWith('music-')?<MusicScreens asset={slot.asset} kind={slot.kind} progress={progress}/>:image?<Img src={staticFile(slot.asset)} style={{width:'100%',height:'100%',objectFit:'contain',background:'#0c1013'}}/>:<Sequence from={frame-Math.round((time-slot.start)/speed*30)} layout="none"><OffthreadVideo muted src={staticFile(slot.asset)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></Sequence>:<div style={{position:'absolute',inset:0,background:'#fff'}}/>}
 </div>;
};
