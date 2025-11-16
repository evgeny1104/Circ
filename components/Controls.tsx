
import React from 'react';
import Icon from './Icon';

interface ControlsProps {
  borderRadius: number;
  maxRadius: number;
  onRadiusChange: (radius: number) => void;
  onDownload: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ borderRadius, maxRadius, onRadiusChange, onDownload, onReset }) => {
  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="radius-slider" className="block text-sm font-medium text-gray-300 mb-2">
          Corner Radius: <span className="font-bold text-cyan-400">{borderRadius}px</span>
        </label>
        <input
          id="radius-slider"
          type="range"
          min="0"
          max={maxRadius}
          value={borderRadius}
          onChange={(e) => onRadiusChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center px-4 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
        >
          <Icon icon="download" className="w-5 h-5 mr-2" />
          Download
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
        >
          <Icon icon="reset" className="w-5 h-5 mr-2" />
          Reset Image
        </button>
      </div>
    </div>
  );
};

export default Controls;
