import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { selectFile } from "../store/files/filesSlice";
import { useNavigate } from "react-router";
import type { Folder, File } from "../types/Explorer";

export const useExplorer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foldersInfo = useSelector((state: RootState) => state.folders);
  const filesInfo = useSelector((state: RootState) => state.files);
  const selectedFileId = useSelector((state: RootState) => state.files.selectedFileId);

  const folders = Object.values(foldersInfo.entities) as Folder[];
  const files = Object.values(filesInfo.entities) as File[];

  const handleFileClick = (fileId: string) => {
    dispatch(selectFile(fileId));
    navigate(`/documents/${fileId}`);
  };

  return {
    folders,
    files,
    selectedFileId,
    handleFileClick,
  };
};
