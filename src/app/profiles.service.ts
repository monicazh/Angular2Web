import { Injectable,ElementRef, Input, ViewChild }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Profile } from './profile';

@Injectable()
export class ProfilesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private profilesUrl = 'api/profiles';
  private singleUrl = 'api/profile';
  private imageUrl = 'api/images';
  //private profiles;

  constructor(private http: Http) {
    //console.log('Profile Service Initialized...');
    //this.profiles = this.getProfiles();
  }

  getProfiles(){
    console.log("###Service#getProfiles()");
    return this.http.get(this.profilesUrl)
      .map(res => res.json());
    //  .catch(this.handleError);
  }
  getProfileById(id: number) {
    const url = `${this.singleUrl}/${id}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  create(profile) {
    console.log("###Service#Create(), profile=",profile);
    //var headers = new Headers();
    //headers.append('Content-Type', 'application/json');
     return this.http
       .post(this.profilesUrl, JSON.stringify(profile),{headers: this.headers})
       .map(res => res.json());
  }

  // 1) create player profile, update() is called here
  //    Without/With image, using app.PUT()
  // 2) update profile: [game-detail component]add an interested game to profile
  update(profile) {
    console.log("###Service## Update(), profile=",profile);
    const url = `${this.singleUrl}/${profile.myid}`;
    return this.http
      .put(url, JSON.stringify(profile), {headers: this.headers})
      .map(res => res.json())
  }

  uploadImage(formData: FormData) {
    console.log("###Service#Upload(), formData=",formData);
    var headers = new Headers();
    headers.append('Content-Type', 'false');
    return this.http
      .post(this.imageUrl, formData)
      .map(res => res.json());
  }
/*
  uploadImage2(image) {
    console.log("###Service#Upload()2222)");

    return this.http
      .post(this.imageUrl, JSON.stringify(image), {headers: this.headers})
      .map(res => res.json());
  }*/
/*
  login(username: string, password: string) {
    return this.http.get(this.profilesUrl)
        //.flatMap((profiles) => response.json())
        .filter((profiles) => {
          let profile of profiles;
          profile.username === username &&
          profile.password === password} )
  }*/

/*
        .subscribe(profiles => {
          let filteredUsers = profiles.filter(profile => {
            return profile.username === username && profile.password === password;
          });
          console.log("@@@@@@ Service.login() filteredUser=",filteredUsers);
          if (filteredUsers.length){
            let user = filteredUsers[0];
            if (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
            }


      return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }*/

/*
  getProfile(id: number): Promise<Profile> {
    const url = `${this.profilesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Profile)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.profilesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(profile: Profile): Promise<Profile> {
    console.log("###Service#Create(), profile=",profile);
    return this.http
      .post(this.profilesUrl, JSON.stringify({name: profile.name, email:profile.email,
      age:profile.age, gender: profile.gender}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(profile: Profile): Promise<Profile> {
    const url = `${this.profilesUrl}/${profile.name}`;
    return this.http
      .put(url, JSON.stringify(profile), {headers: this.headers})
      .toPromise()
      .then(() => profile)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  */
}




