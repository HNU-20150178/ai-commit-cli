// src/ai.js
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌  GEMINI_API_KEY가 .env 파일에 설정되어 있지 않습니다.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `
You are an expert developer assistant specialized in writing Git commit messages.
Analyze the provided git diff and generate a clear, concise Git commit message following the Conventional Commits specification.

### Rules:
1. Format: <type>(<optional scope>): <subject>
2. Allowed types:
   - feat: A new feature
   - fix: A bug fix
   - docs: Documentation only changes
   - style: Changes that do not affect the meaning of the code (white-space, formatting, etc)
   - refactor: A code change that neither fixes a bug nor adds a feature
   - perf: A code change that improves performance
   - test: Adding missing tests or correcting existing tests
   - chore: Changes to the build process or auxiliary tools and libraries
3. The subject line must be written in English or Korean (prefer concise Korean if diff suggests Korean dev context, otherwise English).
4. Keep the title under 70 characters.
5. Output ONLY the raw commit message (no code block formatting, no markdown, no explanation).
`;

/**
 * git diff 내역을 기반으로 커밋 메시지를 생성합니다.
 * @param {string} diff 
 * @returns {Promise<string>}
 */
export async function generateCommitMessage(diff) {
  try {
    // diff 내용 3000자로 제한
    const truncatedDiff = diff.length > 3000 ? diff.substring(0, 3000) + '\n... (truncated)' : diff;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nHere is the git diff:\n${truncatedDiff}` }] }
      ],
    });

    const commitMessage = response.text ? response.text.trim() : '';
    return commitMessage;
  } catch (error) {
    throw new Error(`AI 커밋 메시지 생성 실패: ${error.message}`);
  }
}