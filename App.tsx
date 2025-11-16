
import React, { useState, useRef, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import CanvasPreview, { type CanvasPreviewHandles } from './components/CanvasPreview';
import Controls from './components/Controls';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [borderRadius, setBorderRadius] = useState<number>(50);
  const [originalFileName, setOriginalFileName] = useState<string>('image.png');

  const canvasPreviewRef = useRef<CanvasPreviewHandles>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setOriginalFileName(file.name);
  };

  const handleReset = useCallback(() => {
    setImageFile(null);
    setBorderRadius(50);
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = canvasPreviewRef.current?.getCanvas();
    if (canvas && imageFile) {
        const link = document.createElement('a');
        const fileNameParts = originalFileName.split('.');
        const name = fileNameParts.slice(0, -1).join('.');
        const extension = 'png';
        link.download = `${name}-rounded.${extension}`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }, [originalFileName, imageFile]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Image Corner Rounder</h1>
          <p className="text-lg text-gray-400 mt-2">Upload your image, adjust the roundness, and download.</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Icon icon="settings" className="w-6 h-6 mr-3 text-cyan-400" />
                Controls
              </h2>
              {imageFile ? (
                <Controls
                  borderRadius={borderRadius}
                  onRadiusChange={setBorderRadius}
                  onDownload={handleDownload}
                  onReset={handleReset}
                  maxRadius={200}
                />
              ) : (
                <ImageUploader onImageSelect={handleImageSelect} />
              )}
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-white flex items-center mb-6">
                <Icon icon="preview" className="w-6 h-6 mr-3 text-cyan-400" />
                Preview
              </h2>
              <div className="w-full aspect-square bg-gray-900/50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-700 overflow-hidden">
                {imageFile ? (
                  <CanvasPreview ref={canvasPreviewRef} imageFile={imageFile} borderRadius={borderRadius} />
                ) : (
                  <div className="text-center text-gray-500">
                    <Icon icon="placeholder" className="w-16 h-16 mx-auto mb-4" />
                    <p>Your image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>A free widget for your website. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
