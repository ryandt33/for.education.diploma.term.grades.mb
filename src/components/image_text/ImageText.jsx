import { useState } from "react";

const ImageText = ({ image, text, text_side = "left" }) => {
  const [toggle, isToggled] = useState(false);

  if (text_side === "left")
    return (
      <div className="image-text">
        {toggle ? (
          <div className="image-text__overlay" onClick={() => isToggled(false)}>
            <div className="image-text__overlay__container">
              <img
                src={image.src}
                alt={image.alt}
                className="image-text__overlay__image"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="image-text__image_box">
          <img
            src={image.src}
            alt={image.alt}
            className="image-text__image_box__image"
            onClick={() => isToggled(true)}
          />
        </div>{" "}
        <p className="image-text__text">{text}</p>
      </div>
    );
  else
    return (
      <div className="image-text">
        <p className="image-text__text">{text}</p>
        <div className="image-text__image_box">
          <img
            src={image.src}
            alt={image.alt}
            className="image-text__image_box__image"
          />
        </div>{" "}
      </div>
    );
};

export default ImageText;
