export type User = {
    name: string;
    password: string;
    email: string;
    phone: string;
    active: boolean;
    permissions: Map<string,number>
}