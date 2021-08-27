// App
import React from "react";
import moreico from "../img/more_icon.png";
import ReactResizeDetector from "react-resize-detector";
// Router
import NavLink from "../Elements/NavLink";
import { connect } from "react-redux";

class MenuNav extends React.Component {
  state = {
    menu: [
      {
        id: 34,
        name: "Найти заказ",
        href: "/search-order",
        type: "menu",
        isAuth: true,
        userType: "carrier",
        width: 0,
      },
      {
        id: 31,
        name: "Найти предложение",
        href: "/search-offer",
        type: "menu",
        isAuth: true,
        userType: "cargo",
        width: 0,
      },
      {
        id: 1,
        name: "Грузовладельцам",
        href: "/cargo",
        type: "menu",
        alwaysVisible: true,
        width: 0,
      },
      {
        id: 2,
        name: "Перевозчикам",
        href: "/carrier",
        type: "menu",
        alwaysVisible: true,
        width: 0,
      },
      {
        id: 3,
        name: "FAQ",
        href: "/faq",
        type: "menu",
        isAuth: false,
        width: 0,
      },
      {
        id: 21,
        name: "FAQ",
        href: "/support",
        type: "menu",
        isAuth: true,
        width: 0,
      },
      {
        id: 4,
        name: "О портале",
        href: this.props.settings.aboutPage,
        type: "menu",
        alwaysVisible: true,
        width: 0,
      },
      {
        id: 5,
        name: "Тарифы",
        href: "/tariffs",
        alwaysVisible: true,
      },
      {
        id: 6,
        name: "Скачать приложение",
        href: "/download-app",
        alwaysVisible: true,
      },
    ],
    menuWidth: 200,
  };

  onResize = (menuWidth) => {
    if (menuWidth !== 0) this.setState({ menuWidth });
  };
  onResizeItem = (itemWidth, id) => {
    let menu = this.state.menu;
    for (let i = 0; i < menu.length; i++) {
      if (
        (this.props.isAuth === menu[i].isAuth || menu[i].alwaysVisible) &&
        (!menu[i].userType || menu[i].userType === this.props.userType)
      )
        if (menu[i].id === id) {
          menu[i].width = itemWidth;
          break;
        }
    }

    this.setState({ menu });
  };

  render() {
    let menu = this.state.menu,
      width = 61;

    for (let i = 0; i < menu.length; i++) {
      width += menu[i].width;
      if (
        (this.props.isAuth === menu[i].isAuth || menu[i].alwaysVisible) &&
        (!menu[i].userType || menu[i].userType === this.props.userType)
      )
        if (width >= this.state.menuWidth) {
          menu[i].type = "submenu";
        } else menu[i].type = "menu";
    }
    return (
      <div className="header-navigation d-premd-none col">
        <nav>
          <ul>
            {menu.map((item) => {
              if (
                (this.props.isAuth === item.isAuth || item.alwaysVisible) &&
                (!item.userType || item.userType === this.props.userType)
              )
                return (
                  item.type === "menu" && (
                    <li key={item.id} style={{ opacity: item.width ? 1 : 0 }}>
                      <NavLink to={item.href} activeClassName="active">
                        {item.name}
                      </NavLink>
                      <ReactResizeDetector
                        handleWidth
                        handleHeight={false}
                        onResize={(width) => {
                          this.onResizeItem(width, item.id);
                        }}
                      />
                    </li>
                  )
                );
              else
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "contents",
                    }}
                  ></div>
                );
            })}
          </ul>
          {menu.find((item) => item.type === "submenu") && (
            <div className="moreMenu">
              <span className="more-menu">
                Еще <img src={moreico} className="d-inline" alt="Pogrooz" />
                <div className="submenu">
                  <ul>
                    {menu.map((item) => {
                      return (
                        item.type === "submenu" && (
                          <li key={item.id}>
                            <NavLink to={item.href} activeClassName="active">
                              {item.name}
                            </NavLink>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              </span>
            </div>
          )}
        </nav>
        <ReactResizeDetector
          handleWidth
          handleHeight={false}
          onResize={(width) => {
            this.onResize(width);
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings.settings,
  };
};
export default connect(mapStateToProps)(MenuNav);
