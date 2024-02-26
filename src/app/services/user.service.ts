import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../types/user';
import { Platform } from '@ionic/angular';
import { Observable, catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public activeUser?: User;
  private allUsers!: User[];
  private sqlite?: SQLiteConnection;
  private db?: SQLiteDBConnection;
  private isMobile?: boolean;

  constructor(private platform: Platform) {
    const users = localStorage.getItem('users');
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.isMobile = this.platform.is('mobile');
    this.allUsers = users ? JSON.parse(users) : [];
    if(this.isMobile){
      this.init();
    }
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
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT UNIQUE
      );`;
    await this.db?.execute(startUpStatements);
  }

  findUser(credential:string,password:string): Observable<User>{
    return new Observable(obs=>{
      setTimeout(()=>{
        if(this.isMobile){
          const query = `
            SELECT * FROM user 
            WHERE (user.email = '${credential}' OR user.phone = '${credential}') 
            AND user.password = '${password}';
          `;
          this.db!.query(query).then(result=>{
            if(result.values){
              obs.next(result.values[0]);
            }else{
              obs.error(new Error("Invalid credential or password."));
            }
            obs.complete();
          })
        }else{
          const user = this.allUsers?.find(e=>
            (e.email===credential || e.phone ===credential)
            && e.password === password);
          if(user){
            obs.next(user);
          }else{
            obs.error(new Error("Invalid credential or password."));
          }
          obs.complete();
        }
      },500);
    });
  }

  createUser(name:string,phone:string,email:string,password:string): Observable<number>{
    const user = {name,phone,email,password};
    return new Observable(obs=>{
      setTimeout(()=>{
        if(this.isMobile){
          const statement = `
            INSERT INTO user(name,password,email,phone) VALUES 
            ('${user.name}', '${user.password}', '${user.email}', '${user.phone}');`;
          this.db?.execute(statement).then(result=>{
            const response = result.changes?.lastId
            if(response){
              obs.next(response);
            }else{
              obs.error(new Error("User already exists"));
            }
            obs.complete();
          });
        }else if(this.allUsers?.find(e=>e.phone===user.phone || e.email===user.email)){
          obs.error(new Error("User already exists"));
        }else{
          this.allUsers?.push(user)
          localStorage.setItem("users",JSON.stringify(this.allUsers));
          obs.next(this.allUsers.length)
        }
        obs.complete();
      },500)
    });
  }

  login(credential:string,passsword:string):Observable<User>{
    return new Observable((obs)=>{
      this.findUser(credential,passsword)
        .pipe(catchError(err=>{
          obs.error(err);
          obs.complete();
          return of(err);
        }))
        .subscribe((user)=>{
        this.activeUser = user;
        obs.next(user);
        obs.complete();
      });
    });
  }

}
