import { Timestamp } from "@angular/fire/firestore";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phoneNum: string,
    public dob: Timestamp,
    public role: 'admin' | 'user' | 'guest'
  ) { }

  getFormattedBirthDate(): string {
    return this.dob.toDate().toString();
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

