export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
declare class UserService {
    private static generateHash;
    static getUserById(id: string): any;
    static createUser(payload: CreateUserPayload): any;
    private static getUserByEmail;
    static getUserToken(payload: GetUserTokenPayload): Promise<any>;
    static decodeJWTToken(token: string): any;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map