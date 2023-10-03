// types/xo-connect.d.ts

declare module 'xo-connect-sdk' {
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
  
    export interface XoConnectClient {
      _id: string;
      alias: string;
      profileImagePath: { square: string; thumbnail: string };
      chains: Array<{ chainID: string; address: string }>;
    }
  
    export class XoConnect {
      private client: XoConnectClient | null;
  
      static getInstance(): XoConnect;
  
      isAvailable(): Promise<boolean>;
  
      connect(): Promise<XoConnectClient>;
  
      getClient(): XoConnectClient | null;
  
      getChains(): Array<{ chainID: string; address: string }> | null;
  
      personalSign(chainID: string, address: string, message: string): Promise<any>;
  
      transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any>;
    }
  }
  