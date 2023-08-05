export interface microcmsNewsType {
  contents: Content[] | [];
  totalCount: number;
  offset: number;
  limit: number;
}

interface Content {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  main: string;
  category: Category[];
}

interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

interface Thumbnail {
  url: string;
  height: number;
  width: number;
}
