"use strict";
(function(){
  const T = window.WST_T;
  function $(s,c){return (c||document).querySelector(s);}
  function on(el,ev,fn){if(el)el.addEventListener(ev,fn);}
  T.rangeOut('q','qv','%');
  const mode = $('#mode'), w=$('#w'), h=$('#h'), lock=$('#lock'), tk=$('#targetKb'), ck=$('#customKb'), fmt=$('#fmt'), q=$('#q');
  function toggle(){ const m=mode.value; document.querySelectorAll('.fld').forEach(f=>{ /* simple */ }); }
  on(mode,'change',()=>{
    const m=mode.value;
    if(m==='px'){ w.disabled=false; h.disabled=false; lock.disabled=false; tk.disabled=true; ck.disabled=true; }
    else { w.disabled=true; h.disabled=true; lock.disabled=true; tk.disabled=false; ck.disabled=false; }
  });
  mode.dispatchEvent(new Event('change'));
  on(tk,'change',()=>{ ck.disabled = tk.value!=='custom'; });
  tk.dispatchEvent(new Event('change'));
  let aspect=1;
  on($('#file'),'change',e=>{
    const f=(e.target.files||[])[0]; if(!f) return;
    const img=new Image(); img.onload=()=>{ aspect=img.width/img.height||1; if(lock.checked){ if(document.activeElement===w){ h.value=Math.round(w.value/aspect);} else { w.value=Math.round(h.value*aspect);} } img.remove(); }; img.src=URL.createObjectURL(f);
  });
  on(w,'input',()=>{ if(lock.checked && mode.value==='px'){ h.value = Math.round(w.value/aspect); }});
  on(h,'input',()=>{ if(lock.checked && mode.value==='px'){ w.value = Math.round(h.value*aspect); }});

  T.imageTool({
    acceptRe:/\.(jpe?g|png|webp|heic|heif)$/i,
    typeRe:/image\/|\.heic/i,
    label:'images',
    multiple:true,
    zipName:'adjusted-images',
    readOpts(){ 
      const m=mode.value; 
      let targetKb=null; 
      if(m==='kb'){ targetKb = tk.value==='custom'? Number(ck.value): Number(tk.value); }
      return {mode:m, w:Number(w.value), h:Number(h.value), targetKb, fmt:fmt.value, q:Number(q.value)/100}; 
    },
    async process(ctx){
      const {bmp,file,opts,base,out} = ctx;
      let canvas;
      if(opts.mode==='px' && opts.w>0 && opts.h>0){
        canvas = document.createElement('canvas');
        canvas.width = Math.round(opts.w); canvas.height = Math.round(opts.h);
        const cctx = canvas.getContext('2d');
        cctx.fillStyle='#fff'; cctx.fillRect(0,0,canvas.width,canvas.height);
        cctx.imageSmoothingEnabled=true; cctx.imageSmoothingQuality='high';
        cctx.drawImage(bmp,0,0,canvas.width,canvas.height);
      }else{
        canvas = T.canvasOf(bmp,1);
      }
      if(opts.mode==='kb' && opts.targetKb){
        const target = opts.targetKb*1024;
        let best=null, bestDiff=1e9;
        for(let qq=0.9; qq>=0.4; qq-=0.05){
          const b = await T.toBlob(canvas, opts.fmt==='image/png'?'image/jpeg':opts.fmt, qq);
          if(b){ if(b.size <= target){ best={b,q:qq}; break; } if(Math.abs(b.size-target)<bestDiff){ bestDiff=Math.abs(b.size-target); best={b,q:qq}; } }
          await T.yieldUI();
        }
        if(!best) best={b: await T.toBlob(canvas, opts.fmt==='image/png'?'image/jpeg':opts.fmt, 0.5)};
        const ext = opts.fmt==='image/webp'?'webp':'jpg';
        out([{name: base+'.'+ext, blob: best.b, type: best.b.type, note: T.bytes(best.b.size)}]);
        return;
      }
      const blob = await T.encode(canvas, opts.fmt, opts.q);
      out([{name: base+'.'+T.ext(opts.fmt), blob, type: blob.type, note: T.bytes(blob.size)}]);
    }
  });
})();
