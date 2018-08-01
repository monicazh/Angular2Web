import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AF {

  displayName;
  email;
  constructor(public af:AngularFire) {
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    this.displayName = null;
    this.email = null;
    return this.af.auth.logout();
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log("af service, registerUser()",email)
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
    });
  }
    /**
     * Logs the user in using their Email/Password combo
     * @param email
     * @param password
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
  loginWithEmail(email, password)
  {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

}
