import React from "react";
import App, { Container } from "next/app";
import ls from "local-storage";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {
      user: {},
      isServer: false
    };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const isServer = !!ctx.req;

    if (isServer) {
      if (ctx.req.user) {
        console.log(`_app.js:getInitialProps:ctx.req.user Exists`);
        if (ctx && ctx.req && ctx.req.user) {
          pageProps.user = ctx.req.user;
        }
      }

      if (pageProps && pageProps.isServer) {
        pageProps.isServer = true;
      }
    } else {
      let user;
      try {
        user = ls.get("userInfo");
      } catch (e) {
        user = {};
      }
      if (pageProps) {
        pageProps.user = user;
      }
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const isBrowser = typeof window !== "undefined";

    // running on client and this is the first page load (not redirect)
    if (pageProps && pageProps.isServer && isBrowser) {
      ls.set("userInfo", pageProps.user);
    }

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
