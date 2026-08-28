import { CreateUserPayload } from "../../services/user";
export declare const resolvers: {
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
//# sourceMappingURL=resolvers.d.ts.map