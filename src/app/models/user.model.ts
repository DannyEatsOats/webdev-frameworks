export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phoneNum: string,
    public dateOfBirth: Date,
    public role: 'admin' | 'user' | 'guest'
  ) { }

  getFormattedBirthDate(): string {
    return this.dateOfBirth.toLocaleDateString();
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

