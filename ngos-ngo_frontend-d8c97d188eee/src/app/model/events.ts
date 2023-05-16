export class Events {
    constructor(
        public _id: string,
        public note: string,
        public projectId: string,
        public image: string,
        public desc: string,
        public location: string,
        public date: Date,
        public memberId:string
    ) {}
}