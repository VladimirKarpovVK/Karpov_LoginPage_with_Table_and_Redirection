import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./css/tables.css";

import { useSpring, animated } from "react-spring";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "./images";
library.add(fab, faTimesCircle);

const IconButton = ({ ...rest }) => {
  const [isrotated, SetRotation] = useState(false);
  const { x, color } = useSpring({
    x: isrotated ? 135 : 0,
    color: isrotated ? "red" : "#6B7F94"
  });
  return (
    <animated.div
      style={{
        width: "100%",
        color: color,
        transform: x.interpolate(x => `rotate(${x}deg)`)
      }}
      onMouseOver={() => {
        SetRotation(true);
      }}
      onMouseLeave={() => {
        SetRotation(false);
      }}
    >
      <FontAwesomeIcon {...rest} icon={faTimesCircle} />
    </animated.div>
  );
};
const AnimatedIcon = animated(IconButton);

const ResultComponent = () => {
  return [
    <div className="results">
      <h3 >Результаты расчета</h3>
    </div>,
    <hr />,
    <table className="mainTable">
      <thead className="mainTable_thead">
        <tr>
          <th>&nbsp;</th>
          <th>Наименование</th>
          <th>Кол-во</th>
          <th>Цена за ед. &#8381;</th>
          <th>Стоимость &#8381;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>

      <tbody className="maintBody">
        <tr>
          <td className="imageWrapper">
            <img src={images[0]} className="leftImage" />
          </td>

          <td>SHINGLAS многослойная черепица, Ранчо, Коричневый, 2 м2</td>
          <td>78 ул.</td>
          <td>589.00</td>
          <td>45 471.00</td>
          <td>
            <IconButton className="button" size="2x" />
          </td>
        </tr>
        <tr>
          <td className="imageWrapper">
            <img className="leftImage" src={images[1]} />
          </td>

          <td>Черепица конька/карниза (уп. 12 п.м / 20 п.м)</td>
          <td>78 ул.</td>
          <td>589.00</td>
          <td>45 471.00</td>
          <td>
            <AnimatedIcon className="button" size="2x" />
          </td>
        </tr>
      </tbody>
    </table>
  ];
};
export default ResultComponent;
