# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내 문서입니다.

## 이 프로젝트는

빌드 과정이나 의존성 없이 동작하는 정적 한국어 "레퍼런스 허브" 웹사이트입니다. 랜딩 페이지(`index.html`)가 라이브러리/SDK 레퍼런스 문서를 카드 형태로 나열하고, 각 카드는 `pages/` 폴더 안의 레퍼런스 페이지로 연결됩니다.

## 로컬 실행

```
python -m http.server
```

`http://localhost:8000` 접속. (`index.html`이 `topics.json`을 `fetch()`로 불러오므로 `file://`로 직접 열면 동작하지 않습니다.)

## 더 읽을 문서

- [docs/architecture.md](docs/architecture.md) — 전체 파일 구조, `topics.json` 필드 설명
- [docs/reference-pages.md](docs/reference-pages.md) — `pages/*-reference.html` 작성·리팩토링 규칙 (공유 CSS/JS, 히어로/섹션 구성, `.fn` 카드 구조)
- [docs/html-rules.md](docs/html-rules.md) — HTML 마크업 레벨 규칙 (head 뼈대, 코드 블록 이스케이프·문법 강조, id/접근성, 이미지 vs SVG)

## 언어

UI 문구, 문서, HTML 내 주석 등 사용자에게 노출되는 모든 콘텐츠는 한국어로 작성합니다.
