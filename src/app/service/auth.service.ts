import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserNusaService} from './user-nusa.service';




@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private angularFire: AngularFireAuth,
        private userService: UserNusaService,
        private router: Router,
    ) {

    }

    message: string;



    setUserSession(uid){
        console.log('MASUK USER SESSION');
        this.userService.getUser(uid).subscribe(data => {
            console.log(data);
            localStorage.setItem('currUser', JSON.stringify(data));
            localStorage.setItem('UID', uid);

            // USER LOGIN //
            // @ts-ignore
            if (data.privilege === 'user' ){
                this.router.navigate(['/main/tabs/dashboard']);
            } // ADMIN LOGIN //
            else {
                console.log('INI PAGE ADMIN');
            }


        });
    }

    setMessage(msg: string){
        this.message = msg;
    }

    getMessage(){
        return this.message;
    }

    deleteMessage(){
        this.message = '';
        return this.message;
    }

    signInWithEmail(email, password) {
        return this.angularFire.signInWithEmailAndPassword(email, password);
    }

    // SIGN UP //
    signUpWithEmail(email, password) {
        return this.angularFire.createUserWithEmailAndPassword(email, password);
    }

    // logout//
    logOut(){
        this.angularFire.signOut()
            .then(() => {
                console.log('user signed Out successfully');
            }).catch((err) => {
            console.log(err);
        });
    }


}
