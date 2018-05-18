import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator';

describe('Test for Calculator', () => {

  let calculator;

  beforeEach(() => {
    // Prepaprar
    calculator = new Calculator();
  });

  describe('Test for multiply', () => {

    it('should return 9', () => {
      // Actuar
      let result = calculator.multiply(3, 3);
      // Verificar
      expect(result).toEqual(9);
    })

    it('should return 0', () => {
      // Actuar
      let result = calculator.multiply(6, 0);
      // Verificar
      expect(result).toEqual(0);
    })
  })

  describe('Test for divide', () => {

    it('should return 2', () => {
      // Actuar y Verificar
      expect(calculator.divide(4, 2)).toEqual(2);
    })

    it('should return null', () => {
      // Actuar y Verificar
      expect(calculator.divide(9, 0)).toEqual(null);
    })

    it('divide for a zero', () => {
      // Actuar y Verificar
      expect(calculator.divide(9, 0)).toBeNull();
      expect(calculator.divide(5, 0)).toBeNull();
      expect(calculator.divide(12458, 0)).toBeNull();
    })

    it("test of matchers", () => {
      let name = 'nicolas'
      let name2;
      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 2 == 3).toBeTruthy();
      expect(1 + 1 == 3).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(10);

      expect('1234567').toMatch(/123/);

      expect(["apples", "oranges", "pears"]).toContain("oranges");
    });

  })
})
