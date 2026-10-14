(function(){
'use strict';

/* ── мобильное меню ── */
var burger=document.querySelector('.burger');
if(burger){
  burger.addEventListener('click',function(){
    var on=document.body.classList.toggle('menu-on');
    burger.setAttribute('aria-expanded',on?'true':'false');
    document.body.style.overflow=on?'hidden':'';
  });
  document.querySelectorAll('.mm a').forEach(function(a){
    a.addEventListener('click',function(){
      document.body.classList.remove('menu-on');
      document.body.style.overflow='';
    });
  });
}

/* ── выпадающее меню на ПК ── */
var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
document.querySelectorAll('.drop').forEach(function(d){
  var btn=d.querySelector('button');
  if(!btn)return;
  if(fine){
    d.addEventListener('mouseenter',function(){d.classList.add('open')});
    d.addEventListener('mouseleave',function(){d.classList.remove('open')});
  }
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    d.classList.toggle('open');
  });
});
document.addEventListener('click',function(){
  document.querySelectorAll('.drop.open').forEach(function(d){d.classList.remove('open')});
});

/* ── FAQ ── */
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.parentElement,
        ans=item.querySelector('.faq-a'),
        on=item.classList.toggle('on');
    q.setAttribute('aria-expanded',on?'true':'false');
    ans.style.maxHeight=on?(ans.scrollHeight+'px'):'0px';
  });
});
window.addEventListener('resize',function(){
  document.querySelectorAll('.faq-i.on .faq-a').forEach(function(a){
    a.style.maxHeight=a.scrollHeight+'px';
  });
});

/* ── кнопка наверх ── */
var up=document.querySelector('.up');
if(up){
  var tick=false;
  window.addEventListener('scroll',function(){
    if(tick)return; tick=true;
    requestAnimationFrame(function(){
      up.classList.toggle('on',window.scrollY>600);
      tick=false;
    });
  },{passive:true});
  up.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
}

/* ── калькулятор ── */
var calc=document.getElementById('calc');
if(calc){
  var RATE={flat:6000,house:7000,office:5500},
      MIN ={flat:180000,house:250000,office:150000},
      type='flat', area=55, depth=1;

  function money(n){
    return Math.round(n/1000)*1000;
  }
  function fmt(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₸';
  }
  function render(){
    var base=Math.max(area*RATE[type]*depth, MIN[type]*depth),
        lo=money(base*0.88), hi=money(base*1.22);
    calc.querySelector('#c-sum').textContent=fmt(lo)+' — '+fmt(hi);
    calc.querySelector('#c-area-v').textContent=area+' м²';
  }
  calc.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click',function(){
      var g=c.getAttribute('data-g');
      calc.querySelectorAll('.chip[data-g="'+g+'"]').forEach(function(x){x.classList.remove('on')});
      c.classList.add('on');
      if(g==='t')type=c.getAttribute('data-v');
      else depth=parseFloat(c.getAttribute('data-v'));
      render();
    });
  });
  var rng=calc.querySelector('#c-area');
  if(rng){
    rng.addEventListener('input',function(){area=parseInt(rng.value,10);render()});
  }
  render();
}

/* ── конверсии Google Ads ── */
function conv(url){
  if(typeof gtag==='function'&&window.ADS_SEND){
    gtag('event','conversion',{send_to:window.ADS_SEND,event_callback:function(){}});
  }
  return true;
}
document.querySelectorAll('a[href^="https://wa.me"],a[href^="tel:"]').forEach(function(a){
  a.addEventListener('click',function(){conv()});
});

})();
