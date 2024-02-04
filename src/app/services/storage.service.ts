import { Injectable } from '@angular/core';
import { CapacitorSQLite, DBSQLiteValues, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sqlite?: SQLiteConnection;
  private db?: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init(){
    this.db = await this.sqlite?.createConnection(
      'default',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db?.open();

    const startUpStatements = `
      CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        active INTEGER DEFAULT 1,
        passsword TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT UNIQUE
      );`;
    await this.db?.execute(startUpStatements);
  }

  async findUser(credential:string,password:string): Promise<DBSQLiteValues | undefined>{
    const query = `
      SELECT * FROM user 
      WHERE (user.email = ${credential} OR user.phone = ${credential}) 
      AND user.password = ${password};
    `;
    return this.db?.query(query);
  }

}
