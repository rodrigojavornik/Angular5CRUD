import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private httpClient: HttpClient) {
    }

    getAll() {
        return this.httpClient.get('http://localhost:9000/api/usuario');
    }

    add(body) {
        return this.httpClient.post('http://localhost:9000/api/usuario', body);
    }

    edit(id, body) {
        return this.httpClient.put('http://localhost:9000/api/usuario/' + id, body);
    }

    delete(id) {
        return this.httpClient.delete('http://localhost:9000/api/usuario/' + id);
    }
}
