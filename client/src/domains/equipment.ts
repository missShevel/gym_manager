export interface Equipment {
    id: string;
    name: string;
    count: number;
    link: string;
    // avatar: File | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateEquipmentData {
    name: string;
    count: number;
    details: string;
}
