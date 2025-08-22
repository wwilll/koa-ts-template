import { consoleRed, createFile, getFilePath } from '@/src/utils/tools';
import { promises } from 'fs';

// 写ip check日志
export async function appendToIpLogFile(text: string) {
  const _text = `[${new Date().toLocaleString()}] ${text}\n`;
  try {
    const ipLogFile = getFilePath('@/logs/ip_check.log');
    await promises.appendFile(ipLogFile, _text);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // 文件不存在
      createFile('@/logs/ip_check.log', _text);
    } else {
      consoleRed('追加文件时出错:', err);
    }
  }
}
