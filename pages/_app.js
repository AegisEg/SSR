import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import { YMaps } from "react-yandex-maps";
import * as settingsActions from "../redux/actions/settings";
import * as userActions from "../redux/actions/user";
import { parseCookies } from "nookies";
import "@babel/polyfill";
import "../controllers/simpleFunction.js";
import "../css/main.css";
import "../css/grid.min.css";

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    let isServer = !!ctx.req;
    if (isServer) {
      await ctx.store.dispatch(settingsActions.getSettings());
      const { apiToken } = parseCookies(ctx);
      if (apiToken) {
        await ctx.store.dispatch(userActions.loginUser(apiToken));
      }
    }
    let user = ctx.store.getState().user;
    //fiddleWere
    // if ((user.isAuth && ctx.req.url === "/login") || ctx.req.url === "/register") {
    //   ctx.res.writeHead(302, { Location: "/" });
    //   ctx.res.end();
    // }
    //fiddleWere
    // ctx.store.getState()
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <YMaps>
          <Component {...pageProps}></Component>
        </YMaps>
      </Provider>
    );
  }
}
const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
