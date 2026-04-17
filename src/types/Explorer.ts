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

export interface Block {
  id: string;
  name: string;
  content: string;
}

