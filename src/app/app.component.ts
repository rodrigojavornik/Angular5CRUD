import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioService} from './services/usuario.service';
import {HistoricoService} from './services/historico.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private usuarioService: UsuarioService, private historicoService: HistoricoService) {
    }

    listUsuarios;
    listHistorico;
    currentUsuarioId = null;

    ngOnInit() {
        this.getUsuarios();
    }

    usuarioAux = {
        id: null,
        nome: '',
        email: '',
        telefone: ''
    };

    historicoAux = {
        id: null,
        idUsuario: null,
        action: '',
        dataAction: ''
    };

    resetFormUsuario() {
        this.usuarioAux = {
            id: null,
            nome: '',
            email: '',
            telefone: ''
        };
    }

    getUsuarios() {
        this.usuarioService.getAll()
            .subscribe((data: any[]) => {
                this.listUsuarios = data;
            });
    }

    addUsuario(usuario) {
        if (usuario.nome && usuario.email && usuario.telefone) {
            const body = JSON.stringify(usuario);
            this.usuarioService.add(body)
                .subscribe(val => {
                    },
                    response => {
                    },
                    () => {
                        this.getUsuarios();
                        this.resetFormUsuario();
                    });
        }
    }

    updateUsuario(usuario) {
        if (usuario.nome && usuario.email && usuario.telefone) {
            const body = JSON.stringify(usuario);
            this.usuarioService.edit(usuario.id, body)
                .subscribe(val => {
                    },
                    response => {
                    },
                    () => {
                        this.getUsuarios();
                        this.resetFormUsuario();
                    });
        }
    }

    submitUsuario(usuario) {
        if (usuario.id === null) {
            this.addUsuario(usuario);
        } else {
            this.updateUsuario(usuario);
        }
    }

    deleteUsuario(usuario) {
        this.usuarioService.delete(usuario.id)
            .subscribe(
                (val) => {
                },
                response => {
                    console.log('DELETE call in error', response);
                },
                () => {
                    this.getUsuarios();
                });
    }

    showEditUsuario(usuario) {
        this.usuarioAux = Object.assign({}, usuario);
    }


    getHistoricoByUsuario(id) {
        this.currentUsuarioId = id;
        this.historicoService.getAll(id)
            .subscribe((data: any[]) => {
                this.listHistorico = data;
            });
    }

    resetFormHistorico() {
        this.historicoAux = {
            id: null,
            idUsuario: null,
            action: '',
            dataAction: ''
        };
    }

    addHistorico(historico) {
        if (this.currentUsuarioId && historico.action && historico.dataAction) {
            historico.idUsuario = this.currentUsuarioId;
            const body = JSON.stringify(historico);

            this.historicoService.add(this.currentUsuarioId, body)
                .subscribe(val => {
                    },
                    response => {
                        console.log('PUT call in error', response);
                    },
                    () => {
                        this.getHistoricoByUsuario(this.currentUsuarioId);
                        this.resetFormHistorico();
                    });
        }
    }

    deleteHistorico(historico) {
        this.historicoService.delete(historico.id)
            .subscribe(
                (val) => {
                },
                response => {
                    console.log('DELETE call in error', response);
                },
                () => {
                    this.getHistoricoByUsuario(historico.idUsuario);
                });
    }
}
