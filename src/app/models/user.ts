export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: any;
    accessToken?: string;
    tokenType?: string;
}