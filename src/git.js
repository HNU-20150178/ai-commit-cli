// src/git.js
import { execa } from 'execa';

/**
 * 스테이징된 diff 내역을 가져옵니다.
 */
export async function getStagedDiff() {
  try {
    // git diff --cached (또는 --staged) 실행
    const { stdout } = await execa('git', ['diff', '--cached']);
    return stdout;
  } catch (error) {
    throw new Error('git diff를 읽어오는 중 오류가 발생했습니다. Git 저장소인지 확인해주세요.');
  }
}

/**
 * 현재 스테이징된 파일 목록을 가져옵니다.
 */
export async function getStagedFiles() {
  try {
    const { stdout } = await execa('git', ['diff', '--cached', '--name-only']);
    return stdout ? stdout.split('\n') : [];
  } catch (error) {
    return [];
  }
}