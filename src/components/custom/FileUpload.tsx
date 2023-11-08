import React, { useEffect, useState } from 'react';
import { Button, Input } from '@mui/material';
import { localApi } from '@/utils/axios';
import CustomSnackbar from './CustomSnackbar';

interface FileUploadProps {
  apiEndpoint: string;
  block: boolean;
  setSomething: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  apiEndpoint,
  block,
  setSomething,
}) => {
  const [initialOpen, setInitialOpen] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());

  const handleSnackbar = (type: 'success' | 'error', msg: string) => {
    setMessageType(type);
    setMessage(msg);
    setInitialOpen(true);
  };

  useEffect(() => {
    if (setSomething) setSomething(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    let formData = new FormData();
    try {
      if (!selectedFile) {
        handleSnackbar('error', 'No se seleccionó ningún archivo');
        return;
      }
      setLoading(true);
      formData.append('file', selectedFile);
      await localApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-request-api': apiEndpoint,
        },
      });
      handleSnackbar('success', 'Archivo subido correctamente');
    } catch {
      handleSnackbar('error', 'Error al subir el archivo');
    }
    setInputKey(Date.now());
    formData = new FormData();
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <>
      <Input
        type="file"
        key={inputKey}
        onChange={handleFileChange}
        style={{
          marginRight: '20px',
          marginBottom: '20px',
        }}
      />
      <Button disabled={loading || block} variant="contained" color="primary" onClick={handleUpload}>
        { loading ? 'Subiendo...' : 'Enviar' }
      </Button>
      <CustomSnackbar
        initialOpen={initialOpen}
        type={messageType}
        message={message}
      />
    </>
  );
};

export default FileUpload;
