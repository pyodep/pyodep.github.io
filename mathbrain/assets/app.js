window.addEventListener('load',function(){
document.querySelectorAll('[data-math]').forEach(function(el){
  try{katex.render(el.textContent,el,{displayMode:el.classList.contains('math-block'),throwOnError:false});}
  catch(e){}
});
(function(){var b=document.getElementById('theme-btn');if(!b)return;
b.addEventListener('click',function(){
  var h=document.documentElement,
      cur=h.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),
      nx=cur==='dark'?'light':'dark';
  h.dataset.theme=nx;localStorage.setItem('theme',nx);});
})();
(function(){
  var q=document.getElementById('q'),box=document.getElementById('results'),
      root=window.__ROOT||'',idx=window.__IDX||[],sel=-1;
  if(!q)return;
  function hide(){box.style.display='none';sel=-1;}
  function run(){
    var v=q.value.trim().toLowerCase();if(!v){hide();return;}
    var cur=idx.filter(function(x){return x.t.toLowerCase().indexOf(v)>=0;});
    cur.sort(function(a,b){return (a.s|0)-(b.s|0);});
    cur=cur.slice(0,40);
    box.innerHTML=cur.map(function(x){
      return '<a href="'+root+x.u+'"><span'+(x.s?' class="stub-r"':'')+'>'+x.t+
      '</span><div class="u">'+x.d+'</div></a>';}).join('');
    box.style.display=cur.length?'block':'none';sel=-1;
  }
  q.addEventListener('input',run);
  q.addEventListener('keydown',function(e){
    var items=box.querySelectorAll('a');
    if(e.key==='ArrowDown'){sel=Math.min(sel+1,items.length-1);}
    else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);}
    else if(e.key==='Enter'){if(items[sel])location.href=items[sel].href;return;}
    else if(e.key==='Escape'){hide();q.blur();return;}else return;
    items.forEach(function(a,i){a.classList.toggle('sel',i===sel);});
    if(items[sel])items[sel].scrollIntoView({block:'nearest'});e.preventDefault();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();}
  });
  document.addEventListener('click',function(e){if(!box.contains(e.target)&&e.target!==q)hide();});
})();
(function(){
  var toc=document.getElementById('toc');if(!toc)return;
  var links={},hs=document.querySelectorAll('main h2[id],main h3[id]');
  toc.querySelectorAll('a').forEach(function(a){links[decodeURIComponent(a.hash.slice(1))]=a;});
  var obs=new IntersectionObserver(function(es){
    es.forEach(function(en){
      var a=links[en.target.id];if(!a)return;
      if(en.isIntersecting){
        toc.querySelectorAll('a.active').forEach(function(x){x.classList.remove('active');});
        a.classList.add('active');}
    });},{rootMargin:'0px 0px -75% 0px'});
  hs.forEach(function(h){obs.observe(h);});
})();
});