import path from 'path';
import moduleAlias from 'module-alias';
if (process.env.NODE_ENV !== 'development') {
  moduleAlias.addAliases({ '@': path.resolve(__dirname) });
  moduleAlias();
}
import '@/src/app';
