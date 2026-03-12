 // Cursor
  const cur=document.getElementById('cur'),ring=document.getElementById('ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function tick(){
    cur.style.transform=`translate(${mx-4.5}px,${my-4.5}px)`;
    rx+=(mx-rx)*.13;ry+=(my-ry)*.13;
    ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.album-cover,.sub-img,.fb,.gc').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('h'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('h'));
  });

  // Navbar
  window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('sc',scrollY>55));

  // Reveal
  const ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis');}),{threshold:.1});
  document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

  // Filter
  document.querySelectorAll('.fb').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.fb').forEach(x=>x.classList.remove('act'));
    b.classList.add('act');
    const f=b.dataset.f;
    document.querySelectorAll('.album').forEach(item=>{
      item.classList.toggle('hidden', f!=='all' && item.dataset.c!==f);
    });
  }));

  // Album expand — click cover to open, click again to close
  document.querySelectorAll('.album-cover').forEach(cover=>{
    cover.addEventListener('click',()=>{
      const album=cover.closest('.album');
      const isOpen=album.classList.contains('open');
      document.querySelectorAll('.album.open').forEach(a=>a.classList.remove('open'));
      if(!isOpen) album.classList.add('open');
    });
  });

  // Close strip button
  document.querySelectorAll('.album-close').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      btn.closest('.album').classList.remove('open');
    });
  });

  // Lightbox for sub-photos
  document.querySelectorAll('.sub-img').forEach(si=>{
    si.addEventListener('click',e=>{
      e.stopPropagation();
      const img=si.querySelector('img');
      if(img){
        document.getElementById('lbimg').src=img.src;
        document.getElementById('lb').classList.add('open');
      }
    });
  });
  document.getElementById('lbclose').addEventListener('click',()=>document.getElementById('lb').classList.remove('open'));
  document.getElementById('lb').addEventListener('click',e=>{if(e.target.id==='lb')document.getElementById('lb').classList.remove('open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('lb').classList.remove('open');});

  // Animated numbers
  const no=new IntersectionObserver(e=>e.forEach(x=>{
    if(!x.isIntersecting)return;
    const el=x.target,t=parseInt(el.textContent);
    let c=0;const s=Math.max(1,Math.ceil(t/50));
    const iv=setInterval(()=>{c=Math.min(c+s,t);el.textContent=c+'+';if(c>=t)clearInterval(iv);},28);
    no.unobserve(el);
  }),{threshold:.5});
  document.querySelectorAll('.sn').forEach(el=>no.observe(el));

  function send(){
    const b=document.getElementById('sendbtn');
    b.textContent='Sent ✓';b.style.background='#3a6b4a';
    setTimeout(()=>{b.textContent='Send Message';b.style.background='';},3000);
  }