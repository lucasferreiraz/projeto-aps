import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo, VeiculoAtualizacao, VeiculoCadastro, VeiculoModel } from '../core/model';

export class VeiculoFiltro {
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  baseUrl = 'http://localhost:8080/veiculos'
  vagasUrl = 'http://localhost:8080/vagas'
  estacionamentosUrl = 'http://localhost:8080/estacionamentos'

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: VeiculoFiltro): Observable<any> {
    let params = new HttpParams()

    params = params.set('page', filtro.pagina)
    params = params.set('size', filtro.itensPorPagina)

    return this.http.get(`${this.baseUrl}`, { params })
  }

  pesquisarWithDetails(filtro: VeiculoFiltro): Observable<any> {
    let params = new HttpParams()

    params = params.set('page', filtro.pagina)
    params = params.set('size', filtro.itensPorPagina)

    return this.http.get(`${this.baseUrl}/getVeiculosDetails`, { params })
  }

  pesquisarTodas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  buscaPorId (id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  findByIdWithDetails(id: number): Observable<VeiculoModel> {
    return this.http.get(`${this.baseUrl}/withDetails/${id}`)
  }

  adicionar(veiculo: Veiculo): Observable<Veiculo> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Veiculo>(`${this.baseUrl}`, veiculo, { headers })
  }

  insert(veiculo: VeiculoCadastro): Observable<VeiculoModel> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Veiculo>(`${this.baseUrl}/insertVeiculo`, veiculo, { headers })
  }

  atualizar(veiculo: Veiculo): Observable<Veiculo> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Veiculo>(`${this.baseUrl}/${veiculo.id}`,
      veiculo, { headers })
  }

  update(veiculo: VeiculoAtualizacao): Observable<VeiculoModel> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Veiculo>(`${this.baseUrl}/atualizar`,
      veiculo, { headers })
  }

  excluir(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  remove(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${id}`)
  }

  findAllVagas(): Observable<any> {
    return this.http.get(`${this.vagasUrl}`)
  }

  findAllEstacionamentos(): Observable<any> {
    return this.http.get(`${this.estacionamentosUrl}`)
  }

}
