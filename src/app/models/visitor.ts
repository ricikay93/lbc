export class Visitor {

    constructor(title: string, fullName: string, church: number, dateAttended: Date) {
        this.title = title;
        this.fullName = fullName;
        this.church = church;
        this.dateAttended = dateAttended;
    }

    // get title(): string {
    //     return this.title;
    // }

    // set title(newTitle: string) {
    //     this.title = newTitle;
    // }

    // get fullName(): string {
    //     return this.fullName;
    // }

    // set fullName(newName: string) {
    //     this.fullName = newName;
    // }

    // get telephone(): string {
    //     return this.telephone;
    // }

    // set telephone(newTele: string) {
    //     this.telephone = newTele;
    // }

    // get church(): number {
    //     return this.church;
    // }

    // set church(newChurch: number) {
    //     this.church = newChurch;
    // }

    // set guestOf(newInvitee: string) {
    //     this.guestOf = newInvitee;
    // }

    // get guestOf() {
    //     return this.guestOf;
    // }

    // set id(newId: number) {
    //     this.id = newId;
    // }

    // get id() {
    //     return this.id;
    // }

    // set ageGroup(newAge: string) {
    //     this.ageGroup = newAge;
    // }

    // get ageGroup() {
    //     return this.ageGroup;
    // }

    // set address(add: string) {
    //     this.address = add;
    // }

    // get address() {
    //     return this.address;
    // }

    // get dateAttended() {
    //     return this.dateAttended;
    // }

    // set dateAttended(date: Date) {
    //     this.dateAttended = date;
    // }

    // get lastModified() {
    //     return this.lastModified;
    // }

    // set lastModified(update: Date) {
    //     this.lastModified = update;
    // }

    // get createdAt() {
    //     return this.createdAt;
    // }

    // set createdAt(create: Date) {
    //     this.createdAt = create;
    // }

    // get email(){
    //     return this.email;
    // }

    // set email(e: string){
    //     this.email = e;
    // }


     id: number;
     title: string;
     fullName: string;
     address: string;
     telephone: string;
     email: string;
     guestOf: string;
     church: number;
     reasonVisiting: string;
     ageGroup: string;
     dateAttended: Date;
     lastModified: Date;
     createdAt: Date;
}




// formErrors = {
//     personTitle: '',
//     fullName: '',
//     // church: '',
//     dateAttended: ''
//   };
