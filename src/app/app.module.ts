import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UsuarioService} from './services/usuario.service';
import {HistoricoService} from './services/historico.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,

    ],
    providers: [
        UsuarioService,
        HistoricoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
