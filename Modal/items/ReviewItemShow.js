// App
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
//IMGS
import AngleUp from "../../img/angle-up.png";
import AngleDown from "../../img/angle-down.png";
import RatingInput from "../../Elements/RatingInput";
import Link from "../Elements/Link";
class ReviewItem extends React.Component {
  render() {
    return (
      <div className="review-item padding">
        <div className="f-14 mb-2 d-flex align-items-center">
          <Link href={`/user/${this.props.review.author._id}`}>
            {this.props.review.author.name.last}{" "}
            {this.props.review.author.name.first}{" "}
            {this.props.review.author.name.middle}
          </Link>
          {this.props.multiple && (
            <img
              onClick={() => {
                this.props.open(this.props.index);
              }}
              className="ml-2 angle-toogle"
              src={this.props.isOpen ? AngleUp : AngleDown}
              style={{
                cursor: "pointer",
              }}
              alt="AngleUp"
            />
          )}
        </div>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          style={{
            display: "contents",
          }}
        >
          {this.props.isOpen && (
            <div>
              <span>{this.props.review.comment || "Нет текста отзыва"}</span>
              <div>
                Рейтинг:
                <RatingInput
                  isDisable={true}
                  value={this.props.review.rating}
                />
              </div>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
export default ReviewItem;
