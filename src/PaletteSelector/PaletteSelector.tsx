import React, { useState } from 'react';
import './styles/PaletteSelector.css';
import { PaletteColorsList } from '../consts/PalleteColorsList';

interface IPaletteSelectorProps {
  onSelectColor: (color: string) => void;
  currentColor: string;
  isDisabled?: boolean;
}

interface ColorsState {
  selectedColor: string;
  hoveredColor: string | null;
}

const PaletteSelector: React.FC<IPaletteSelectorProps> = ({ onSelectColor, currentColor, isDisabled }) => {
  const [colors, setColors] = useState<ColorsState>({ selectedColor: currentColor, hoveredColor: null });

  const handleMouseEnter = (color: string) => {
    setColors((prevColors) => ({ ...prevColors, hoveredColor: color }));
  };

  const handleMouseLeave = () => {
    setColors((prevColors) => ({ ...prevColors, hoveredColor: null }));
  };

  const handleColorClick = (color: string) => {
    setColors({ selectedColor: color, hoveredColor: null });
    onSelectColor(color);
  };

  return (
    <div className="palette-selector-container">
      <span className="product-card-label-text">Badge colour</span>
      <div className="palette-selector-colors-container">
        {Object.entries(PaletteColorsList).map(([colorName, colorValue]) => {
          const isSelected = colors.selectedColor === colorName;
          const isHovered = colors.hoveredColor === colorValue;

          return (
            <button
              className='palette-selector-button'
              key={colorName}
              style={{
                backgroundColor: colorValue,
                border: isSelected ? '2px solid #B0B0B0' : `2px solid ${colorValue}`,
                opacity: isHovered ? 0.8 : 1,
              }}
              onClick={!isDisabled? () => handleColorClick(colorName) : () => {}}
              onMouseEnter={() => handleMouseEnter(colorValue)}
              onMouseLeave={handleMouseLeave}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteSelector;
