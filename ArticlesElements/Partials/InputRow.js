// App
import React from "react";
import { withRouter } from "next/router";
import Link from "../../Elements/Link";
import { connect } from "react-redux";
// import * as myArticlesActions from "../../redux/actions/myarticles";
// import { bindActionCreators } from "redux";
// Elements
import Button from "../../Elements/Button";

import RequestModal from "../RequestModal.js";

import ArrowDown from "../../img/arrowDownperple.svg";
import ArrowDownPng from "../../img/arrowDown.png";

class InputRow extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isFetching: false,
  };
  render() {
    let isAuthor = false;
    if (this.props.user._id === this.props.article.author._id) isAuthor = 1;
    if (!this.props.onlyOpen) {
      return (
        <>
          {!this.props.onMobile && (
            <a
              className="mr-3 d-640-none f-12 href more-click"
              onClick={this.props.eOpen}
            >
              {!this.props.articleOpen ? (
                <>Подробнее</>
              ) : (
                <>Скрыть подробности</>
              )}
              <img
                className="ml-2"
                src={ArrowDown}
                width="10"
                height="7"
                alt="ArrowDown"
              />
            </a>
          )}
          {this.props.onMobile && (
            <div className="action-list">
              <span onClick={this.showActionList}>
                Действия <img src={ArrowDownPng} alt="ArrowDownPng" />
              </span>
              {this.state.isOpenActionList && (
                <div className="pop-block">
                  <Link
                    to={`/${this.props.article.type}/${this.props.article.articleId}`}
                  >
                    <div className="profile-menu-item">Смотреть</div>
                  </Link>
                  <div
                    className="profile-menu-item"
                    onClick={() => {
                      if (this.props.user.isAuth) {
                        this.setState({
                          isOpenModalRequest: !this.state.isOpenModalRequest,
                        });
                      } else this.props.router.push("/login");
                    }}
                  >
                    ВЗЯТЬ
                  </div>
                </div>
              )}
            </div>
          )}
          {!this.props.onMobile && (
            <>
              <Link
                to={`/${this.props.article.type}/${this.props.article.articleId}`}
              >
                <Button type="empty" className="input-action">
                  Смотреть
                </Button>
              </Link>
              <Button
                type="fill"
                className={`get-article ${
                  !this.props.user.isAuth ||
                  (this.props.user.isAuth &&
                    this.props.user.type === "cargo" &&
                    this.props.article.type === "offer") ||
                  (this.props.user.type === "carrier" &&
                    this.props.article.type === "order")
                    ? ""
                    : "disable"
                }`}
                paddingVertical={"8px"}
                paddingHorizontal={"35px"}
                fontSize={"14px"}
                onClick={() => {
                  if (this.props.user.isAuth) {
                    this.setState({
                      isOpenModalRequest: !this.state.isOpenModalRequest,
                    });
                  } else this.props.router.push("/login");
                }}
              >
                ВЗЯТЬ
              </Button>
            </>
          )}
          <RequestModal
            isOpen={this.state.isOpenModalRequest}
            article={this.props.article}
            // setRequest={this.props.myArticlesActions.setRequest}
            onRequestClose={() => {
              this.setState({ isOpenModalRequest: false });
            }}
          />
        </>
      );
    }
    return false;
  }
}
// function mapDispatchToProps(dispatch) {
//   return {
//     myArticlesActions: bindActionCreators(myArticlesActions, dispatch),
//   };
// }
export default connect(null, null)(withRouter(InputRow));
