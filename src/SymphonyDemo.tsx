import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

const ease = (t: number, a: number, b: number) => {
  const p = Math.max(0, Math.min(1, (t-a)/(b-a)));
  return p*p*(3-2*p);
};
const detail = 'showcase/symphony-detail.png';
const DateCutout: React.FC<{style: React.CSSProperties}> = ({style}) =>
  <div style={{position:'absolute',width:312,height:90,overflow:'hidden',background:'white',
    borderRadius:6,boxShadow:'0 7px 25px #0005',...style}}>
    <Img src={staticFile('showcase/identity-date.png')} style={{display:'block',width:'100%'}}/>
  </div>;
export const SymphonyDemo: React.FC<{seconds: number; overlay?: boolean}> = ({seconds:t,overlay=false}) => {
  const scroll = 40*ease(t,0,6.8);
  if (!overlay) return <AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>
    <div style={{position:'relative',width:980,height:560,overflow:'hidden',borderRadius:9,boxShadow:'0 9px 30px #0005',background:'white'}}>
      <Img src={staticFile(detail)} style={{position:'absolute',width:2400,maxWidth:'none',left:-1460,top:-520-scroll}}/>
      {[{top:226,width:390,at:1.2},{top:364,width:133,at:3.1}].map((h,i)=>
        <div key={i} style={{position:'absolute',left:242,top:h.top-scroll,height:28,
          width:h.width*ease(t,h.at,h.at+.7),background:'#ffdb65',mixBlendMode:'multiply',opacity:.65}}/>)}
      {t>4.6 && <DateCutout style={{left:245,top:355-scroll,
        transform:'scale('+(1+.28*ease(t,4.6,5.6))+')',opacity:ease(t,4.6,5.1)}}/>}
    </div>
  </AbsoluteFill>;
  const appear=ease(t,6.5,7.1);
  const close=ease(t,7.5,8.6)*(1-ease(t,14.79,15.65));
  const focus=ease(t,10.2,10.7)*(1-ease(t,12.7,13.2));
  const scale=1.5+.45*close;
  const x=70-70*close;
  const y=330+30*close;
  return <AbsoluteFill style={{opacity:appear,overflow:'hidden'}}>
    <AbsoluteFill style={{background:'rgba(0,0,0,.28)',backdropFilter:'blur(6px)'}}/>
    <div style={{position:'absolute',left:x,top:y,width:626,height:713,
      transform:'scale('+scale+')',transformOrigin:'0 0',boxShadow:'0 15px 65px #0008'}}>
      <Img src={staticFile('showcase/identity-terminal.png')} style={{width:'100%',display:'block'}}/>
      <div style={{position:'absolute',left:104,top:80,width:97*ease(t,8.5,9.1),height:19,background:'#ffdb65',mixBlendMode:'screen',opacity:.4}}/>
      <div style={{position:'absolute',left:104,top:100,width:108*ease(t,9.1,9.7),height:19,background:'#ffdb65',mixBlendMode:'screen',opacity:.4}}/>
      <AbsoluteFill style={{background:'rgba(0,0,0,'+(.78*focus)+')'}}/>
      {focus>0 && <div style={{position:'absolute',left:12,top:158,width:465,height:43,overflow:'hidden',
        opacity:focus,boxShadow:'0 0 20px #70f69788',outline:'2px solid #70f697',background:'#0c0c0c'}}>
        <Img src={staticFile('showcase/identity-terminal.png')} style={{position:'absolute',width:626,maxWidth:'none',left:-12,top:-158}}/>
        <AbsoluteFill style={{background:'rgba(70,255,139,.16)',mixBlendMode:'screen'}}/>
      </div>}
    </div>
    <DateCutout style={{left:650,top:435,transform:'scale(1)',opacity:1}}/>
  </AbsoluteFill>;
};
