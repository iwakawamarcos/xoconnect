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

class XoConnect {
    private client: {
        _id: string;
        alias: string;
        profileImagePath: { square: string; thumbnail: string };
        chains: Array<{ chainID: string; address: string }>;
    } | null = null;

    private static instance: XoConnect;

    public static getInstance(): XoConnect {
        if (!XoConnect.instance) {
            XoConnect.instance = new XoConnect();
        }
        return XoConnect.instance;
    }

    async isAvailable(): Promise<any> {
        return "hello";
    }

    async connect(): Promise<any> {
        return "hello";
    }

    getClient() {
        return "hello";
    }

    getChains() {
        return "hello";
    }

    async personalSign(chainID: string, address: string, message: string): Promise<any> {
        return "hello";
    }

    async transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any> {
        return "hello";
    }

    sendRequest(method: METHODS, params?: any) {
        return "hello";
    }

    async getResponse(method: METHODS): Promise<string> {
        return "hello";
    }
}

export default XoConnect;
