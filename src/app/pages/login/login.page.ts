import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { LoginService } from "../../services/login.service";
import { NavController } from "@ionic/angular";

import Swal from "sweetalert2";

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

  loginUser(form) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    const email = form.email;
    const password = form.password;

    this.loginService.loginUser(email, password).subscribe(
      (user: any) => {
        this.storage.set('User', user.data);
        this.storage.set("isLogged", true);
        this.navCtrl.navigateForward("/menu/facturas-pendientes");
        console.log(user.data);
        console.log("Login exitoso");
        Toast.fire({
          icon: "success",
          title: "Login exitoso"
        });
      },
      err => {
        if (err.error.message === "Invalid Password") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Contraseña invalida",
            showConfirmButton: false,
            showClass: {
              popup: "animated fadeInDown faster"
            },
            hideClass: {
              popup: "animated fadeOutUp faster"
            },
            timer: 1000
          });
          console.log("Password");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email invalido",
            showConfirmButton: false,
            showClass: {
              popup: "animated fadeInDown faster"
            },
            hideClass: {
              popup: "animated fadeOutUp faster"
            },
            timer: 1000
          });
        }
        // console.log(err.error.message);
        // console.log('El famoso error', err);
        // console.log('Login fallido');
        // console.log('Error', err);
      }
    );

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
}
