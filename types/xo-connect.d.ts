declare module 'xo-connect' {
  export enum METHODS {
    available = "available",
    connect = "connect",
    personalSign = "personalSign",
    transactionSign = "transactionSign",
  }

  export enum TYPES {
    request = "request",
    response = "response",
  }

  export class XoConnect {
    static getInstance(): XoConnectService;
    async isAvailable(): Promise<boolean>;
    async connect(): Promise<any>;
    getClient(): any;
    getChains(): any[];
    async personalSign(chainID: string, address: string, message: string): Promise<any>;
    async transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any>;
  }
}
