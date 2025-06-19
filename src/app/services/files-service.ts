import { Injectable } from '@angular/core';
import { FileModelTransformer } from './file-transformer/file-model-transformer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FileDTO, FilesResponse } from './models/files-model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private client: HttpClient, private fileModelTransformer: FileModelTransformer) { }

  async getFiles(path: string): Promise<Array<FileDTO>> {
    const endpoint = environment.apiQuery.replace('{0}', encodeURIComponent(path).replace("%2F", "/"));
    const response = await lastValueFrom(this.client.get<FilesResponse>(`${environment.baseUri}/files${endpoint}`));

    const url = `${environment.baseUri}/files/open${environment.srcQuery}`;
    
    const responseTransforme = response.files.map(file => this.fileModelTransformer.tranformeFileDTO(file, url));
    return responseTransforme;
  }
}
