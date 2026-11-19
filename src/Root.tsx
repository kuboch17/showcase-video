import React from 'react';
import {AbsoluteFill, Composition, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {z} from 'zod';
import {Subtitles, ProjectCard, activeShowcase, splitProgress, showcaseHeight} from './Editorial';
const fps=30;
const speed=1.05;
const schema=z.object({introStart:z.number().min(0).max(148),introSeconds:z.number().min(.1).max(149),mainStart:z.number().min(0).max(143),mainSeconds:z.number().min(.1).max(144),audioVolume:z.number().min(0).max(2),fadeEdges:z.boolean(),subtitles:z.boolean(),subtitleSize:z.number().min(40).max(110),showcase:z.boolean()});
type Props=z.infer<typeof schema>;
const frames=(s:number)=>Math.max(1,Math.floor(s*fps));
const timing=(p:Props)=>({intro:frames(Math.min(p.introSeconds,149.7667-p.introStart)/speed),main:frames(Math.min(p.mainSeconds,143.8546-p.mainStart)/speed)});
const Footage:React.FC<{p:Props;style:React.CSSProperties;muted?:boolean}>=({p,style,muted=false})=>{
 const t=timing(p);
 return <><Sequence durationInFrames={t.intro} name={muted?'Pozadie 1':'Video 1'}><OffthreadVideo src={staticFile('video-1.mp4')} trimBefore={Math.floor(p.introStart*fps)} playbackRate={speed} muted={muted} volume={muted?0:p.audioVolume} style={style}/></Sequence><Sequence from={t.intro} durationInFrames={t.main} name={muted?'Pozadie 2':'Video 2'}><OffthreadVideo src={staticFile('video-2.mp4')} trimBefore={Math.floor(p.mainStart*fps)} playbackRate={speed} muted={muted} volume={muted?0:p.audioVolume} style={style}/></Sequence></>;
};
const Edit:React.FC<Props>=(p)=>{
 const frame=useCurrentFrame();const {durationInFrames}=useVideoConfig();const t=timing(p);
 const source=frame<t.intro?1:2;const time=source===1?p.introStart+frame/fps*speed:p.mainStart+(frame-t.intro)/fps*speed;
 const slot=p.showcase?activeShowcase(source,time):undefined;
 const lift=slot ? splitProgress(slot,time) : 0;
 const captionLine=Math.min(p.subtitleSize,76)*1.2;
 const blockHeight=2*showcaseHeight+(p.subtitles ? 36+captionLine : 0);
 const blockTop=(1920-blockHeight)/2;
 const speakerTop=555+(blockTop-555)*lift;
 const speakerHeight=810+(showcaseHeight-810)*lift;
 const panelTop=speakerTop+speakerHeight;
 const captionCenter=blockTop+2*showcaseHeight+36+captionLine/2;
 const fade=p.fadeEdges?interpolate(frame,[0,5,durationInFrames-7,durationInFrames-1],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):1;
 return <AbsoluteFill style={{background:'#070707',overflow:'hidden'}}><AbsoluteFill style={{opacity:fade}}>
  <AbsoluteFill style={{transform:'scale(1.12)',filter:'blur(38px) brightness(.46) saturate(.78)'}}><Footage p={p} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(0,0,0,.38),transparent 35%,rgba(0,0,0,.24) 80%,rgba(0,0,0,.55))'}}/>
  <div style={{position:'absolute',left:0,top:speakerTop,width:1080,height:speakerHeight,overflow:'hidden',boxShadow:'0 25px 90px #0006'}}><Footage p={p} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 42%'}}/></div>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 44%,transparent 35%,rgba(0,0,0,.24) 70%,rgba(0,0,0,.77) 100%)',pointerEvents:'none'}}/>
  {slot&&<ProjectCard slot={slot} top={panelTop} opacity={lift} time={time} speed={speed}/>}
  {p.subtitles&&<Subtitles source={source} time={time} size={p.subtitleSize} centerY={captionCenter}/>}
 </AbsoluteFill></AbsoluteFill>;
};
export const Root=()=> <Composition id="Main" component={Edit} schema={schema} defaultProps={{
 introStart:1.1,
 introSeconds:43.66,
 mainStart:43.4,
 mainSeconds:143.8546,
 audioVolume:1,
 fadeEdges:true,
 subtitles:true,
 subtitleSize:48,
 showcase:true,
}} width={1080} height={1920} fps={fps} durationInFrames={4109} calculateMetadata={({props})=>{const t=timing(props);return {durationInFrames:t.intro+t.main};}}/>;
