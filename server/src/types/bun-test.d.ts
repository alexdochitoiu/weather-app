// Type declarations for bun:test module
declare module "bun:test" {
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void | Promise<void>): void;
  export function expect(actual: any): any;
  export function beforeEach(fn: () => void | Promise<void>): void;
  export function afterEach(fn: () => void | Promise<void>): void;
  
  interface MockFunction {
    (...args: any[]): any;
    mockReset(): void;
    mockImplementation(fn: (...args: any[]) => any): void;
    mockResolvedValue(value: any): void;
    mockRejectedValue(value: any): void;
    toHaveBeenCalledTimes: any;
    toHaveBeenCalledWith: any;
  }
  
  export function mock(implementation?: (...args: any[]) => any): MockFunction;
  
  export namespace mock {
    export function module(moduleName: string, factory: () => any): void;
  }
}
