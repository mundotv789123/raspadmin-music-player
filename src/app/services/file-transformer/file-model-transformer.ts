import { Injectable } from '@angular/core';
import { FileDTO } from '../models/files-model';
import { FileTransformerComponent } from './transformers/files-transformers-base';
import { FileSrcTransformer } from './transformers/decorators/file-src-decorator';
import { FileParentTransformer } from './transformers/decorators/file-parent-decorator';
import { FileTypeTransformer } from './transformers/decorators/file-type-decorator';
import { FileIconTransformer } from './transformers/decorators/file-icon-decorator';

@Injectable({
  providedIn: 'root'
})
export class FileModelTransformer {

  constructor() { }

  tranformeFileDTO(file: FileDTO, apiUrl: string): FileDTO {
    const component = new FileTransformerComponent(file);
  
    const srcTransformer = new FileSrcTransformer(component, apiUrl);
    const parentTransformer = new FileParentTransformer(srcTransformer);
  
    const typeTransformer = new FileTypeTransformer(parentTransformer);
    const iconTransformer = new FileIconTransformer(typeTransformer, apiUrl);
  
    return iconTransformer.transform();
  }
}
