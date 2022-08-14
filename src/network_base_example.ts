import { Mixin } from "ts-mixer";
import { QueriesTrait } from './traits/queries.trait';
import { NamesTrait } from './traits/names.trait';
import { IgmpTrait } from "./traits/igmp.trait";
import { RolesTrait } from "./traits/roles.trait";


export interface NetworkBaseEntity extends QueriesTrait, NamesTrait, IgmpTrait, RolesTrait {
  type: string;
  name: string;
  rename: string;
  description: string;
}

const NetworkBaseEntityMixin = Mixin(
  QueriesTrait,
  NamesTrait,
  IgmpTrait,
  RolesTrait,
);

export class NetworkBaseEntity extends NetworkBaseEntityMixin implements NetworkBaseEntity {
  public type: string;
  public name: string;
  public rename: string;
  public description: string;
  public up: boolean;
  public schedule: string;

  public status: {
    link: boolean;
    up: boolean;
    connected: boolean;
  }

  constructor(public dto: any) {
    super(dto);
    this.name = dto?.name || '';
    this.type = dto?.type || '';
    this.rename = String(dto?.rc?.rename || '');
    this.description = dto?.description || '';
    this.up = dto?.up || false;
    this.schedule = dto?.schedule || '';

    this.status = {
      link: dto?.show?.link !== 'down',
      up: dto?.show?.state === 'up',
      connected: dto?.show?.connected !== 'no',
    }
  }
}

const base = new NetworkBaseEntity({
  name: 'name_1',
  type: 'type_1',
  show: {
    link: 'up',
    state: 'up',
    connected: 'no',
  },
  schedule: 'schedule_1'
});

console.log(base);
