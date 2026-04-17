export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface File {
  id: string;
  name: string;
  parentId: string | null;
  content: string;
  updatedAt: number;
}
