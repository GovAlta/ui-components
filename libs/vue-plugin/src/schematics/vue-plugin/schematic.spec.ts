import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { VuePluginSchematicSchema } from './schema';

describe('vue-plugin schematic', () => {
  let appTree: Tree;
  const options: VuePluginSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@abgov/vue-plugin',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('vue-plugin', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
