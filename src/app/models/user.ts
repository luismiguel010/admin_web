import { RoleDTO } from "./role-dto";

export class User {
    uuidUser: string;
    username: string;
    password: string;
    imeiDevice: string;
    name: string;
    lastName: string;
    callSing: string;
    email: string;
    job: string;
    indicative: string;
    rank: string;
    dependency: string;
    typeDevice: string;
    nameImageProfile: string;
    roleDTOS: RoleDTO[];
}
