import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { localApi } from '@/utils/axios';

interface FileDownloadProps {
  apiEndpoint: string;
  fileName: string;
}

const FileDownload: React.FC<FileDownloadProps> = ({ apiEndpoint, fileName }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await localApi.get('/download', {
        responseType: 'blob',
        headers: {
          'x-request-api': apiEndpoint,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error('Error al descargar el archivo', err);
    }
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      variant="contained"
      color="primary"
      style={{ marginBottom: '20px' }}
      onClick={handleDownload}
    >
      { loading ? 'Descargando...' : 'Descargar Archivo' }
    </Button>
  );
};

export default FileDownload;
