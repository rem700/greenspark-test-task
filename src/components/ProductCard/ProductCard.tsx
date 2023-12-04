import React, { FC } from 'react';
import './styles/ProductCard.css';
import PaletteSelector from '../../PaletteSelector/PaletteSelector';
import { IProductWidget } from '../../models/productWidget';
import { PaletteColorsList } from '../../consts/PalleteColorsList';

import logo from '../../img/logo.svg';
import logo_green from '../../img/logo_green.svg';
import tooltip from '../../img/tooltip.svg';

interface IProductCard extends IProductWidget {
    onToggleActive: (active: boolean) => void;
    onTooltipEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onLinkedChange: (linked: boolean) => void;
    onColorChange: (newColor: string) => void;
    paletteIsDisabled?: boolean;
}

const ProductCard: FC<IProductCard> = ({
    id,
    type,
    amount,
    action,
    active,
    linked,
    selectedColor,
    onToggleActive,
    onTooltipEnter,
    onLinkedChange,
    onColorChange,
    paletteIsDisabled,
}) => {

    const getLogoByColor = () => PaletteColorsList[selectedColor] === PaletteColorsList.beige || PaletteColorsList[selectedColor] === PaletteColorsList.white ? logo_green : logo;

    const textColor = PaletteColorsList[selectedColor] === PaletteColorsList.beige || PaletteColorsList[selectedColor] === PaletteColorsList.white ? 'product-card-text-green' : 'product-card-text';

    return (
        <div className="product-card">
            <div className="product-card-top" style={{ backgroundColor: PaletteColorsList[selectedColor] }}>
                <img src={getLogoByColor()} alt="greenspark logo" className="product-card-logo" />
                <div className={textColor}>
                    <p className="product-card-text-action">This product {action}</p>
                    <p className="product-card-text-amount">
                        {amount} {type}
                    </p>
                </div>
            </div>

            <div className="product-card-container">
                <span>
                    <label className="product-card-label-text" htmlFor={`linkedTo-${id}`}>
                    Link to Public Profile
                    </label>
                    <img
                        src={tooltip}
                        id={`tooltip-${id}`}
                        alt="tooltip"
                        onMouseEnter={onTooltipEnter}
                    /></span>
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        id={`linkedTo-${id}`}
                        className="product-card-checkbox"
                        checked={linked}
                        onChange={(event) => onLinkedChange(event.target.checked)}
                    />
                    <span className="checkbox"></span>
                </div>
            </div>

            <PaletteSelector onSelectColor={onColorChange} currentColor={selectedColor} isDisabled={paletteIsDisabled} />

            <div className="product-card-container">
                <label className="product-card-label-text" htmlFor={`activateBadge-${id}`}>
                    Activate badge
                </label>
                <div className="toggle-wrapper">
                    <input
                        type="checkbox"
                        id={`activateBadge-${id}`}
                        checked={active}
                        onChange={(event) => onToggleActive(event.target.checked)}
                        className="product-card-toggle"
                    />
                    <span className="toggle"></span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;