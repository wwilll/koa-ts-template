import path from 'path';
import fs from 'fs';

// 将文字变红
export const wrapRed = (text: string) => `\x1B[31m${text}\x1B[0m`;
export const consoleRed = (...p) => {
  const [fText, ...rest] = p;
  console.log(wrapRed(fText), ...rest);
};
// 将文字变绿
export const wrapGreen = (text: string) => `\x1B[32m${text}\x1B[0m`;
export const consoleGreen = (...p) => {
  const [fText, ...rest] = p;
  console.log(wrapGreen(fText), ...rest);
};

export const getFilePath = (dir: string) => {
  if (dir.startsWith('@/')) {
    return path.join(__dirname, '../../', dir.slice(2));
  }
  return dir;
};

export const createFile = async (filePath: string, initContent = '') => {
  if (!filePath) return;
  const _filePath = getFilePath(filePath);
  const errInfo = await fs.promises
    .access(getFilePath(_filePath))
    .then((r) => r)
    .catch((e) => e);
  if (!errInfo) return;
  if (errInfo.code === 'ENOENT') {
    const fileDir = path.dirname(_filePath);
    const errInfo2 = await fs.promises
      .mkdir(fileDir, { recursive: true })
      .then(() => null)
      .catch((e) => e || 1);
    if (errInfo2) {
      consoleRed(`目录【${fileDir}】创建失败: `, errInfo2);
      return;
    }
    await fs.promises
      .appendFile(_filePath, initContent)
      .then(() => consoleGreen(`初始化文件【${_filePath}】成功`))
      .catch((e) => consoleRed(`初始化文件【${_filePath}】出错:`, e));
  } else {
    consoleRed(`文件【${_filePath}】无法访问:`, errInfo);
  }
};

export const readJsonFile = async (filePath: string) => {
  const configPath = getFilePath(filePath);
  try {
    const raw = await fs.promises.readFile(configPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    consoleRed(`读取【${configPath}】失败:`, err);
  }
};

export const readConfig = (() => {
  const map = new Map();
  return async <T = any>(filePath: string): Promise<T | null> => {
    if (map.has(filePath)) {
      return map.get(filePath);
    } else {
      const jsonObj = await readJsonFile(filePath)
        .then((r) => r)
        .catch((e) => e);
      if (jsonObj) map.set(filePath, jsonObj);
      return map.get(filePath) || null;
    }
  };
})();
