import React from 'react';
import './Widget.scss';
import {Link} from "react-router-dom";

const Widget = ({img, titre, direction}) => {
    return (
        <div className="elementor-widget-wrap">
            <div className="elementor-element">
                <div className="elementor-widget-container">
                    <div className="widget-category-banner" style={{
                        backgroundImage: `url(${img})`,
                    }}>
                        <div className="item-inner">
                            <div className="category-box-content">
                                <h2 className="category-box-title">
                                    {titre}
                                </h2>
                                <Link to={`/${direction}`} className="category-box-subtitle">
                                    Voir la carte
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;