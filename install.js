const installButton=document.getElementById('install');
const installNote=document.getElementById('install-note');
let installPrompt=null;
const installed=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
function installedUI(){if(installed()){installButton.hidden=true;installNote.textContent='O jogo está aberto como aplicativo.';}}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;installNote.textContent='Instale para abrir o jogo pelo seu ícone.';});
installButton.addEventListener('click',async()=>{
 if(!installPrompt){document.getElementById('install-help').open=true;installNote.textContent=location.protocol==='file:'?'Para instalar, abra o endereço do jogo publicado no GitHub Pages.':'Veja abaixo como instalar no seu dispositivo.';return;}
 const prompt=installPrompt;installPrompt=null;
 try{await prompt.prompt();const choice=await prompt.userChoice;installNote.textContent=choice.outcome==='accepted'?'Instalação solicitada. Aguarde a confirmação do navegador.':'Você pode instalar pelo menu do navegador quando quiser.';}catch{installNote.textContent='Use o menu do navegador para instalar o jogo.';}
});
window.addEventListener('appinstalled',()=>{installButton.hidden=true;installNote.textContent='Jogo instalado! Abra pelo ícone no seu dispositivo.';});
installedUI();
if('serviceWorker' in navigator&&window.isSecureContext&&location.protocol!=='file:'){
 navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{if(!installed()&&!installPrompt)installNote.textContent='Jogo disponível offline. Use “Instalar jogo” para ver as opções.';}).catch(()=>{installNote.textContent='O modo offline não foi ativado. Reabra o jogo com internet para tentar novamente.';});
}
