import { Parish } from './lookUp';

export interface Circuit {
    id: number;
    circuit: string;
    parishCode: number;
    createdAt: Date;
    updatedAt: Date;
}



export class ChurchWorshipTime {
    id: number;
    time: string;
    church: number;
}

export class ChurchContact {
    id: number;
    church: number;
    contact_type: number;
    contact: string;
    lastModified: Date;
    createdAt: Date;
}

export class ChurchMissions {
    id: number;
    church: number;
    mission: string;
    lastModified: Date;
    createdAt: Date;
}

export class Church {
    id: number;
    church: string;
    seat_quota: number;
    street: string;
    town: string;
    parish: string;
    dateConst: Date;
    circuit: number;
    contacts: ChurchContact[];
    missions: ChurchMissions[];
    worship_times: ChurchWorshipTime[];
    lastModified: Date;
    createdAt: Date;
}

