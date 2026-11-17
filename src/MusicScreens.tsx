import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';

export const MusicScreens:React.FC<{asset:string;kind:string;progress:number}>=({asset,kind,progress})=>{
 const full=kind==='music-profile-full'||kind==='music-monthly-full';
 const pop=kind.startsWith('music-pop-');
 const index=pop?Number(kind.slice(-1)):0;
 const reveal=interpolate(progress,[0,.18,.84,1],[.88,1,1,.97],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:t=>1-Math.pow(1-t,3)});
 return <AbsoluteFill style={{background:pop?'transparent':'#0b1014',overflow:'hidden',fontFamily:'Segoe UI,Arial,sans-serif'}}>
  {full&&<>
   <AbsoluteFill style={{opacity:.19,filter:'blur(35px)',transform:'scale(1.15)'}}><Img src={staticFile(asset)} style={{width:'100%',height:'100%',objectFit:'cover'}}/></AbsoluteFill>
   <AbsoluteFill style={{background:'linear-gradient(90deg,#080c10a0,transparent,#080c10a0)'}}/>
   <Img src={staticFile(asset)} style={{position:'absolute',left:0,top:18,width:1080,height:684,objectFit:'contain',filter:'drop-shadow(0 15px 24px #0008)'}}/>
  </>}
  {kind==='music-followers'&&<>
   <div style={{position:'absolute',left:70,top:132,width:940,height:420,overflow:'hidden',borderRadius:16,boxShadow:'0 20px 55px #0009',border:'1px solid #ffffff14'}}>
    <Img src={staticFile(asset)} style={{position:'absolute',width:1600,height:'auto',left:-390,top:-310}}/>
    <div style={{position:'absolute',left:262,top:104,width:365,height:160,border:'2px solid #f3e3aa99',borderRadius:18,boxShadow:'0 0 0 999px #0004'}}/>
   </div>
   <div style={{position:'absolute',left:0,right:0,top:595,textAlign:'center',fontSize:25,letterSpacing:4,color:'#ddd3b3'}}>KOMUNITA OKOLO HUDBY</div>
  </>}
  {kind==='music-insights'&&<Img src={staticFile(asset)} style={{width:'100%',height:'100%',objectFit:'contain'}}/>}
  {pop&&<div style={{position:'absolute',left:90,top:145,width:900,height:431,overflow:'hidden',borderRadius:15,boxShadow:'0 20px 60px #000a',transform:`scale(${reveal})`}}>
   <Img src={staticFile(asset)} style={{position:'absolute',left:-index*900,top:0,width:2700,height:'auto',maxWidth:'none'}}/>
  </div>}
 </AbsoluteFill>;
};
