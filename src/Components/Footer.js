import React from 'react';
import { Link } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import exploreImage from '../images/exploreIcon.svg';
import mealImage from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <div data-testid="footer" className="footer">
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={drinkImage} alt="drink icon" />
        </Link>
        <Link to="/explorar" >
          <img data-testid="explore-bottom-btn" src={exploreImage} alt="explore icon" />
        </Link>
        <Link to="/comidas" >
          <img data-testid="food-bottom-btn" src={mealImage} alt="meal icon" />
        </Link>
      </div>
    );
  }
}

export default Footer;
