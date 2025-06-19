import { FileDTO } from "../../../models/files-model";
import { Component, Decorator } from "../files-transformers-base";
import { lookup } from "mime-types";

export class FileTypeTransformer extends Decorator {
  constructor(compoment: Component) {
    super(compoment);
  }

  public override transform(): FileDTO {
    const file = super.transform();
    if (!file.type && !file.is_dir) {
      const mimeType = lookup(file.name);
      if (mimeType) {
        file.type = mimeType;
      }
    }
    return file;
  }
}