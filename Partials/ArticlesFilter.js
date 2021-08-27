import React from "react";
import Filter from "../ArticlesElements/Filter";
import Articles from "../ArticlesElements/Articles";
import { withRouter } from "next/router";

class ArticlesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.articles = React.createRef();
  }

  state = {
    type: this.props.type ? this.props.type : "offer",
    status: 2,
    carType: false,
    property: false,
    carProperty: [],
    additionally: [],
    contractInfo: [],
    paymentInfo: [],
    from: false,
    to: false,
    cargoType: false,
    cargoStandartData: {},
    cargoData: [],
    startDate: {
      date: false,
      timeFrom: false,
      timeTo: false,
    },
    budget: false,
    rating: false,
  };
  componentDidUpdate(p, s) {
    let cityPast =
      s.from.data &&
      (s.from.data.city_with_type || s.from.data.region_with_type);
    let cityNew =
      this.state.from.data &&
      (this.state.from.data.city_with_type ||
        this.state.from.data.region_with_type);
    if (cityPast !== cityNew) this.props.cityChange(cityNew);
  }
  componentDidMount() {
    if (this.props.onlyType) this.setState({ type: this.props.onlyType });
    if (this.props.defaultStateF)
      this.setState(JSON.parse(this.props.defaultStateF), () => {
        this.articles.current.getAricles();
      });
  }

  onSearch = () => {
    if (this.props.isSearchRedirect) {
      if (this.state.type === "offer") {
        this.props.router.push({
          pathname: "/search-offer",
          search: "?params=" + JSON.stringify(this.state),
        });
      }
      if (this.state.type === "order") {
        this.props.router.push({
          pathname: "/search-order",
          search: "?params=" + JSON.stringify(this.state),
        });
      }
      return 0;
    }
    this.articles.current.getAricles();
  };
  render() {
    return (
      <>
        <Filter
          onChange={(state) => {
            this.setState({ ...state });
          }}
          defaultCity={this.props.city}
          onlyType={this.props.onlyType}
          onResetFilter={() => {
            this.setState({
              status: 2,
              carType: false,
              property: false,
              carProperty: [],
              additionally: [],
              contractInfo: [],
              paymentInfo: [],
              from: false,
              to: false,
              cargoType: false,
              cargoStandartData: {},
              cargoData: [],
              startDate: {
                date: false,
                timeFrom: false,
                timeTo: false,
              },
              budget: false,
              rating: false,
            });
          }}
          onSearch={this.onSearch}
          options={this.state}
          className="background-gray-768 filter-main"
        />
        {!this.props.notRezult && (
          <Articles
            notControl={true}
            defaultInfo={this.props.defaultInfo}
            ref={this.articles}
            isManage={true}
            filter={{ ...this.state }}
          />
        )}
      </>
    );
  }
}
export default withRouter(ArticlesFilter);
