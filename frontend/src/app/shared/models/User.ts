import { Oglas } from "./Oglas";

export class User{
    id!: number;
    ime!: string;
    prezime!: string;
    username!: string;
    email!: string;
    telefon!: string;
    datumRegistracije!: Date;
    oglasi!: Oglas[];
    slika!: string;
}