import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public activeUser?: User;

  constructor(private storageService: StorageService){}

  async login(credential:string,passsword:string):Promise<User | null>{
    const user = await this.storageService.findUser(credential,passsword);
    return new Promise ((resolve)=>{
      if(user){
        resolve(user.values![0]);
      }else{
        resolve(null)
      }
    })
  }

}
