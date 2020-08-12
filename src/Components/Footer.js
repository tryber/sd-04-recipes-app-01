import React from 'react';
import { Link } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import exploreImage from '../images/exploreIcon.svg';
import mealImage from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <div data-testid="footer" className="btn btn-primary btn-sm btn-block position-fixed">
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" className="" src={drinkImage} alt="drink icon" />
        </Link>
        <Link to="/explorar">
          <img data-testid="explore-bottom-btn" className="" src={exploreImage} alt="explore icon" />
        </Link>
        <Link to="/comidas">
          <img data-testid="food-bottom-btn" className="" src={mealImage} alt="meal icon" />
        </Link>
      </div>
    );
  }
}

export default Footer;
