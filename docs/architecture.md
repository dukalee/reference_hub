# 아키텍처

## 랜딩 페이지 (`index.html`)

역할별로 4개 파일로 분리되어 있습니다.

- `index.html` — 구조/마크업만 담당
- `styles.css` — 랜딩 페이지 디자인
- `app.js` — 렌더링 로직 (콘텐츠만 추가할 때는 수정할 필요 없음)
- `topics.json` — 카드 그리드의 데이터 소스. 랜딩 페이지는 전적으로 이 배열을 기준으로 렌더링됨

## `topics.json` 필드

새 라이브러리 카드를 추가하려면 이 파일만 편집해서 배열에 객체 하나를 추가하면 됩니다.

| 필드 | 설명 |
|---|---|
| `id` | 고유 식별자(영문 소문자) |
| `title` | 카드에 표시될 이름 |
| `subtitle` | 영문 부제 |
| `desc` | 한두 줄 설명 |
| `file` | 연결할 레퍼런스 HTML 경로, `pages/` 하위 상대경로 (예: `"pages/pandas-reference.html"`) |
| `color` | 카드 아이콘 색상(hex) |
| `icon` | 아이콘에 표시할 1~2글자 |
| `count` | 메소드 개수. 해당 레퍼런스 페이지의 실제 `.fn[data-key]` 카드 개수와 일치시킬 것 (`grep -c 'data-key="' pages/X.html`로 확인) |

과거에 있던 `tags`(태그 필터링)와 `status`(공개됨/준비중 상태) 필드는 삭제되었습니다. 모든 카드는 항상 `file` 경로로 연결되는 클릭 가능한 링크로 렌더링되며, 검색은 title/subtitle/desc만 대조합니다.

## `pages/` 폴더

- `pages/reference.css`, `pages/reference.js` — 모든 개별 레퍼런스 페이지가 공유하는 디자인·스크립트
- `pages/*-reference.html` — 라이브러리별 레퍼런스 문서 (예: `numpy-reference.html`, `pandas-reference.html`, `matplotlib-reference.html`, `seaborn-reference.html`). 각각 직접 작성된 문서이며 `topics.json`으로부터 자동 생성되지 않습니다.

개별 레퍼런스 페이지를 작성/수정할 때 지켜야 할 구조 규칙은 [reference-pages.md](reference-pages.md) 참고.

## 로컬 실행

빌드 단계, 패키지 매니저, 서버 의존성이 전혀 없습니다. `index.html`은 `topics.json`을 `fetch()`로 불러오는데, `file://`로 직접 열면 브라우저가 이를 차단합니다. 간단한 정적 서버로 실행하세요.

```
python -m http.server
```

이후 `http://localhost:8000`에 접속합니다. (이 환경에서는 `python3` alias가 Microsoft Store 스텁으로 깨져 있을 수 있으니 `python`을 사용할 것.)
