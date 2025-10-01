export class FileContext {
  id: string;
  gallery_id: string;
  file_url: string;
  thumbnail_url: string;
  creator_name: string;
  extension: string;
  created: number;

  constructor(data: {
    id: string;
    gallery_id: string;
    file_url: string;
    thumbnail_url: string;
    creator_name: string;
    extension: string;
    created: string;
  }) {
    this.id = data.id;
    this.gallery_id = data.gallery_id;
    this.file_url = data.file_url;
    this.thumbnail_url = data.thumbnail_url;
    this.creator_name = data.creator_name;
    this.extension = data.extension;
    this.created = Number(data.created);
  }

  static fromJSON(json: string): FileContext {
    const data = JSON.parse(json);
    return new FileContext(data);
  }
}
