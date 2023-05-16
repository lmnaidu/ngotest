export class Users {
    constructor(
        public _id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public status: string,
        public password: string
    ) {}
}