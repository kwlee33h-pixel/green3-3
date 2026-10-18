'use strict';
const q=document.getElementById('q'),list=document.getElementById('list'),count=document.getElementById('count');
let data=[];
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function highlighted(s,kw){if(!kw)return escapeHtml(s);const original=String(s),lower=original.toLocaleLowerCase(),needle=kw.toLocaleLowerCase();let out='',at=0,pos;while((pos=lower.indexOf(needle,at))!==-1){out+=escapeHtml(original.slice(at,pos))+'<mark>'+escapeHtml(original.slice(pos,pos+kw.length))+'</mark>';at=pos+kw.length;}return out+escapeHtml(original.slice(at));}
function render(){const kw=q.value.trim(),term=kw.toLocaleLowerCase();const filtered=term?data.filter(a=>[a.조,a.제목,a.본문].some(v=>String(v).toLocaleLowerCase().includes(term))):data;count.textContent=`결과 ${filtered.length}건`;list.innerHTML=filtered.length?filtered.map(a=>`<article class="card"><div class="card-head"><span class="label">${highlighted(a.조,kw)}</span><div class="title">${highlighted(a.제목,kw)}</div></div><div class="body">${highlighted(a.본문,kw)}</div></article>`).join(''):'<div class="empty">검색 결과가 없습니다. 다른 키워드로 검색해 주세요.</div>';}
q.addEventListener('input',render);document.getElementById('clear').addEventListener('click',()=>{q.value='';render();q.focus();});
// data.js provides a local-file fallback; hosted deployment also reads the original JSON.
if(location.protocol==='file:'){data=window.LAW_DATA||[];render();}else{fetch('./조항데이터.json').then(r=>{if(!r.ok)throw Error('JSON 로드 실패');return r.json();}).then(d=>{data=d;render();}).catch(()=>{data=window.LAW_DATA||[];render();});}
