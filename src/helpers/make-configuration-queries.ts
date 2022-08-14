/**
 * Generate NDM-query to modify current entity.
 * Command generator is based on `this.name` and `INTERFACE_COMMAND`
 * ----
 * Example (when name=Bridge0 and NDM_PATH=interface):
 * this.makeConfigurationQueries({description: 'lorem ipsum'})
 * // will output --> [{interface: {description: 'lorem ipsum', name: Bridge0}}]
 * ----
 * For syntax sugar this method is polymorphic:
 * argument:  this.makeConfigurationQueries('description', 'lorem ipsum')
 * equals to: this.makeConfigurationQueries({description: 'lorem ipsum'})
 */

import * as _ from 'lodash';
type RciQuery = any;


const INTERFACE_COMMAND = 'interface';


export default function makeConfigurationQueries(
  name: string,
  dataOrPath: string | object | object[] | boolean, // check types
  dataIfPathOrNothing: boolean | null = null,
): RciQuery[] {
  const data = _.isString(dataOrPath) ? _.set({}, dataOrPath, dataIfPathOrNothing) : dataOrPath;
  const dataArray = _.isArray(data) ? data : [data];

  const queries = dataArray.map((dataObject) => {
    return {
      path: INTERFACE_COMMAND,
      data: {...dataObject, name},
    };
  });

  return queries as RciQuery[];
}
