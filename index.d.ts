declare class ReInterval {
  /**
   * @param cb interval callback
   * @param interval interval
   * @param args arguments
   */
  constructor(cb: () => any, interval: number, ...args: any[])
  /** reschedule */
  reschedule(interval: number): void
  /** clear Interval */
  clear(): void
  /** destroy Interval */
  destroy(): void
}

declare function reInterval(cb: () => any, ms: number, ...args: any[]): ReInterval

declare module 'reinterval' {
  export = reInterval
}
