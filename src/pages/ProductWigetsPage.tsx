import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductWidget } from '../models/productWidget';
import { fetchProductWidgets } from '../api/apiClient';
import { Modal } from '../components/Modal/Modal';
import ProductCard from '../components/ProductCard/ProductCard';
import { WrapperComponent } from '../components/Wrapper/WrapperComponent';

const ProductWidgetsPage: React.FC = () => {
    const [productWidgets, setProductWidgets] = useState<IProductWidget[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedWidget, setSelectedWidget] = useState<IProductWidget | null>(null);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const widgets: IProductWidget[] = await fetchProductWidgets();
                setProductWidgets(widgets);
            } catch (error) {
                console.error('Error fetching product widgets:', error);
            }
        };
        fetchData();
    }, []);

    const handleToggleActive= (id: number, active: boolean) => {
        setProductWidgets(prevProductWidgets => {
            const updatedProductWidgets = prevProductWidgets.map(prevWidget => ({
                ...prevWidget,
                active: prevWidget.id === id ? active : false,
            }));
            return updatedProductWidgets;
        });
    };

    const handleToggleLinked = (id: number, linked: boolean) => {
        setProductWidgets(prevProductWidgets =>
            prevProductWidgets.map(prevWidget =>
                prevWidget.id === id ? { ...prevWidget, linked } : prevWidget
            )
        );
    };

    const handleColorChange = (id: number, newColor: any) => {
        setProductWidgets(prevProductWidgets =>
            prevProductWidgets.map(prevWidget =>
                prevWidget.id === id ? { ...prevWidget, selectedColor: newColor } : prevWidget
            )
        );
    };

    const handleTooltipEnter = (widget: IProductWidget, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedWidget(widget);
        setModalOpen(true);
        setHoveredElement(event.currentTarget);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleViewProfile = () => {
        navigate('/profile', { state: { allProductCards: productWidgets.filter(card => card.linked) } });
    };

    return (
        <Fragment>
            <WrapperComponent title='Per product widgets'>
                {productWidgets.map(widget => (
                    <ProductCard
                        key={widget.id}
                        {...widget}
                        onToggleActive={(active) => handleToggleActive(widget.id, active)}
                        onTooltipEnter={e => handleTooltipEnter(widget, e)}
                        onLinkedChange={linked => handleToggleLinked(widget.id, linked)}
                        onColorChange={newColor => handleColorChange(widget.id, newColor)}
                    />
                ))}
            </WrapperComponent>

            {selectedWidget && hoveredElement && (
                <Modal isOpen={isModalOpen} onClose={closeModal} triggerElement={hoveredElement}>
                    <p className="modal-tooltip-text">
                        This widget links directly to your public profile so that you can easily share your impact with your customers.
                        Turn it off here if you do not want the badge to link to it.
                    </p>
                    <button className="modal-tooltip-button" onClick={handleViewProfile}>
                        View Public Profile
                    </button>
                </Modal>
            )}
        </Fragment>
    );
};

export default ProductWidgetsPage;