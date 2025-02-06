import Role from "./UserRoles";

type UserType = {
    _id: string
    name: string;
    email: string;
    password: string;
    role: Role;
    company: string;
    tokens: string[];
}

export default UserType;