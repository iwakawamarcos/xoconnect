declare module 'xo-connect' {
    enum METHODS {
        available = "available",
        connect = "connect",
        personalSign = "personalSign",
        transactionSign = "transactionSign"
    }
    enum TYPES {
        request = "request",
        response = "response"
    }
    interface XoConnectClient {
        _id: string;
        alias: string;
        profileImagePath: {
            square: string;
            thumbnail: string;
        };
        chains: Array<{
            chainID: string;
            address: string;
        }>;
    }
    class XoConnect {
        private client;
        static getInstance(): XoConnect;
        isAvailable(): Promise<boolean>;
        connect(): Promise<XoConnectClient>;
        getClient(): XoConnectClient | null;
        getChains(): Array<{
            chainID: string;
            address: string;
        }> | null;
        personalSign(chainID: string, address: string, message: string): Promise<any>;
        transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any>;
        sendRequest(method: METHODS, params?: any): void;
        getResponse(method: METHODS): Promise<string>;
    }
}
