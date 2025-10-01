
export class Gallery {
  id: string;
  creator_id: string | null;
  title: string;
  description: string;

  constructor(
    data: {
      id: string;
      creator_id: string | null;
      title: string;
      description: string;
    } = { id: "", creator_id: "", title: "", description: "" }
  ) {
    this.id = data.id;
    this.creator_id = data.creator_id;
    this.title = data.title;
    this.description = data.description;
  }
}
