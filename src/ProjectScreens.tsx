import React from 'react';
import {AbsoluteFill} from 'remotion';

const paper = '#eeeae1';
const ink = '#182d2a';
const green = '#006b56';
const panel: React.CSSProperties = {background: paper, color: ink, padding: '52px 72px', fontFamily: 'Segoe UI, Arial, sans-serif'};
const header: React.CSSProperties = {fontSize: 26, color: green, fontWeight: 650, letterSpacing: 2, marginBottom: 25};
const card: React.CSSProperties = {background: '#fffdf6', padding: '24px 32px', borderRadius: 16, fontSize: 36};
const tasks = [
  'AI extrakcia údajov z nahraných súborov',
  'AI asistent nad grantovými programami + generovanie formulárov',
  'Redizajn form buildera',
  'Vizuálny builder šablón dokumentov',
];

export const Tasks: React.FC<{elapsed: number}> = ({elapsed}) => (
  <AbsoluteFill style={{
    background: 'white', color: '#192723', padding: '40px 76px',
    fontFamily: '"Segoe UI", Arial, sans-serif', justifyContent: 'center',
  }}>
    <h2 style={{margin: '0 0 22px', fontSize: 64, lineHeight: 1.05, letterSpacing: -2.8, fontWeight: 600}}>
      <span style={{color: '#08725c'}}>4</span> výzvy
    </h2>
    <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
      {tasks.map((task, index) => {
        const progress = Math.min(1, Math.max(0, (elapsed - 0.12 - index * 0.18) / 0.44));
        const reveal = 1 - (1 - progress) ** 3;
        return <li key={task} style={{
          borderTop: index === 0 ? '2px solid #8daba1' : '1px solid #cbd6d2',
          display: 'flex', alignItems: 'baseline', gap: 22, padding: '17px 0',
          opacity: reveal, transform: 'translateY(' + (1 - reveal) * 10 + 'px)',
          fontSize: 37, lineHeight: 1.22, letterSpacing: -0.65, fontWeight: 450,
        }}>
          <span aria-hidden="true" style={{
            flex: '0 0 9px', height: 9, alignSelf: 'flex-start', marginTop: 20,
            background: '#08725c', borderRadius: '50%',
          }}/>
          <span style={{textWrap: 'pretty'}}>{task}</span>
        </li>;
      })}
    </ul>
  </AbsoluteFill>
);

export const GrantDemo: React.FC<{time: number}> = ({time}) => {
  const chat = time >= 34.16;
  const question = 'V akom stave je moja žiadosť?';
  const steps = ['Otvorenie žiadosti', 'Kontrola stavu v eGrante', 'Výsledok pripravený'];
  return <AbsoluteFill style={{...panel, padding:'240px 74px 260px', background:chat ? '#162f2d' : '#e6e4da'}}>
    <div style={{...header, color:chat?'#a4dac3':green}}>eGrant · Ukážka rozhrania</div>
    <div style={{fontSize:76, fontWeight:650, color:chat?'#fffbed':ink, marginBottom:70}}>
      {chat?'Grantový asistent':'Správa žiadostí'}</div>
    {chat ? <>
      <div style={{...card, marginLeft:116, background:'#d6e9da', minHeight:98}}>{question.slice(0, Math.floor((time-34.16)*17))}</div>
      {time >= 36.48 && <div style={{...card, marginTop:42, padding:'40px'}}>
        <div style={header}>Priebeh požiadavky</div>
        {steps.map((step,i)=><div key={step} style={{padding:'24px 0',opacity:time>=36.48+i*1.8?1:.25,borderTop:'1px solid #c1cfc2'}}>{time>=36.48+i*1.8?'✓':'○'}　{step}</div>)}
      </div>}
      {time >= 41.46 && <div style={{...card,marginTop:24}}>Žiadosť je v hodnotení.</div>}
    </> : <div style={{...card, borderRadius:4, padding:40}}>
      <div style={header}>Programy　/　Žiadosti　/　Detail</div>
      {['Grantový program','Evidenčné číslo','Žiadateľ','Stav žiadosti'].map((field,i)=><div key={field} style={{marginTop:26,fontSize:26,color:'#546361'}}>{field}<div style={{border:'2px solid #b6c0ba',padding:18,color:ink,fontSize:33,marginTop:7}}>{['Rozvojový grant','GR-042','Ukážková organizácia','V hodnotení'][i]}</div></div>)}
    </div>}
  </AbsoluteFill>;
};

export const IndexCard: React.FC<{index: boolean}> = ({index}) => <AbsoluteFill style={{...panel,justifyContent:'center'}}>
  <div style={header}>{index?'XERJ AI Corpus Hub':'GitHub  /  kuboch17'}</div>
  <div style={{fontSize:76,fontWeight:650,marginBottom:20}}>{index?'AI reference index':'Llamassage'}</div>
  <div style={{...card, borderLeft:'6px solid '+green}}>
    {index?'flutter-godot-llamassageapp':'Flutter + Godot'}<div style={{fontSize:28,color:'#486660',marginTop:12}}>{index?'Projekt zaradený do indexu':'Mobilná aplikácia · Android / iOS'}</div>
  </div>
</AbsoluteFill>;

