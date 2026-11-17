import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';

const gold='#FFE477';
const Metric:React.FC<{value:string;label:string}>=({value,label})=><div style={{marginBottom:36}}><div style={{fontSize:82,lineHeight:1.05,fontWeight:650,letterSpacing:-3,color:gold}}>{value}</div><div style={{fontSize:24,lineHeight:1.4,color:'#c5c9c9',marginTop:13}}>{label}</div></div>;
export const MusicScreens:React.FC<{asset:string;kind:string;progress:number}>=({asset,kind,progress})=>{
 const movement=interpolate(progress,[0,1],[0,22],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'#0c1013',overflow:'hidden',fontFamily:'Segoe UI,Arial,sans-serif',color:'#fff'}}>
  {kind==='music-profile'&&<>
   <div style={{position:'absolute',left:38,top:30,width:540,height:660,overflow:'hidden',borderRadius:15,border:'1px solid #ffffff14'}}><Img src={staticFile(asset)} style={{width:540,height:'auto',transform:`translateY(${-movement}px)`}}/></div>
   <div style={{position:'absolute',left:630,top:155,right:32}}><div style={{fontSize:22,letterSpacing:3,color:'#9da8aa',marginBottom:34}}>CBA MUSIC</div><Metric value="14,8 K" label="sledovateľov"/><div style={{width:52,height:3,background:gold,margin:'35px 0'}}/><div style={{fontSize:27,lineHeight:1.5}}>Hudba.<br/>Obsah.<br/>Komunita.</div></div>
  </>}
  {kind==='music-monthly'&&<>
   <div style={{position:'absolute',left:28,top:25,width:520,height:670,overflow:'hidden',borderRadius:15,border:'1px solid #ffffff14'}}><Img src={staticFile(asset)} style={{width:520,height:'auto',transform:`translateY(${-460-movement}px)`}}/></div>
   <div style={{position:'absolute',left:610,top:76,right:35}}><div style={{fontSize:21,letterSpacing:3,color:'#9da8aa',marginBottom:30}}>JÚNOVÝ PREHĽAD</div><Metric value="11 M" label="zobrazení"/><Metric value="97 %" label="od nesledovateľov"/><div style={{fontSize:25,color:'#d9ddda'}}>+4 993 sledovateľov</div></div>
  </>}
  {kind==='music-reels'&&<>
   <div style={{position:'absolute',left:46,top:65,fontSize:23,letterSpacing:3,color:'#9da8aa'}}>CBA MUSIC · REELS</div>
   <Img src={staticFile(asset)} style={{position:'absolute',left:0,top:190,width:1080,height:'auto'}}/>
   <div style={{position:'absolute',left:0,right:0,top:452,display:'flex',justifyContent:'space-around'}}>{['4,7 M','6,9 M','6,4 M'].map(v=><div key={v} style={{textAlign:'center'}}><div style={{fontSize:64,fontWeight:650,color:gold}}>{v}</div><div style={{fontSize:21,color:'#c5c9c9',marginTop:12}}>zobrazení</div></div>)}</div>
  </>}
  {kind==='music-insights'&&<>
   <div style={{position:'absolute',left:45,top:30,fontSize:22,letterSpacing:3,color:'#9da8aa'}}>INSTAGRAM INSIGHTS</div>
   <Img src={staticFile(asset)} style={{position:'absolute',left:32,top:90,width:1016,height:600,objectFit:'contain',transform:`scale(${1+progress*.015})`}}/>
  </>}
 </AbsoluteFill>;
};
