/** Shared API types for Viksit Bharat Journal platform */

export interface AuthUser {
  userId: string;
  email: string;
  institution?: string;
  role?: string;
  areaOfStudy?: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  institution?: string;
  role?: string;
  areaOfStudy?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  institution?: string;
  role?: string;
  areaOfStudy?: string;
}

export interface ArticleSummary {
  _id: string;
  title: string;
  abstract?: string;
  authors?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleDetail extends ArticleSummary {
  content?: string;
  keywords?: string;
  references?: string[];
  doi?: string;
}

export interface CoAuthor {
  name: string;
  email: string;
  designation?: string;
  organization?: string;
  mobile?: string;
}

export interface ManuscriptRecord {
  id: number | string;
  title: string;
  abstract?: string;
  category?: string;
  keywords?: string;
  file_path?: string;
  submission_date?: string;
  author_name?: string;
  author_email?: string;
  author_designation?: string;
  author_organization?: string;
  author_mobile?: string;
  status?: string;
  co_authors?: CoAuthor[] | string;
}

export interface ApiErrorBody {
  message?: string;
  error?: string;
}
