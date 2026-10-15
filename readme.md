# ai-commit-cli (aic)

> Git staged 차이점(`git diff`)을 분석하여 AI 기반 Conventional Commits 메세지를 자동 생성해주는 CLI 도구

# Node.js 실행기를 사용함

# execa
 Node.js 환경에서 외부 프로세스(예: Git 명령어)를 실행하고 그 결과(stdout, stderr)를 자바스크립트 코드 내에서 사용할 수 있도록 도와주는 라이브러리
 
## 사용법
### 1. 사전 조건
- Node.js v18 이상
- Git 설치 및 레포지토리 초기화 완료

### 2. 프로젝트 설치 및 의존성 다운로드
```bash
# 패키지 설치
npm install

# 로컬 단축키 등록
npm link

# 클립보드 텍스트 복사를 위해 clipboardy 추가
npm install clipboardy
```

### 3. 사용방법

# 터미널에서 실행
```bash
aic
```
