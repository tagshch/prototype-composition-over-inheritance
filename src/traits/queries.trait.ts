import makeConfigurationQueries from "../helpers/make-configuration-queries";
type RciQuery = any;

const NO_COMMAND = { no: true };

export interface QueriesTrait {

  name: string;

  makeInsertionQueries(
    entityName: string,
  ): RciQuery[];

  makeDeletionQueries(
    entityName: string,
  ): RciQuery[];
}


export class QueriesTrait implements QueriesTrait {

  public name: string;

  constructor(props: any) {
    this.name = props?.name || '';
  }

  public makeInsertionQueries(entityName: string) {
    return makeConfigurationQueries(entityName, { no: false });
  }

  public makeDeletionQueries(entityName: string) {
    return makeConfigurationQueries(entityName, NO_COMMAND);
  }
}
