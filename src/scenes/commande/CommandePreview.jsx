import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Header from "../../components/header/Header";
import {useCart} from "../../context/cartContext";
import './CommandePreview.scss';
import {createOrder} from "../../services/orders/ordersService";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({totalAmount, onPaymentSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setTimeout(() => {
                onPaymentSuccess(paymentMethod.id);
                setLoading(false);
            }, 1000);

        } catch (err) {
            setError("Une erreur est survenue lors du traitement du paiement.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <div className="card-element-container">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && <div className="payment-error">{error}</div>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="payment-button"
            >
                {loading ? 'Traitement en cours...' : `Payer ${totalAmount.toFixed(2)} €`}
            </button>
        </form>
    );
};

const CommandePreview = () => {
    const {cartItems, clearCart} = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [orderComplete, setOrderComplete] = useState(false);
    const [setError] = useState(null);
    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        table: '',
        phone: ''
    });

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tva = subtotal * 0.2;
    const total = subtotal + tva;

    useEffect(() => {
        if (cartItems.length === 0 && !orderComplete) {
            navigate('/');
        }
    }, [cartItems, navigate, orderComplete]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClientInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handlePaymentSuccess = async (paymentId) => {
        try {
            const orderData = {
                email: clientInfo.email,
                phone: clientInfo.phone,
                table: parseInt(clientInfo.table),
                token: paymentId,
                status: 'pending',
                paid: paymentMethod === 'card',
                articles: cartItems.map(item => ({
                    articleId: item.id,
                    quantity: item.quantity
                }))
            };

            await createOrder(orderData);

            setOrderComplete(true);

            clearCart();
        } catch (error) {
            setError("Une erreur est survenue lors de la création de la commande.");
        }
    };

    const handleCashPayment = async () => {
        try {
            const orderData = {
                email: clientInfo.email,
                phone: clientInfo.phone,
                table: parseInt(clientInfo.table),
                token: 'cash_payment',
                status: 'pending',
                paid: false,
                articles: cartItems.map(item => ({
                    articleId: item.id,
                    quantity: item.quantity
                }))
            };

            await createOrder(orderData);

            setOrderComplete(true);

            clearCart();
        } catch (error) {
            setError("Une erreur est survenue lors de la création de la commande.");
        }
    };

    if (orderComplete) {
        return (
            <div>
                <Header/>
                <div className="order-success">
                    <div className="success-container">
                        <div className="success-icon">
                            <i className="fa fa-check-circle"></i>
                        </div>
                        <h2>Commande confirmée</h2>
                        <p>Merci pour votre commande ! Votre paiement a été traité avec succès.</p>
                        <button
                            className="return-button"
                            onClick={() => navigate('/')}
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <div className="commande-preview">
                <div className="commande-container">
                    <div className="commande-section">
                        <h2>Résumé de votre commande</h2>

                        <div className="client-info">
                            <h3>Vos informations</h3>
                            <div className="form-group">
                                <label htmlFor="table">Numéro de table</label>
                                <input
                                    type="text"
                                    id="table"
                                    name="table"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nom complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={clientInfo.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={clientInfo.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={clientInfo.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="cart-items-preview">
                            <h3>Articles ({cartItems.length})</h3>
                            <ul className="cart-items-list">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="cart-item">
                                        <div className="item-details">
                                            <span className="item-title">{item.title}</span>
                                            <span className="item-quantity">x{item.quantity}</span>
                                        </div>
                                        <span className="item-price">
                                            {(item.price * item.quantity).toFixed(2)} €
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-totals">
                                <div className="total-line">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div className="total-line">
                                    <span>TVA (20%)</span>
                                    <span>{tva.toFixed(2)} €</span>
                                </div>
                                <div className="total-line total-final">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="payment-section">
                        <h2>Mode de paiement</h2>

                        <div className="payment-methods">
                            <div
                                className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                                onClick={() => handlePaymentMethodChange('card')}
                            >
                                <div className="payment-icon">
                                    <i className="fa fa-credit-card"></i>
                                </div>
                                <span>Carte bancaire</span>
                            </div>

                            <div
                                className={`payment-method ${paymentMethod === 'cash' ? 'active' : ''}`}
                                onClick={() => handlePaymentMethodChange('cash')}
                            >
                                <div className="payment-icon">
                                    <i className="fa fa-money-bill"></i>
                                </div>
                                <span>Espèces</span>
                            </div>
                        </div>

                        {paymentMethod === 'card' ? (
                            <div className="stripe-payment-container">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        totalAmount={total}
                                        onPaymentSuccess={handlePaymentSuccess}
                                    />
                                </Elements>
                            </div>
                        ) : (
                            <div className="cash-payment-container">
                                <p>Vous paierez en espèces directement au comptoir.</p>
                                <button
                                    className="cash-payment-button"
                                    onClick={handleCashPayment}
                                >
                                    Confirmer la commande
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandePreview;