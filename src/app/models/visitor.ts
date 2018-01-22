export class Visitor {

    constructor(title: string, fullName: string, church: number, dateAttended: Date) {
        this.title = title;
        this.fullName = fullName;
        this.church = church;
        this.dateAttended = dateAttended;
    }

    get title(): string {
        return this._title;
    }

    set title(newTitle: string) {
        this._title = newTitle;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }

    get telephone(): string {
        return this._telephone;
    }

    set telephone(newTele: string) {
        this._telephone = newTele;
    }

    get church(): number {
        return this._church;
    }

    set church(newChurch: number) {
        this._church = newChurch;
    }

    set guestOf(newInvitee: string) {
        this._guestOf = newInvitee;
    }

    get guestOf() {
        return this._guestOf;
    }

    set id(newId: number) {
        this._id = newId;
    }

    get id() {
        return this._id;
    }

    set ageGroup(newAge: string) {
        this._ageGroup = newAge;
    }

    get ageGroup() {
        return this._ageGroup;
    }

    set address(add: string) {
        this._address = add;
    }

    get address() {
        return this._address;
    }

    get dateAttended() {
        return this._dateAttended;
    }

    set dateAttended(date: Date) {
        this._dateAttended = date;
    }

    get lastModified() {
        return this._lastModified;
    }

    set lastModified(update: Date) {
        this._lastModified = update;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(create: Date) {
        this._createdAt = create;
    }

    get email(){
        return this._email;
    }

    set email(e: string){
        this._email = e;
    }


    private _id: number;
    private _title: string;
    private _fullName: string;
    private _address: string;
    private _telephone: string;
    private _email: string;
    private _guestOf: string;
    private _church: number;
    private _reasonVisiting: string;
    private _ageGroup: string;
    private _dateAttended: Date;
    private _lastModified: Date;
    private _createdAt: Date;
}




// formErrors = {
//     personTitle: '',
//     fullName: '',
//     // church: '',
//     dateAttended: ''
//   };
