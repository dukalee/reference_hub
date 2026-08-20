(function(){
  var q = document.getElementById('q');
  var qn = document.getElementById('qn');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.fn[data-key]'));
  var secs = Array.prototype.slice.call(document.querySelectorAll('main section'));

  function norm(s){ return s.toLowerCase().replace(/\s+/g,''); }

  function filter(){
    var v = norm(q.value);
    if(!v){
      cards.forEach(function(c){ c.classList.remove('hide'); });
      secs.forEach(function(s){ s.classList.remove('hide'); });
      qn.textContent = '';
      return;
    }
    var hits = 0;
    cards.forEach(function(c){
      var hay = norm(c.getAttribute('data-key') + ' ' + c.textContent.slice(0, 400));
      var ok = hay.indexOf(v) !== -1;
      c.classList.toggle('hide', !ok);
      if(ok) hits++;
    });
    secs.forEach(function(s){
      var any = s.querySelector('.fn[data-key]:not(.hide)');
      s.classList.toggle('hide', !any);
    });
    qn.textContent = hits + '개';
  }
  q.addEventListener('input', filter);
  q.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ q.value=''; filter(); } });

  // 목차 현재 위치 표시
  var links = Array.prototype.slice.call(document.querySelectorAll('nav.toc a'));
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('href').slice(1)] = a; });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        var a = map[en.target.id];
        if(!a) return;
        if(en.isIntersecting){
          links.forEach(function(l){ l.classList.remove('on'); });
          a.classList.add('on');
        }
      });
    }, {rootMargin: '-70px 0px -70% 0px'});
    document.querySelectorAll('section[id]').forEach(function(s){ io.observe(s); });
  }
})();
