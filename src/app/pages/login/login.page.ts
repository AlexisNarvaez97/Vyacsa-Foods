import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { LoginService } from "../../services/login.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userData: any[] = [];
  email = "vrodriguez@intekelfinancer.com";

  constructor(
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUsers();
  }

  getUsers() {
    this.loginService.getUsuarios().subscribe(resp => {
      console.log("Usuarios", resp);
      // console.log("Usuarios", resp.email);
    });
  }

  loginUser(form) {
    const email = form.email;
    const password = form.password;

    this.loginService.loginUser(email, password).subscribe((user: any) => {
      this.loginService.getUsuarios().subscribe((resp: any) => {
        this.userData = resp;

        const existe = this.userData.find( data => data.email === email);

        if ( existe ) {
          console.log('Wey si puedes logearte');
          this.navCtrl.navigateForward("/menu/facturas-pendientes");
        }

        // console.log('OMG', existe);
      });
      // console.log(resp.data);
      // this.storage.set("User", resp.data);
      // this.storage.set("isLogged", true);
    }, err => {
      if (err.status === 400 || 404) {
        console.log('Te llevo la verga perro');
      }
      // console.log('Error', err);
    });


    // this.authService
    //   .loginUser(value)
    //   .then(user => {
    //     if (user) {
    //       this.storage.set("isLogged", true);
    //       this.storage.set("currentUser", user);
    //       this.router.navigateByUrl('/menu/facturas-pendientes');
    //       Swal.fire({
    //         position: 'center',
    //         type: 'success',
    //         title: 'Login con exito...',
    //         showConfirmButton: false,
    //         timer: 1000
    //       })
    //     }
    //   })
    //   .catch(error => {
    //     Swal.fire({
    //       position: 'center',
    //       type: 'error',
    //       title: error,
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //   });
  }

  login() {
    this.navCtrl.navigateForward("/menu/facturas-pendientes");
  }

}
