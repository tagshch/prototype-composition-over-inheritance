import * as _ from "lodash";
import makeConfigurationQueries from "../helpers/make-configuration-queries";

const IGMP_DOWNSTREAM = 'igmp.downstream';
const IGMP_UPSTREAM = 'igmp.upstream';
type RciQuery = any;


export interface IgmpTrait {
  name: string;
  isUpstream: boolean;
  isDownstream: boolean;

  getValueChangingQuery(model: Partial<{
    isUpstream: boolean;
    isDownstream: boolean;
  }>): RciQuery[];

  makeDownstream(turnOnOff: boolean): RciQuery[];
  makeUpstream(turnOnOff: boolean): RciQuery[];
}

export class IgmpTrait implements IgmpTrait {

  public name: string;
  public isUpstream: boolean;
  public isDownstream: boolean;

  constructor(public dto: any) {
    this.name = _.get(dto, `name`, '');
    this.isUpstream = _.has(dto, `rc.${IGMP_UPSTREAM}`);
    this.isDownstream = _.get(dto, `rc.${IGMP_DOWNSTREAM}`, []).some((item: any) => item.enabled);
  }

  public getChangeIgmpQuery(model: any) {
    return [
      ...this.makeUpstream(model.isUpstream),
      ...this.makeDownstream(model.isDownstream),
    ];
  }

  public makeDownstream(turnOnOff: boolean): RciQuery[] {
    return makeConfigurationQueries(this.name, IGMP_DOWNSTREAM, turnOnOff);
  }

  public makeUpstream(turnOnOff: boolean): RciQuery[] {
    return makeConfigurationQueries(this.name, IGMP_UPSTREAM, turnOnOff);
  }

}
