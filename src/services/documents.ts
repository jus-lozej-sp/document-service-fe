import { toast } from "react-toastify";
import { httpClient } from "./http-client";

interface ProcessTable {
  headerRows: [];
  bodyRows: [];
}

interface DocumentField {
  value: string;
  confidence: number;
}

interface DocumentFields {
  [key: string]: DocumentField;
}

export interface DocumentProcessResult {
  fields: DocumentFields;
  tables: Array<ProcessTable>;
  text: string;
}

export const postDocumentProcess = async (
  file: Blob
): Promise<DocumentProcessResult | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await httpClient.post(`/document/process/example`, formData);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while loading clients");
  }
};