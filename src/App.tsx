import {
  Button,
  Container,
  CssBaseline,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  DocumentProcessResult,
  postDocumentProcess,
} from "./services/documents";
import FileUpload from "./components/FileUpload";
import Analysis from "./components/Analysis";

function App() {
  const [document, setDocument] = useState<DocumentProcessResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = async (files: File[]) => {
    if (files.length > 0) {
      setLoading(true);
      const newResult = await postDocumentProcess(files[0]);
      setLoading(false);

      const file = files[0];
      const newImageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImageFile(newImageFile);

      setDocument(newResult ?? null);
    }
  };

  const handleNewClick = () => {
    setDocument(null);
  };

  return (
    <div className="app">
      <CssBaseline></CssBaseline>
      {document && imageFile ? (
        <Container>
          <Button onClick={handleNewClick}>New Image</Button>
          <Analysis document={document} image={imageFile}></Analysis>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <div className="welcome-screen">
            <Typography variant="h2">Offer Analyzer</Typography>
            <Typography variant="subtitle1" gutterBottom>
              An application for automatic extraction of information from Car
              dealership offers
            </Typography>

            <div className="uploader">
              <FileUpload
                onChange={handleChange}
                loading={loading}
              ></FileUpload>
              {loading ? <LinearProgress /> : null}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
