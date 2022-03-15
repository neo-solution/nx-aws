import { chain, noop, Rule } from '@angular-devkit/schematics';
import {
    addDepsToPackageJson,
    addPackageWithInit,
    formatFiles,
    setDefaultCollection,
    updateJsonInTree,
} from '@nrwl/workspace';
import { Schema } from './schema';

export const updateDependencies = addDepsToPackageJson(
    {},
    {
        '@neo-solution/nx-aws-sam': '*',
    }
);

function moveDependency(): Rule {
    return updateJsonInTree('package.json', (json) => {
        json.dependencies = json.dependencies || {};
        delete json.dependencies['@neo-solution/nx-aws-sam'];
        return json;
    });
}

export default function (schema: Schema): Rule {
    return chain([
        setDefaultCollection('@neo-solution/nx-aws-sam'),
        addPackageWithInit('@nrwl/node', schema),
        schema.unitTestRunner === 'jest'
            ? addPackageWithInit('@nrwl/jest')
            : noop(),
        updateDependencies,
        moveDependency(),
        formatFiles(schema),
    ]);
}
