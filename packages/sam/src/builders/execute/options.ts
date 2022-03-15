import { JsonObject } from '@angular-devkit/core';
import { ImportStackOutputs } from '@neo-solution/nx-aws-core';
import { IParameterOverrides } from '../cloudformation/deploy/IParameterOverrides';

export interface SamExecuteBuilderOptions extends JsonObject {
    args: string[];
    waitUntilTargets: string[];
    buildTarget: string;
    packageTarget: string;
    host: string;
    port: number;
    mimicEnv: string;
    importStackOutputs: (ImportStackOutputs & JsonObject) | null;
    parameterOverrides: IParameterOverrides | null;
}
