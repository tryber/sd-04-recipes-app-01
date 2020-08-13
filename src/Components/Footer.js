import React from 'react';
import { Link } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import exploreImage from '../images/exploreIcon.svg';
import mealImage from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <div data-testid="footer" className="btn btn-primary position-fixed">
        <div className="footer">
          <div className="footer-item">
            <Link to="/bebidas">
              <img data-testid="drinks-bottom-btn" className="" src={drinkImage} alt="drink icon" />
            </Link>
          </div>
          <div className="footer-item">
            <Link to="/explorar">
              <img data-testid="explore-bottom-btn" className="" src={exploreImage} alt="explore icon" />
            </Link>
          </div>
          <div className="footer-item">
            <Link to="/comidas">
              <img data-testid="food-bottom-btn" className="" src={mealImage} alt="meal icon" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
