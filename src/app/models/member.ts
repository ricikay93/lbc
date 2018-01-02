

export class MemberContact {
    id: number;
    member: number;
    contact_type: number;
    contact: string;
    lastModified: Date;
    createdAt: Date;
}

export class MemberSkill {
    id: number;
    member: number;
    skill: number;
    lastModified: Date;
    createdAt: Date;
}

export class MemberEmergencyContact {
    id: number;
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactTelephone: string;
}

/**
 * This class is the model to store basic member information
 **/
export class Member {
    id: number;
    firstName: string;
    lastName: string;
    isMale: boolean;
    maritalStatus: string;
    picture: string;
    birthday: Date;
    street: string;
    town: string;
    parish: string;
    beganMembership: Date;
    memberThrough: string;
}
