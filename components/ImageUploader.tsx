
import React, { useState, useCallback } from 'react';
import Icon from './Icon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  const baseClasses = "relative block w-full h-full min-h-[200px] rounded-xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors duration-300 ease-in-out";
  const draggingClasses = "border-cyan-400 bg-gray-700/50";
  const hoverClasses = "hover:border-cyan-500 hover:bg-gray-700/30";

  return (
    <label
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${baseClasses} ${isDragging ? draggingClasses : hoverClasses}`}
    >
      <div className="space-y-2">
        <Icon icon="upload" className="w-12 h-12 mx-auto text-gray-500" />
        <p className="font-semibold text-gray-300">
          <span className="text-cyan-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
      <input
        type="file"
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        accept="image/png, image/jpeg, image/gif"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ImageUploader;
