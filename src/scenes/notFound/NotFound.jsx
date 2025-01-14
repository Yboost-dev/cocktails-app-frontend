import React from "react";
import "./NotFound.scss";
import ImgNotFound from "./components/imgNotFound/ImgNotFound";
import ContentNotFound from "./components/contentNotFound/ContentNotFound";

const NotFound = () => {
    return (
        <section className="not-found-container">
            <div className="not-found-content">
                <ContentNotFound/>
                <ImgNotFound/>
            </div>
        </section>
    );
};

export default NotFound;