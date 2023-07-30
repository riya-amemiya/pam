export interface microcmsCardsType {
  contents: Content[];
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
  logo: Logo;
  link: string;
}

interface Logo {
  url: string;
  height: number;
  width: number;
}
