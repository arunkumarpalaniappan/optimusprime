import React, { Component } from 'react';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 
import * as opportunitiesActions from '../actions/opportunitiesAction'; 
import '../css/custom.css';
import Pagination from './Pagination'
import Cards from './OpportunitiesCards'


class Opportunities extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 1,
      oppr: this.props.oppr,
      opprbg: this.props.opprbg,
    };
    this.pageChange = this.pageChange.bind(this);
  }
  pageChange(currentPage) {
    if(this.state.page<this.props.opprbg["paging"]["total_pages"] && this.state.page >= 1) {
      this.setState({page:currentPage});
      this.switchPage(currentPage);
    }
  }
  switchPage(page) {
    this.props.actions.loadOpportunities(page);
  }
  render() {
    return (
      <div>
      <div className="ls-title-bar">
        <div className="head-information">
          <div className="head-text-info">
            <h2 className="ls-title team-name name-short">Opportunities Management</h2>
          </div>
        </div>
      </div>
      <div className="ls-section-divider"></div>
      {!!this.props.opprbg["data"]?(<span><Cards
        data={this.props.opprbg["data"]}
      />
      <Pagination currentPage={this.state.page} maxPage={this.props.opprbg["paging"]} onPageChange={this.pageChange} /></span>):(null)}
      
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    oppr: state.oppr,
    opprbg: state.opprbg,
    opprupdate: state.opprupdate
  };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(opportunitiesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Opportunities);
