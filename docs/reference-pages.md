# 레퍼런스 페이지 작성 규칙

`pages/*-reference.html` 각 파일에 공통으로 적용되는 구조 규칙입니다. 새 레퍼런스 페이지를 만들 때는 기존 문서(`pages/numpy-reference.html`이 표준 예시) 구조를 그대로 복제해서 내용만 바꾸는 것이 가장 빠릅니다.

## 공유 CSS/JS

각 HTML 파일은 자체 `<style>`/`<script>`를 인라인으로 담지 않고 공유 파일을 참조합니다.

```html
<link rel="stylesheet" href="reference.css">
...
<script src="reference.js"></script>
```

페이지마다 다른 스타일이 필요하면(예: pandas의 `.out{white-space:pre}` 폭 조정, matplotlib의 plot 전용 SVG 클래스) `reference.css` 링크 뒤에 짧은 페이지 전용 `<style>` 블록을 추가해 오버라이드하세요. 반대로 **여러 페이지에 공통으로 필요한 스타일**(예: `.tag.new`, `.tag.perf` 같은 태그 색상)은 개별 페이지가 아니라 `reference.css`로 승격하는 것이 원칙입니다. 새 라이브러리의 색상 테마를 위해 `:root` 변수를 페이지마다 재정의하지 않습니다 — 모든 페이지는 동일한 색상 테마(`reference.css`의 `--blue`/`--cyan`/`--violet`/`--amber`/`--rose` 등)를 공유합니다.

## 내비게이션 바 (`.bar > .bar-in`)

다음 순서로 구성합니다.

1. `<a class="home" href="../index.html">← 홈</a>` — 랜딩 페이지로 돌아가는 링크
2. `<div class="brand">라이브러리명<span>[짧은 기호]</span>Reference</div>`
3. `<input id="q" type="search" placeholder="...">` — 검색창
4. `<div id="qn" aria-live="polite"></div>` — 검색 결과 개수

## 히어로 (`header.hero`)

제목만 남깁니다.

```html
<header class="hero">
  <h1>NumPy 메소드 사전</h1>
</header>
```

`.eyebrow` 문구, `<h1>` 안의 "~부터 ~까지" 부제, `<p class="lede">` 설명, `.meta`의 동그란 chip 버튼들은 모두 의도적으로 제거된 상태이며 다시 추가하지 않습니다.

## 섹션 구성

- **"어떤 기준으로 골랐나" (`#method`) 섹션은 만들지 않습니다.** 예전에는 선정 기준을 설명하는 섹션이 있었지만 모든 페이지에서 삭제되었습니다.
- **"사용 빈도 랭킹 Top 25" (`#rank`) 섹션은 필수입니다.** 아직 없는 페이지를 리팩토링/신규 작성할 때는 반드시 추가하세요. 다른 페이지의 막대 그래프 SVG 패턴(`.viz.wide` 안에 `<text class="rl">`+`<rect class="bar b1|b2|b3">`+`<text class="rn">` 반복, viewBox `0 0 700 <height>`, 라벨 x=150 우측 정렬, 막대 x=162~, 행 높이 26px, 막대 높이 19px)을 그대로 재사용하세요. 점수 80 이상은 `b1`, 55~79는 `b2`, 그 미만은 `b3` 클래스를 씁니다.
- **`#core` 섹션** — "먼저 알아야 할 N가지"로 핵심 개념 몇 가지를 `.fn` 카드로 설명 (이 카드들에는 `data-key`/`.rank` 배지를 붙이지 않습니다).
- **알파벳 섹션 `#a`~`#z`(또는 그 이하)** — 주제별로 묶은 본문. 각 섹션은 `nav.toc`에 대응 링크가 있어야 하며, `.sec-h`에 아이콘(`.key`)과 제목을 넣습니다.
- **`#z` 전체 색인** — 마지막에 전체 항목을 훑을 수 있는 목록/표.

## `.fn` 카드 구조

```html
<div class="fn" data-key="검색용 키워드들">
  <div class="fn-h">
    <span class="rank">#01</span>          <!-- Top 25 랭킹에 든 항목만 -->
    <h3>함수/메소드 이름</h3>
    <span class="tag view">...</span>       <!-- 필요한 만큼: view/copy/uf/new/perf -->
  </div>
  <p>한두 문장 설명</p>
  <h4>시그니처</h4>
  <div class="sig">...</div>
  <div class="tbl-wrap"><table>...</table></div>  <!-- 파라미터 표, 필요시 -->
  <h4>예시 코드</h4>
  <pre class="has-out">...</pre>
  <div class="out">실제 실행 결과 (반드시 정확할 것)</div>
  <div class="viz">...</div>              <!-- SVG 도식, 필요시 -->
  <div class="note">...</div>             <!-- note/warn/tip 콜아웃, 필요시 -->
</div>
```

`.viz svg` 도식은 `.c`/`.c-hl`/`.c-acc`/`.c-acc2`/`.c-warn`/`.c-ghost`/`.ct`/`.gt`/`.gd`/`.al`/`.ar` 등 `reference.css`에 정의된 공용 클래스로 구성합니다(전체 목록은 해당 파일 참고).

콘텐츠는 알파벳순·전수 API 커버리지가 아니라 실무 사용 빈도(`.rank` 배지) 기준으로 구성합니다. 예시 코드의 출력값(`.out`)은 실제로 맞는지 검증하고 옮깁니다.

## 새 페이지를 만들 때 마지막 단계

`topics.json`에 항목을 추가하세요. `count`는 실제 `.fn[data-key]` 카드 개수와 일치시킵니다.
