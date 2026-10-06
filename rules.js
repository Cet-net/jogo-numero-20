(function(root){
  function advance(position, roll, turn){
    const reached=position+roll;
    const reset=[4,8,12,16].includes(reached);
    const final=reset||reached>20?1:reached;
    const outcome=reached===20?'won':reached>20?'overshoot':turn>=12?'exhausted':'playing';
    return {reached,final,reset,outcome};
  }
  root.gameAdvance=advance;
  if(typeof module!=='undefined')module.exports=advance;
})(typeof window==='undefined'?globalThis:window);
