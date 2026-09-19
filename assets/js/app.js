const menu=document.querySelector('.menu');const links=document.querySelector('.nav-links');if(menu)menu.addEventListener('click',()=>{links.classList.toggle('open');menu.classList.toggle('open')});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const counters=document.querySelectorAll('[data-count]');const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,to=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(to/45));const tick=()=>{n=Math.min(to,n+step);el.textContent=n+(el.dataset.suffix||'');if(n<to)requestAnimationFrame(tick)};tick();co.unobserve(el)}}),{threshold:.7});counters.forEach(x=>co.observe(x));
document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{const item=q.parentElement;document.querySelectorAll('.faq-item.open').forEach(x=>{if(x!==item)x.classList.remove('open')});item.classList.toggle('open')}));

const quoteForm=document.querySelector('#quote-form');
if(quoteForm){
  quoteForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=quoteForm.querySelector('button[type="submit"]');
    if(!btn)return;
    const old=btn.textContent;
    btn.textContent='Sending…';
    btn.disabled=true;
    try{
      const response=await fetch('https://formsubmit.co/ajax/developesanjay71@gmail.com',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(Object.fromEntries(new FormData(quoteForm)))
      });
      const data=await response.json();
      if(!response.ok || data.success===false)throw new Error(data.message||'Submission failed');
      btn.textContent='Request Sent ✓';
      quoteForm.reset();
      setTimeout(()=>{btn.textContent=old;btn.disabled=false},2600);
    }catch(error){
      console.error('Quote form submission failed:',error);
      btn.textContent='Try Again';
      btn.disabled=false;
    }
  });
}
