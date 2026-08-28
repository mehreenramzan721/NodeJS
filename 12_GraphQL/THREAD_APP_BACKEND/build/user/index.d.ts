export declare const User: {
    typeDefs: string;
    queries: string;
    mutations: string;
    resolvers: {
        queries: {
            getUserToken: (_: any, payload: {
                email: string;
                password: string;
            }) => Promise<any>;
            getCurrentLoggedInUser: (_: any, parameters: any, context: any) => Promise<any>;
        };
        mutations: {
            createUser: (_: any, payload: CreateUserPayload) => Promise<any>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map