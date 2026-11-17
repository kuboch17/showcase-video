import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';

const yellow = '#F6D96C';
const Stat: React.FC<{value:string; label:string; note?:string}> = ({value,label,note}) => <div style={{marginBottom:35}}>
  <div style={{fontSize:72,fontWeight:600,letterSpacing:-3,color:yellow,lineHeight:1.1}}>{value}</div>
  <div style={{fontSize:23,color:'#f2f0e8',marginTop:10}}>{label}</div>
  {note && <div style={{fontSize:17,color:'#9ca294',marginTop:9,lineHeight:1.5}}>{note}</div>}
</div>;

export const CbaShowcase: React.FC<{kind:string;asset:string;elapsed:number;duration:number}> = ({kind,asset,elapsed,duration}) => {
  const zoom=interpolate(elapsed,[0,duration],[1,1.025],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const enter=interpolate(elapsed,[0,.4],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const imageStyle: React.CSSProperties={width:'100%',height:'100%',objectFit:'contain',transform:`scale(${zoom})`};
  return <AbsoluteFill style={{padding:32,background:'radial-gradient(ellipse at 80% 20%,#262a1a,#10130f 70%)',opacity:enter}}>
    {kind==='music-profile' && <>
      <div style={{position:'absolute',left:50,top:24,width:365,height:568,overflow:'hidden',borderRadius:18,border:'1px solid #363a31',background:'#0c1013'}}>
        <Img src={staticFile(asset)} style={{width:'100%',transform:`translateY(-8px) scale(${zoom})`,transformOrigin:'top center'}}/>
      </div>
      <div style={{position:'absolute',left:475,top:100,right:40}}>
        <div style={{fontSize:17,letterSpacing:4,color:'#a7ab9d',marginBottom:25}}>@cba_slovakia</div>
        <Stat value="14,8 K" label="sledovateľov na Instagrame"/>
        <div style={{fontSize:28,lineHeight:1.5,maxWidth:520}}>Hudba. Obsah. Komunita.</div>
        <div style={{fontSize:19,color:'#a7ab9d',lineHeight:1.6,marginTop:14}}>Vlastné vydania a priame spojenie s publikom.</div>
      </div>
    </>}
    {kind==='music-reels' && <>
      <div style={{fontSize:17,letterSpacing:4,color:'#a7ab9d',marginTop:28,marginLeft:10}}>OBSAH, KTORÝ SA ŠÍRI</div>
      <div style={{height:220,marginTop:55,overflow:'hidden',borderRadius:12,border:'1px solid #363a31',background:'#000'}}><Img src={staticFile(asset)} style={imageStyle}/></div>
      <div style={{display:'flex',justifyContent:'space-around',marginTop:43}}>{['4,7 M','6,9 M','6,4 M'].map(v=><div key={v} style={{textAlign:'center'}}><div style={{fontSize:54,color:yellow,fontWeight:600}}>{v}</div><div style={{fontSize:17,color:'#a7ab9d',marginTop:7}}>zobrazení príspevku</div></div>)}</div>
    </>}
    {kind==='music-monthly' && <>
      <div style={{position:'absolute',top:22,bottom:22,left:50,width:286,overflow:'hidden',borderRadius:14,border:'1px solid #363a31',background:'#0c1013'}}><Img src={staticFile(asset)} style={imageStyle}/></div>
      <div style={{position:'absolute',left:405,top:62,right:45}}>
        <div style={{fontSize:17,letterSpacing:4,color:'#a7ab9d',marginBottom:25}}>JÚNOVÝ PREHĽAD INSTAGRAMU</div>
        <Stat value="11 M" label="zobrazení Reels a príspevkov" note="+1 292 % oproti máju"/>
        <Stat value="97 %" label="zobrazení od nesledovateľov"/>
        <div style={{fontSize:19,color:'#a7ab9d'}}>+4 993 sledovateľov oproti máju</div>
      </div>
    </>}
    {kind==='music-insights' && <>
      <div style={{position:'absolute',left:24,top:94,width:694,height:470,overflow:'hidden',borderRadius:14,border:'1px solid #363a31',background:'#000'}}><Img src={staticFile(asset)} style={imageStyle}/></div>
      <div style={{position:'absolute',left:760,top:100,right:24}}>
        <Stat value="10 M+" label="zobrazení" note="10 038 000 v zobrazenom prehľade"/>
        <Stat value="4,69 M" label="oslovených účtov"/>
        <div style={{fontSize:20,color:'#a7ab9d'}}>97,9 % zobrazení od nesledovateľov</div>
      </div>
      <div style={{fontSize:17,letterSpacing:4,color:'#a7ab9d',marginTop:15}}>REÁLNE VÝSLEDKY · INSTAGRAM INSIGHTS</div>
    </>}
  </AbsoluteFill>;
};
