import React from 'react';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaCocktail, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <div className="logo-container">
                        <FaCocktail className="logo-icon" />
                        <h2>COCKTAIL BAR</h2>
                    </div>
                    <p>Découvrez notre sélection de cocktails raffinés, préparés avec des ingrédients frais et de qualité pour satisfaire toutes vos envies.</p>
                    <div className="contact">
                        <div><FaPhone /> &nbsp; +33 6 12 34 56 78</div>
                        <div><FaEnvelope /> &nbsp; contact@delices-cocktails.fr</div>
                        <div><FaMapMarkerAlt /> &nbsp; 42 Rue des Saveurs, Paris</div>
                    </div>
                </div>

                <div className="footer-section links">
                    <h2>Liens Rapides</h2>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/categories">Nos Cocktails</a></li>
                        <li><a href="/about">À Propos</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/terms">Conditions Générales</a></li>
                    </ul>
                </div>

                <div className="footer-section newsletter">
                    <h2>Restez Informé</h2>
                    <p>Abonnez-vous à notre newsletter pour découvrir nos nouveautés et offres spéciales.</p>
                    <form>
                        <input type="email" placeholder="Entrez votre email..." required />
                        <button type="submit">S'abonner</button>
                    </form>
                    <div className="social">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Délices Cocktails - Tous droits réservés</p>
            </div>
        </footer>
    );
}

export default Footer;