// customer.ts
export class Customer {
  private firstName: string;
  private lastName: string;
  private _age: number;

  // Update constructor to include age
  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this._age = age;
  }

  public greeter() {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  }

  // New method to return the age and log it to the console
  public GetAge(): number {
    console.log(`Age: ${this._age}`);
    return this._age;
  }
}
