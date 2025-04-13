export class User {
  constructor(
    public id: number,
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

