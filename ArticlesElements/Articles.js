// App
import React from "react";

// Article
import Article from "./Article";
import Pagination from "../Elements/Pagination";
import ArticleHeader from "./Partials/ArticleHeader";
import configApi from "../config/api";
import Loading from "../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";

class Articles extends React.Component {
  state = {
    articles: false,
    currentPage: false,
    pageCount: false,
    isFething: false,
  };
  getAricles(page = 0) {
    this.setState({ isFething: true }, () => {
      fetch(`${configApi.urlApi}/api/article/getArticles`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: this.props.filter,
          page: page,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            this.setState({
              pageCount: data.pageAll,
              currentPage: page,
              articles: data.articles,
              isFething: false,
            });
          }
        });
    });
  }
  setPage(selected) {
    if (selected !== this.state.currentPage) {
      this.getAricles(selected);
    }
  }

  render() {
    console.log();
    let articles = this.state.articles || this.props.defaultInfo.articles,
      currentPage =
        this.state.currentPage || this.props.defaultInfo.currentPage,
      pageCount = this.state.pageCount || this.props.defaultInfo.pageCount;
    return (
      <div className="articles-block">
        <ArticleHeader></ArticleHeader>
        <Loading isLoading={this.state.isFething}></Loading>
        <CSSTransitionGroup
          transitionName="height-animation-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          style={{
            display: "contents",
          }}
        >
          {articles.map((article, i) => {
            return (
              <Article
                IsManage={this.props.isManage || article.status === 2}
                notControl={this.props.notControl}
                notLink={this.props.onlyPublic && article.status !== 2}
                key={i}
                article={article}
              />
            );
          })}
        </CSSTransitionGroup>
        {!articles.length && (
          <div className="text-center py-3">Записей не найдено</div>
        )}
        {!!articles.length && (
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount - 1}
            onPageChange={this.setPage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default Articles;
