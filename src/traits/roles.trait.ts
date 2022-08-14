import makeConfigurationQueries from "../helpers/make-configuration-queries";
import * as _ from "lodash";

type NDM_NETWORK_ROLE = any;
type RciQuery = any;

// Each role in the DTO 'role' property can be:
// A) a string (e.g. ndmRoles === ['inet', 'misc'])
// B) an object (ndmRoles === [{role: 'inet', ifor: 'GigabitEthernet0/Vlan7'}])
type NdmRoleType = {
  role: string;
  ifor?: string;
} | string;

export interface RolesTrait {
  roles: NDM_NETWORK_ROLE[];
}

export class RolesTrait implements RolesTrait {

  public roles: NDM_NETWORK_ROLE[] = [];
  public name: string;

  constructor(protected dto: any) {
    this.name = dto?.name || '';

    this.roles = (dto?.rc?.role || []).map((roleObj: NdmRoleType) => {
      return _.isString(roleObj) ? roleObj : roleObj.role;
    });
  }

  public getChangeRoleQuery(name: string, roles: NDM_NETWORK_ROLE[]): RciQuery[] {
    return makeConfigurationQueries(this.name, { role: roles });
  }

  public hasAnyRole(): boolean {
    return this.roles.length > 0;
  }

  public hasRole(ndmRole: NDM_NETWORK_ROLE): boolean {
    return this.roles.includes(ndmRole);
  }
}
