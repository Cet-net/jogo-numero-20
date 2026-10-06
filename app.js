const $=id=>document.getElementById(id);
let position=1,turn=0,state='ready',busy=false,timer,faceTimer;
const faces=['⚀','⚁','⚂','⚃','⚄','⚅'];
for(let n=1;n<=20;n++){
 const cell=document.createElement('div');cell.className='cell'+([4,8,12,16].includes(n)?' danger':'')+(n===20?' goal':'');cell.id='cell'+n;
 cell.innerHTML=`<span>${n}</span><small>${n===1?'INÍCIO':n===20?'CHEGADA':[4,8,12,16].includes(n)?'↺':''}</small>`;$('board').appendChild(cell);
}
const reaction=document.createElement('div');reaction.className='reaction';reaction.textContent='Oh No!';reaction.hidden=true;$('board').appendChild(reaction);
function render(){
 document.querySelectorAll('.cell').forEach((c,i)=>{c.classList.toggle('current',i+1===position);c.setAttribute('aria-label',`Casa ${i+1}${[4,8,12,16].includes(i+1)?', volta ao início':''}${i+1===position?', você está aqui':''}`)});
 $('position').textContent=`Casa ${position} / 20`;$('count').textContent=`${turn} / 12`;$('counter').textContent=`${12-turn} ${12-turn===1?'jogada restante':'jogadas restantes'}`;$('roll').disabled=(state!=='playing'&&state!=='ready')||busy;if(state==='ready')$('roll').textContent='Começar partida →';
}
function clearEffects(){reaction.hidden=true;document.querySelectorAll('.cell').forEach(c=>c.classList.remove('hop','hit'));}
function emptyRows(){$('rows').innerHTML=Array.from({length:12},(_,i)=>`<tr id="row${i+1}"><td>${String(i+1).padStart(2,'0')}</td><td>—</td><td>—</td><td>—</td></tr>`).join('');}
function start(){clearTimeout(timer);clearInterval(faceTimer);clearEffects();busy=false;position=1;turn=0;state='playing';emptyRows();$('die').textContent='⚄';$('die').classList.remove('rolling');$('die').setAttribute('aria-label','Dado ainda não lançado');$('roll').innerHTML='Rolar o dado <span>↗</span>';$('message').className='message';$('message').textContent='Vamos lá! Role o dado para dar o primeiro passo.';$('start').hidden=false;$('start').textContent='Recomeçar partida ↺';render();}
function finish(value,result){
 clearEffects();position=result.final;state=result.outcome;
 const row=$('row'+turn);row.className=result.reset?'reset-row':'';row.innerHTML=`<td>${String(turn).padStart(2,'0')}</td><td class="rolled">${value}</td><td>${result.reached}</td><td>${result.final}${result.reset?' ↺':''}</td>`;
 let message=result.reset?`Oh No! Caiu na casa ${result.reached}. De volta à casa 1!`:`Você tirou ${value} e chegou à casa ${position}.`;
 $('message').className='message';
 if(state==='won'){message='Você venceu! Chegou exatamente à casa 20. ✦';$('message').className='message success';}
 if(state==='overshoot'){message=`Você tirou ${value} e chegou a ${result.reached}: passou de 20. Fim de jogo!`;$('message').className='message loss';}
 if(state==='exhausted'){message=`${result.reset?'Oh No! Voltou à casa 1. ':''}As 12 jogadas acabaram. Fim de jogo!`;$('message').className='message loss';}
 $('message').textContent=message;$('roll').innerHTML='Rolar o dado <span>↗</span>';busy=false;render();
}
function walk(value,result,reduced){
 $('roll').textContent='Andando…';const destination=Math.min(result.reached,20);let steps=0;
 function land(){
  if(result.reset){$('cell'+position).classList.add('hit');reaction.hidden=false;$('message').className='message loss';$('message').textContent=`Oh No! Casa ${result.reached} vermelha. Você vai voltar ao início.`;$('roll').textContent='Voltando ao início…';timer=setTimeout(()=>finish(value,result),1300);}
  else{timer=setTimeout(()=>finish(value,result),result.outcome==='overshoot'?650:250);}
 }
 function step(){
  document.querySelectorAll('.hop').forEach(c=>c.classList.remove('hop'));
  if(position<destination){position++;steps++;render();if(!reduced)$('cell'+position).classList.add('hop');$('message').textContent=`Dado ${value}: passo ${steps} de ${value} — casa ${position}.`;timer=setTimeout(step,reduced?130:340);}
  else land();
 }
 timer=setTimeout(step,250);
}
function roll(){
 if(state==='ready'){start();return;}if(state!=='playing'||busy)return;busy=true;clearEffects();const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;$('message').className='message';$('die').classList.add('rolling');$('die').setAttribute('aria-label','Dado rolando');$('roll').textContent='Rolando…';$('message').textContent='O dado está rolando…';render();
 if(!reduced){let face=0;faceTimer=setInterval(()=>{$('die').textContent=faces[face++%6]},90);}
 timer=setTimeout(()=>{
  clearInterval(faceTimer);const bytes=new Uint32Array(1);let number;do{crypto.getRandomValues(bytes);number=bytes[0]}while(number>=4294967292);const value=number%6+1;
  turn++;const result=gameAdvance(position,value,turn);$('die').textContent=faces[value-1];$('die').setAttribute('aria-label',`Dado: ${value}`);$('die').classList.remove('rolling');$('message').textContent=`Você tirou ${value}! Vamos avançar.`;render();walk(value,result,reduced);
 },reduced?150:1100);
}
$('start').addEventListener('click',start);$('roll').addEventListener('click',roll);emptyRows();render();


