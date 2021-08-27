import addIcon from "../img/add-icon.svg"; // App
import React from "react";
import FeedbackModal from "../Modal/FeedbackModal";
// Redux
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import * as notificationActions from "../redux/actions/notification";
import { bindActionCreators } from "redux";
// Redux
import Link from "../Elements/Link";
import menu from "../config/sideMenu";
import Notification from "../Elements/Notification";
import { withCookies } from "react-cookie";
// Elements
import Button from "../Elements/Button";
import MenuNav from "./MenuNav";
import TariffStatus from "../Partials/TariffStatus";
import MobileMenu from "./MobileMenu";
//IMG
import Logo from "../img/logo.svg";
import Minilogo from "../img/logoMobile.svg";
import Smallminilogo from "../img/mini-logo.svg";
import notificationsFill from "../img/notifications-fill.png";
import Support from "../img/support.svg";
import ArrowDown from "../img/arrowDown.png";
import ImgActiveStar from "../img/active-star.png";

class Header extends React.Component {
  constructor() {
    super();
    this.showProfileMenu = this.showProfileMenu.bind(this);
    this.hideProfileMenu = this.hideProfileMenu.bind(this);
    this.showNotificationsPop = this.showNotificationsPop.bind(this);
    this.hideNotificationsPop = this.hideNotificationsPop.bind(this);
  }

  state = {
    showModal: false,
    showMobile: false,
    showProfileMenu: false,
    showNotificationsPop: false,
    showMessagesPop: false,
  };

  showProfileMenu() {
    this.setState({ showProfileMenu: true }, () => {
      document.addEventListener("click", this.hideProfileMenu);
    });
  }
  isClicked(id, e) {
    let element = document.getElementById(id);
    if (element) return element.contains(e.target);
    else false;
  }
  hideProfileMenu(e) {
    if (!this.isClicked("header-profile", e)) {
      this.setState({ showProfileMenu: false });
      document.removeEventListener("click", this.hideProfileMenu);
    }
  }
  showNotificationsPop() {
    this.setState({ showNotificationsPop: true });
    document.addEventListener("click", this.hideNotificationsPop);
  }

  hideNotificationsPop(e) {
    this.setState({ showNotificationsPop: false });
    document.removeEventListener("click", this.hideNotificationsPop);
  }
  logout() {
    const { cookies } = this.props;
    cookies.remove("apiToken", { path: "/" });
    this.props.userActions.logoutUser();
    window.location.reload();
  }

  render() {
    return (
      <header className={`header container-fluid`}>
        <div className="header-content d-flex">
          <div className="header-logo d-none d-md-flex align-items-center">
            <Link to="/">
              <img src={Logo} className="header-logo-img" alt="" />
            </Link>
          </div>
          <div className="header-logo d-flex d-md-none">
            <Link
              to="/"
              className={`m-auto ${
                this.props.user.isAuth ? "d-none d-sm-block" : ""
              }`}
            >
              <img src={Minilogo} className="header-logo-img" alt="" />
            </Link>
            {this.props.user.isAuth && (
              <Link to="/" className="m-auto d-block d-sm-none">
                <img src={Smallminilogo} className="header-logo-img" />
              </Link>
            )}
          </div>
          <MenuNav
            userType={this.props.user.type}
            isAuth={this.props.user.isAuth}
          />
          <div className="col header-stub"></div>
          {!this.props.user.isAuth && (
            <>
              <div
                className="header-feedback d-640-none"
                onClick={() => {
                  this.setState({ showModal: true });
                }}
              >
                <p className="header-feedback-number">
                  {this.props.settings.phone}
                </p>
                <p className="header-feedback-label">
                  Заказать обратный звонок
                </p>
              </div>
              <div className="header-sign-up">
                <div className="header-sign-up-btn">
                  <Link to="/register" className="register">
                    <Button
                      type="fill"
                      paddingVertical={"8px"}
                      paddingHorizontal={"27px"}
                    >
                      Регистрация
                    </Button>
                  </Link>
                  <Link to="/login" className="login">
                    <Button
                      type="empty"
                      paddingVertical={"8px"}
                      paddingHorizontal={"27px"}
                    >
                      Вход
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {this.props.user.isAuth && (
            <div className="header-fast-access">
              <div
                className={`fast-access-btn  notifications ${
                  !!this.props.notifications.all.noRead && "not-empty"
                }`}
                onMouseEnter={() => {
                  this.showNotificationsPop();
                }}
                onMouseLeave={() => {
                  this.hideNotificationsPop();
                }}
              >
                <Link to="/notifications">
                  <>
                    <img src={notificationsFill} alt="Уведомления" />
                    {!!this.props.notifications.all.noRead && (
                      <div className="action-counter">
                        <span>
                          {this.props.notifications.all.noRead >= 10 && 10}
                          {this.props.notifications.all.noRead < 10 &&
                            this.props.notifications.all.noRead}
                        </span>
                        {this.props.notifications.all.noRead >= 10 && (
                          <span className="plus">+</span>
                        )}
                      </div>
                    )}
                  </>
                </Link>
                {this.state.showNotificationsPop && (
                  <div className="pop-block">
                    {this.props.notifications.all.onlyNoread
                      .slice(0, 4)
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="pop-block-item"
                            onClick={() => {
                              this.props.history.push("/notifications");
                            }}
                          >
                            <Notification notification={item} onlyText={true} />
                          </div>
                        );
                      })}
                    {!this.props.notifications.all.onlyNoread.length && (
                      <div className="pop-block-item text-center">Пусто</div>
                    )}
                    {!!this.props.notifications.all.onlyNoread.length && (
                      <div className="text-center">
                        <Button
                          type="fill"
                          paddingHorizontal={"20px"}
                          paddingVertical={"4px"}
                          className="mx-0 my-2"
                          onClick={() => {
                            this.props.notificationActions.notificationsReadAll(
                              this.props.user.apiToken
                            );
                          }}
                        >
                          Прочитано
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                className={`fast-access-btn messages ${
                  !!this.props.dialogs.dialogsALL.noReadCount && "not-empty"
                }`}
              >
                <Link to="/messages">
                  <>
                    <img src={Support} alt="" />
                    {!!this.props.dialogs.dialogsALL.noReadCount && (
                      <div className="action-counter">
                        <span>{this.props.dialogs.dialogsALL.noReadCount}</span>
                      </div>
                    )}
                  </>
                </Link>
              </div>
            </div>
          )}

          {this.props.user.isAuth && (
            <div className="header-additionals d-md-block d-none">
              <Link
                to={`/${
                  this.props.user.type === "cargo"
                    ? "order-create"
                    : "offer-create"
                }`}
                className="register"
              >
                <>
                  <Button
                    type="fill"
                    className="d-none d-lg-block"
                    paddingVertical={"8px"}
                    paddingHorizontal={"20px"}
                  >
                    Добавить{" "}
                    {this.props.user.type === "cargo" ? "заказ" : "предложение"}
                  </Button>
                  <Button
                    type="fill"
                    className="d-block d-lg-none"
                    paddingVertical={"8px"}
                    paddingHorizontal={"13px"}
                  >
                    <img
                      src={addIcon}
                      style={{
                        verticalAlign: "middle",
                      }}
                      alt="addIcon"
                    />
                  </Button>
                </>
              </Link>
            </div>
          )}

          {this.props.user.isAuth && (
            <div
              id="header-profile"
              className="header-profile"
              onClick={() => {
                this.showProfileMenu();
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                className="header-profile-name"
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: "16px",
                    minWidth: "123px",
                  }}
                >{`${this.props.user.name.last} ${this.props.user.name.first}`}</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "14px" }}>
                  {this.props.user.contract.id === 1 && "Физ.лицо"}
                  {this.props.user.contract.id === 2 && "ООО"}
                  {this.props.user.contract.id === 3 && "ИП"}
                  {this.props.user.contract.id === 4 && "Самозанятый"}
                  {!this.props.user.contract.id && "Не указано"}
                </p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: "14px" }}>
                  <span
                    className="rating-head"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.history.push("/reviews");
                    }}
                  >
                    <span>{this.props.user.rating || 0}</span>
                    <img src={ImgActiveStar} alt="ImgActiveStar" />
                  </span>
                  {this.props.user.type === "cargo" && "Грузовладелец"}
                  {this.props.user.type === "carrier" && "Перевозчик"}
                </p>
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="header-profile-arrow-down"
              >
                <img
                  src={ArrowDown}
                  alt="Профиль"
                  style={{
                    filter: this.state.showProfileMenu
                      ? "invert(22%) sepia(99%) saturate(7342%) hue-rotate(277deg) brightness(93%) contrast(111%)"
                      : "",
                  }}
                />
              </div>
              {this.state.showProfileMenu && (
                <div className="profile-menu">
                  {menu.map((item, index) => {
                    if (
                      (!item.role || item.role === this.props.user.type) &&
                      (item.mobile || item.onlyMobile)
                    )
                      return (
                        <Link key={index} to={item.to}>
                          <div className="profile-menu-item">
                            <img src={item.icon} alt="Профиль" />
                            {item.name}
                          </div>
                        </Link>
                      );
                    else return null;
                  })}
                  <div
                    className="profile-menu-additionally"
                    onClick={() => {
                      this.logout();
                    }}
                  >
                    Выйти
                  </div>
                </div>
              )}
            </div>
          )}
          {this.props.user.type === "carrier" && this.props.user.isAuth && (
            <TariffStatus
              tariff={this.props.user.tariff}
              isBan={this.props.user.isBan}
              expiriesAt={this.props.user.expiriesTariffAt}
            />
          )}
          <div className="toogle-burger">{/* <MobileMenu /> */}</div>
        </div>
        <FeedbackModal
          isOpen={this.state.showModal}
          onRequestClose={() => {
            this.setState({ showModal: false });
          }}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    user: state.user,
    notifications: state.notifications,
    dialogs: state.dialogs,
    settings: state.settings.settings,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(Header));
