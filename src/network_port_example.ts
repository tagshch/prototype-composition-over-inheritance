import { Mixin } from 'ts-mixer';

class IpTrait {
  readonly ip: string;
  readonly dto: any;

  constructor(props: any) {
    this.ip = props.ip;
    this.dto = props;
  }

  public getIp() {
    return this.ip;
  }

  public getDtoFromIpTrait() {
    return this.dto;
  };
}

class PortTrait {
  readonly port: string;

  constructor(props: any) {
    this.port = props.port;
  }

  public getPort() {
    return this.port;
  }
}

interface NetworkPort extends IpTrait, PortTrait { }

const NetworkPortMixin = Mixin(
  IpTrait,
  PortTrait
);

class NetworkPort extends NetworkPortMixin implements NetworkPort {

  readonly dto: any;

  constructor(dto: any) {
    super(dto);
    this.dto = dto;
  }

  public getDTO() {
    return this.dto;
  }
}

const port = new NetworkPort({
  ip: '123.123.123.1',
  port: '8080'
});

console.log(
  port.getIp(),
  port.getDTO(),
  port.getPort(),
  port.getDtoFromIpTrait()
);
