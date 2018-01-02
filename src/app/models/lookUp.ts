
export interface Parish {
   code: string;
   parish: string;
}

export class ContactType {
    id: number;
    contactFilter: string;
    contactType: string;
}

export class Profession {
    id: number;
    profession: string;
}

export class Skill {
    id: number;
    skill: string;
}

export class Month {
    id: number;
    monthLongForm: string;
    monthShortForm: string;
}
