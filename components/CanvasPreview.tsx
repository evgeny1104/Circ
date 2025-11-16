
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

interface CanvasPreviewProps {
  imageFile: File;
  borderRadius: number;
}

export interface CanvasPreviewHandles {
  getCanvas: () => HTMLCanvasElement | null;
}

const CanvasPreview = forwardRef<CanvasPreviewHandles, CanvasPreviewProps>(({ imageFile, borderRadius }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    if (!imageFile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = URL.createObjectURL(imageFile);
    image.onload = () => {
      const { width, height } = image;
      canvas.width = width;
      canvas.height = height;

      let radius = borderRadius;
      if (radius > width / 2) radius = width / 2;
      if (radius > height / 2) radius = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.arcTo(width, 0, width, radius, radius);
      ctx.lineTo(width, height - radius);
      ctx.arcTo(width, height, width - radius, height, radius);
      ctx.lineTo(radius, height);
      ctx.arcTo(0, height, 0, height - radius, radius);
      ctx.lineTo(0, radius);
      ctx.arcTo(0, 0, radius, 0, radius);
      ctx.closePath();
      
      ctx.clip();
      ctx.drawImage(image, 0, 0, width, height);

      setImageUrl(canvas.toDataURL('image/png'));
      URL.revokeObjectURL(image.src);
    };
    image.onerror = () => {
        URL.revokeObjectURL(image.src);
    }

  }, [imageFile, borderRadius]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-full object-contain"
        />
      )}
    </>
  );
});

export default CanvasPreview;
