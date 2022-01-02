# 노션 클로닝
- Vanilla JS로 노션 클로닝 구현을 하였습니다.
- 기본적인 레이아웃과, 스타일링, 컬러값 등 역시 노션을 최대한 클로닝하였습니다.

## DEMO
![NotionCloneProject](https://user-images.githubusercontent.com/57757719/132447668-4565d21e-98f7-4924-b037-adf3808f539f.gif)

## 👩‍💻 구현 내용

- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
- [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
- [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.
- [x] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하지만 div와 contentEditable을 조합해서 좀 더 Rich한 Markdown 에디터를 구현하였습니다.
- [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가하였습니다.
<!-- - [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다. -->
- [x] 페이지 렌더링에 대한 각각의 토글 상태 유지 기능 구현
- [x] 잘못된 URL 접근에 대한 예외 처리 구현