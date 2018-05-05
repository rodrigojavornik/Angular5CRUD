import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class HistoricoService {

    constructor(private httpClient: HttpClient) { }

    getAll(idUsuario) {
        return this.httpClient.get('http://localhost:9000/api/historico/' + idUsuario);
    }

    add(idUsuario, body) {
        return this.httpClient.post('http://localhost:9000/api/historico/' + idUsuario, body);
    }

    edit(id, body) {
        return this.httpClient.put('http://localhost:9000/api/historico/' + id, body);
    }

    delete(id) {
        return this.httpClient.delete('http://localhost:9000/api/historico/' + id);
    }
}
