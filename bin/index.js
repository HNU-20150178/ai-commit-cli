#!/usr/bin/env node
import { program } from 'commander';
import { getStagedDiff, getStagedFiles } from '../src/git.js';

program
  .name('aic')
  .description('AI 기반 커밋 메세지 자동 생성기')
  .version('1.0.0');

program
  .action(async () => {
    try {
      const files = await getStagedFiles();

      if (files.length === 0) {
        console.log('스테이징된 파일이 없습니다. `git add -A` 후 다시 실행해주세요.');
        return;
      }

      console.log(`스테이징된 파일 (${files.length}개):`);
      files.forEach(f => console.log(`   - ${f}`));

      const diff = await getStagedDiff();
      console.log('\ngit diff 요약:');
      console.log(diff.substring(0, 300) + (diff.length > 300 ? '\n...' : ''));

    } catch (error) {
      console.error('오류:', error.message);
    }
  });

program.parse(process.argv);