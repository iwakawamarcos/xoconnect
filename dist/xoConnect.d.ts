export declare enum METHODS {
    available = "available",
    connect = "connect",
    personalSign = "personalSign",
    transactionSign = "transactionSign"
}
export declare enum TYPES {
    request = "request",
    response = "response"
}
declare class XoConnect {
    private client;
    private static instance;
    static getInstance(): XoConnect;
    isAvailable(): Promise<boolean>;
    connect(): Promise<any>;
    getClient(): {
        _id: string;
        alias: string;
        profileImagePath: {
            square: string;
            thumbnail: string;
        };
        chains: {
            chainID: string;
            address: string;
        }[];
    } | null;
    getChains(): {
        chainID: string;
        address: string;
    }[] | undefined;
    personalSign(chainID: string, address: string, message: string): Promise<any>;
    transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any>;
    sendRequest(method: METHODS, params?: any): void;
    getResponse(method: METHODS): Promise<string>;
}
export default XoConnect;
