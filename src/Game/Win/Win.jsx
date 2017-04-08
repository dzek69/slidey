import React from "react";

const cookieImage = "http://vignette2.wikia.nocookie.net/cookieclicker/" +
    "images/c/c7/Cookie_Clicker_Mobile_Icon.png/revision/latest?cb=20140123210322";

/**
 * Win component
 *
 * @returns {React.Component} - rendered component
 */
export default function Win() {
    return (
        <div className="win">
            You win!<br />
            Have a cookie:<br />
            <img className="win__cookie" src={cookieImage} alt="Cookie" />
        </div>
    );
}
