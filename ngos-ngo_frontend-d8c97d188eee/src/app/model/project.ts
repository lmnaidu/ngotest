export class News {
    constructor(
        public _id: string,
        public project_name: string,
        public description: string,
        public goal: string,
        public startDate:Date,
        public endDate:Date

    ) {}
}