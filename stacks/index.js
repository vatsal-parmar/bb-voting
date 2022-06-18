import { App } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'api',
    bundle: {
      format: 'esm',
    },
  });
  app.stack(StorageStack).stack(ApiStack);
}
