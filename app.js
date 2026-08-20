/* =========================================================================
   app.js — 카드 렌더링 로직 (수정 불필요)
   카드 데이터는 topics.json에서 fetch로 불러옵니다.
   새 주제를 추가하려면 이 파일이 아니라 topics.json만 편집하세요.
   ========================================================================= */
(function () {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const q = document.getElementById('q');
  const qn = document.getElementById('qn');
  const loaderr = document.getElementById('loaderr');

  let TOPICS = [];

  function cardHTML(t) {
    const inner = `
      <div class="card-top">
        <div class="ico">${escapeHTML(t.icon || t.title.slice(0, 2))}</div>
        <h3>${escapeHTML(t.title)}<span class="en">${escapeHTML(t.subtitle || '')}</span></h3>
      </div>
      <p>${escapeHTML(t.desc || '')}</p>
      <div class="card-foot">
        <span class="cnt">${t.count ? `메소드 <b>${t.count}</b>개` : '&nbsp;'}</span>
      </div>
      <span class="arrow" style="position:absolute;right:16px;bottom:16px;display:none">→</span>
    `;
    const style = t.color ? ` style="--ccol:${t.color}"` : '';
    const hay = escapeHTML((t.title + ' ' + t.subtitle + ' ' + t.desc).toLowerCase());
    return `<a class="card linkable" data-id="${t.id}" data-hay="${hay}" href="${escapeAttr(t.file)}"${style}>${inner}</a>`;
  }

  function render() {
    const query = q.value.trim().toLowerCase();
    let html = TOPICS.map(cardHTML).join('');
    grid.innerHTML = html;

    const items = Array.prototype.slice.call(grid.querySelectorAll('.card[data-id]'));
    let visible = 0;
    items.forEach(el => {
      const hay = el.getAttribute('data-hay') || '';
      const ok = !query || hay.indexOf(query) !== -1;
      el.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });

    qn.textContent = query ? (visible + '개') : '';
    empty.classList.toggle('show', visible === 0);
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) { return escapeHTML(s); }

  function showLoadError() {
    if (loaderr) loaderr.classList.add('show');
  }

  fetch('topics.json')
    .then(res => {
      if (!res.ok) throw new Error('topics.json 응답 오류: ' + res.status);
      return res.json();
    })
    .then(data => {
      TOPICS = Array.isArray(data) ? data : [];
      render();
    })
    .catch(() => {
      TOPICS = [];
      render();
      showLoadError();
    });

  q.addEventListener('input', render);
  q.addEventListener('keydown', e => { if (e.key === 'Escape') { q.value = ''; render(); } });
})();
