import { createFile } from '@/src/utils/tools';

// 初始化配置文件
createFile('@/config/checkip.json', JSON.stringify({ allowKey: ['default'] }, null, 2));

createFile('@/logs/ip_check.log');
