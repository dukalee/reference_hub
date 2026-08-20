# HTML 작성 규칙

`pages/*-reference.html`과 `index.html`을 작성/수정할 때 지켜야 하는 마크업 레벨 규칙입니다. 콘텐츠 구성(섹션 종류, `.fn` 카드 구조 등)은 [reference-pages.md](reference-pages.md)를 참고하고, 이 문서는 그 아래 단계인 "HTML 문법·마크업" 규칙만 다룹니다.

## `<head>` 뼈대

모든 레퍼런스 페이지는 동일한 순서를 따릅니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{라이브러리} 실무 레퍼런스 — 메소드 A to Z</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="reference.css">
</head>
```

- `lang="ko"`는 항상 명시합니다.
- `<title>`은 `"{라이브러리} 실무 레퍼런스 — 메소드 A to Z"` 패턴을 그대로 따릅니다.
- Google Fonts 링크(IBM Plex Sans KR + JetBrains Mono) 순서와 URL을 그대로 복사합니다 — 새 폰트를 추가하지 않습니다.
- 페이지 전용 `<style>`을 쓸 경우 반드시 `reference.css` 링크 **다음**에 둡니다 (캐스케이드 순서상 오버라이드가 성립하도록).

## 속성·포맷 스타일

- 속성 값은 항상 큰따옴표(`"`)를 사용합니다. 작은따옴표를 쓰지 않습니다.
- `<meta>`, `<link>` 같은 void 요소는 `/>`로 닫지 않습니다(`<meta charset="utf-8">`, `<br>` 등 HTML5 스타일).
- 들여쓰기는 공백 2칸을 기준으로 하되, `.fn` 카드처럼 한 줄에 여러 인라인 요소를 몰아 쓰는 기존 스타일(예: SVG 한 줄, `.fn-h` 한 줄)을 어기지 않습니다 — 항상 "여러 줄로 예쁘게" 바꾸지 말고 기존 파일의 줄바꿈 밀도를 그대로 따라갑니다.

## 코드 블록(`<pre>`) 이스케이프 · 문법 강조

- `<pre>` 안의 코드에서 `<`, `>`, `&`는 반드시 `&lt;`, `&gt;`, `&amp;`로 이스케이프합니다. 예: `print(f"<class '{x}'>")`의 출력 결과를 `.out`에 옮길 때 `&lt;class '...'&gt;` 형태로 씁니다.
- 문법 강조는 아래 인라인 `<span>` 클래스만 사용합니다(전부 `reference.css`에 정의됨):
  - `.c` — 주석 (`# ...`)
  - `.k` — 키워드 (`import`, `as`, `for`, `if` 등)
  - `.s` — 문자열 리터럴
  - `.n` — 숫자 리터럴
  - `.o` — 연산자 (정의는 되어 있으나 기존 페이지에서 실제로 쓴 적은 없음 — 필요하면 사용 가능)
  - 새 색상이나 새 클래스를 코드 강조용으로 만들지 않습니다.
- **주의**: 현재 numpy/pandas/seaborn 페이지는 `.c`(주석)와 `.k`(키워드) 위주로만 강조하고 `.s`/`.n`은 거의 안 쓰는 반면, matplotlib 페이지는 문자열·숫자까지 꼼꼼히 강조했습니다. 페이지마다 강조 밀도가 다른 건 기존의 알려진 불일치이며, **새로 작성하는 코드 블록은 matplotlib 수준(주석·키워드·문자열·숫자 모두 강조)을 기준으로 맞추는 것을 권장**합니다.
- 예시 코드는 실제로 동작하는 정확한 Python 코드여야 하고, `.out` 블록의 출력값은 실제 실행 결과와 일치해야 합니다 — 추측으로 채우지 않습니다.

## id / 앵커 규칙

- 섹션 `id`는 목차와 1:1로 대응합니다: `#rank`, `#core`, 그리고 알파벳 섹션 `#a`~`#z`. (`#method`는 만들지 않음 — [reference-pages.md](reference-pages.md) 참고.)
- `nav.toc a`의 `href="#xxx"`는 반드시 실제 존재하는 `section id="xxx"`를 가리켜야 합니다. 섹션을 지울 때는 목차 항목도 같이 지웁니다.
- **SVG `<marker id="ah">` 같은 정의는 한 페이지 안에서 여러 번 반복되고 있는데, 이는 HTML 표준상 잘못된 패턴(동일 id 중복)입니다.** 브라우저가 관대하게 처리해 시각적으로는 문제없이 렌더링되지만, 새로 작성하는 SVG에서는 이 관행을 그대로 답습하지 말고 `<defs>`를 `<svg>`가 처음 나온 이후 재사용하거나(별도 `<defs>` 없이 이미 정의된 `#ah`를 참조), 정 필요하면 `id="ah-<섹션>-<번호>"`처럼 고유화하세요.

## 접근성

- `nav.toc`, 검색 `<input>`에는 `aria-label`을 넣습니다 (`aria-label="목차"`, `aria-label="함수 검색"`).
- 검색 결과 카운터(`#qn`)에는 `aria-live="polite"`를 넣어 스크린 리더가 변경을 읽도록 합니다.
- 장식용 SVG 도식에는 `role="img"`를 넣습니다.
- **`<img>` 태그(실제 캡처 이미지, 예: seaborn 페이지의 base64 PNG)에는 반드시 의미 있는 `alt` 텍스트를 넣습니다.** 현재 seaborn 페이지는 `alt` 속성이 비어 있는 상태로, 새로 이미지를 추가할 때는 이 실수를 반복하지 마세요 — `alt="{함수명} 실행 결과 그래프"`처럼 무엇을 보여주는 그래프인지 적습니다.

## 이미지 vs SVG 도식

- 개념을 설명하는 도식(구조, 흐름, 비교)은 **인라인 SVG**로 그립니다(numpy/pandas/matplotlib의 관례) — 벡터라 가볍고 테마 색상을 그대로 상속합니다.
- 실제 라이브러리 실행 결과물(예: seaborn의 렌더링된 그래프)처럼 SVG로 재현하기 비합리적인 경우에만 **base64 PNG**를 `<img>`로 임베드합니다. 이 경우 실행 시점에 직접 렌더링해서 캡처한 이미지여야 하며, 파일 크기가 커지는 것을 감수하되 불필요하게 큰 해상도로 캡처하지 않도록 주의합니다.
- 둘 중 어느 쪽이든 페이지 전체에서 방식을 섞어 쓰지 말고(한 라이브러리 문서 안에서는 SVG 아니면 이미지로 통일), 어떤 방식을 쓸지는 콘텐츠 특성에 따라 새 페이지 작성 시작 시점에 정합니다.

## 검증 체크리스트

새 HTML 파일을 작성/수정한 뒤에는 다음을 확인합니다.

- `<svg>`와 `</svg>` 개수가 같은지 (`grep -o "<svg" file | wc -l` vs `</svg>`)
- `<div class="fn"` 카드마다 `data-key` 속성이 있는지(검색 대상이 되려면 필수)
- 로컬 서버로 실제 열어서 200 응답과 레이아웃 깨짐 여부 확인 (`python -m http.server` 후 `curl`)
- `topics.json`에 등록했다면 `count`가 실제 `.fn[data-key]` 개수와 일치하는지
