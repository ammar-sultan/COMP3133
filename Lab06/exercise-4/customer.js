"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
// customer.ts
var Customer = /** @class */ (function () {
    // Update constructor to include age
    function Customer(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    // New method to return the age and log it to the console
    Customer.prototype.GetAge = function () {
        console.log("Age: ".concat(this._age));
        return this._age;
    };
    return Customer;
}());
exports.Customer = Customer;
