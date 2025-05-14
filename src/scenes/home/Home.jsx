import React from "react";
import Header from "components/header/Header";
import "./Home.scss";
import Widget from "./components/widget/Widget";
import LastArticle from "./components/lastArticle/lastArticle";

const Home = () => {
    return (
        <div>
            <Header/>
            <section className="elementor-section">
                <div className="elementor-container">
                    <div className="elementor-column">
                        <Widget img="img/spritz.jpg" titre="Les Spiritueux" direction="spiritueux"/>
                    </div>
                    <div className="elementor-column elementor-section-boxed">
                        <Widget img="img/indemodable.jpg" titre="Les Indémodables" direction="indemodables"/>
                        <Widget img="img/shooter.jpg" titre="Shooter" direction="shooters"/>
                        <Widget img="img/long.jpg" titre="Long Drink" direction="long-drink"/>
                        <Widget img="img/short.webp" titre="Short Drink" direction="short-drink"/>
                    </div>
                </div>
            </section>
            <section>
                <LastArticle/>
            </section>
        </div>
    );
};

export default Home;