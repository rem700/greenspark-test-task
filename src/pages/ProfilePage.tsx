import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IProductWidget } from '../models/productWidget';
import ProductCard from '../components/ProductCard/ProductCard';
import { WrapperComponent } from '../components/Wrapper/WrapperComponent';

interface ProfilePageProps {
    allProductCards: IProductWidget[];
    onUpdateColorState: (widgetId: string, newColor: string) => void;
}

const ProfilePage: React.FC = () => {
    const location = useLocation();
    const { allProductCards }: ProfilePageProps =
        location.state || { allProductCards: [] };
    const [profileProductCards, setProfileProductCards] = useState<IProductWidget[]>(allProductCards);
    const navigate = useNavigate();

    const handleLinkedChange = (id: number, linked: boolean) => {
        if (!linked) {
            setProfileProductCards(prevProductCards =>
                prevProductCards.filter(card => card.id !== id)
            );
        }
    };

    const shortProductList = profileProductCards.length < 3;

    const handleViewWidgets = () => {
        navigate('/');
    };
    return (
        <Fragment>
            <WrapperComponent title='Public Profile' shortList={shortProductList}>
                {profileProductCards.map((widget) => (
                    <ProductCard
                        key={widget.id}
                        {...widget}
                        onToggleActive={() => { }}
                        onTooltipEnter={() => { }}
                        onLinkedChange={(linked) => handleLinkedChange(widget.id, linked)}
                        onColorChange={() => { }}
                        paletteIsDisabled
                    />
                ))}
            </WrapperComponent>
            <button className="profile-back-button" onClick={handleViewWidgets}>Back to product widgets</button>
        </Fragment>
    );
};

export default ProfilePage;
