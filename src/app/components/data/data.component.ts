import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit
{
  forma: FormGroup;
  usuario: Object = {
    nombreCompleto: {
      nombre: 'Fernando',
      apellido: 'Herrera'
    },
    correo: 'batman@jla.com',
    pasatiempos: [ '' ]
  };

  constructor() {
    this.forma = new FormGroup( {
      'nombreCompleto': new FormGroup( {
        'nombre': new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength( 3 )
          ]
        ),
        'apellido': new FormControl(
          '',
          [
            Validators.required,
            this.noHerrera
          ]
        )
      } ),
      'correo': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' )
        ]
      ),
      'pasatiempos': new FormArray( [
        new FormControl( '', Validators.required )
      ] ),
      'username': new FormControl( '', Validators.required, this.existeUsuario )
    } );

    //this.forma.setValue( this.usuario );

    this.forma.controls[ 'username' ].valueChanges.subscribe(
      data => {
        console.log( data );
      }
    );

    this.forma.controls[ 'username' ].statusChanges.subscribe(
      data => {
        console.log( data );
      }
    );
  }

  ngOnInit() {
  }

  resetearFormulario() {
    this.forma.reset( {
      nombreCompleto: {
        nombre: '',
        apellido: ''
      },
      correo: '',
      pasatiempos: [ '' ]
    } );
  }

  agregarPasatiempo() {
    ( <FormArray>this.forma.controls[ 'pasatiempos' ] ).push(
      new FormControl( '', Validators.required )
    );
  }

  noHerrera( control: FormControl ): { [ s: string ]: boolean } {
    // Validación falla
    if( control.value === 'herrera' ) {
      return {
        noherrera: true
      }
    }
    // Validación pasa
    return null;
  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any> {
    let promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout( () => {
          if( control.value === "strider" ) {
            resolve( { existe: true } );
          }
          else {
            resolve( null );
          }
        }, 3000 );
      }
    );
    return promesa;
  }

  guardarCambios() {
    console.log( this.forma );
    console.log( this.forma.value );
  }
}
