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

    async isAvailable(): Promise<boolean> {
        this.sendRequest(METHODS.available);
        const resp: any = await this.getResponse(METHODS.available);
        return resp?.data?.active;
    }

    async connect(): Promise<any> {
        this.sendRequest(METHODS.connect);
        const resp: any = await this.getResponse(METHODS.connect);
        this.client = resp?.data;
        return resp?.data;
    }

    getClient() {
        return this.client;
    }

    getChains() {
        return this.client?.chains;
    }

    async personalSign(chainID: string, address: string, message: string): Promise<any> {
        const params = { chainID, address, message };
        this.sendRequest(METHODS.personalSign, params);
        const resp: any = await this.getResponse(METHODS.personalSign);
        return resp?.data;
    }

    async transactionSign(chainID: string, from: string, to: string, value: string, data: string): Promise<any> {
        const params = { chainID, from, to, value, data };
        this.sendRequest(METHODS.transactionSign, params);
        const resp: any = await this.getResponse(METHODS.transactionSign);
        return resp?.data;
    }

    sendRequest(method: METHODS, params?: any) {
        window.postMessage(
            JSON.stringify({
                type: TYPES.request,
                method: method,
                params,
            })
        );
    }

    async getResponse(method: METHODS): Promise<string> {
        return new Promise((resolve) => {
            const messageHandler = (event: MessageEvent) => {
                if (event.data?.length) {
                    const data = JSON.parse(event.data);
                    if (data.type === TYPES.response && data.method === method) {
                        window.removeEventListener("message", messageHandler);
                        resolve(data);
                    }
                }
            };

            window.addEventListener("message", messageHandler, false);
        });
    }
}


