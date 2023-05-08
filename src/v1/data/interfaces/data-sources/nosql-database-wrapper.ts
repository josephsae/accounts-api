/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): void;
}
