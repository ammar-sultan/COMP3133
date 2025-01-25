// lab2_mocha_test/test/calculator.test.js

import { expect } from "chai";

import { add, sub, mul, div } from "../app/calculator.js";

describe("Calculator Tests", () => {
  describe("Addition Tests", () => {
    it("should return 7 for add(5, 2)", () => {
      const result = add(5, 2);
      expect(result).to.equal(7, `Expected 7 but got ${result}`);
    });

    it("should fail for add(5, 2) expecting 9", () => {
      const result = add(5, 2);
      expect(result).to.not.equal(9, `Expected NOT 9 but got ${result}`);
    });
  });

  describe("Subtraction Tests", () => {
    it("should return 3 for sub(5, 2)", () => {
      const result = sub(5, 2);
      expect(result).to.equal(3, `Expected 3 but got ${result}`);
    });

    it("should fail for sub(5, 2) expecting 1", () => {
      const result = sub(5, 2);
      expect(result).to.not.equal(1, `Expected NOT 1 but got ${result}`);
    });
  });

  describe("Multiplication Tests", () => {
    it("should return 10 for mul(5, 2)", () => {
      const result = mul(5, 2);
      expect(result).to.equal(10, `Expected 10 but got ${result}`);
    });

    it("should fail for mul(5, 2) expecting 20", () => {
      const result = mul(5, 2);
      expect(result).to.not.equal(20, `Expected NOT 20 but got ${result}`);
    });
  });

  describe("Division Tests", () => {
    it("should return 5 for div(10, 2)", () => {
      const result = div(10, 2);
      expect(result).to.equal(5, `Expected 5 but got ${result}`);
    });

    it("should fail for div(10, 2) expecting 3", () => {
      const result = div(10, 2);
      expect(result).to.not.equal(3, `Expected NOT 3 but got ${result}`);
    });
  });
});
