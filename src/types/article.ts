export interface ArticleAuthor {
  Name: string;
  Position: string;
  Affiliation: string;
}

export interface ArticleSubHeading {
  SubTitle?: string;
  SubContent?: string;
  Title?: string;
  Content?: string;
}

export interface ArticleHeading {
  Title: string;
  Content: string;
  SubHeadings?: ArticleSubHeading[];
}

export interface ArticleReference {
  text: string;
  url: string;
}

export interface PaperData {
  DOI?: string;
  ArticleInfo?: {
    Received: string;
    Revised: string;
    Published: string;
    Editor: string;
  };
  ArticleDetails?: {
    Title: string;
    Email?: string;
    Authors: ArticleAuthor[];
    CoAuthors?: ArticleAuthor[];
  };
  Abstract?: string;
  Highlights?: string[];
  Keywords?: string;
  Introduction?: string;
  Heading?: ArticleHeading[];
  Conclusion?: string;
  Recommendations?: string;
  Refrences?: ArticleReference[];
  References?: ArticleReference[];
}
