import React, { Component } from 'react';

class OpportunitiesPagination extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: this.props.currentPage,
            maxPage: this.props.maxPage,

          };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changePage = this.changePage.bind(this);
      }
      nextPage(event) {
        event.preventDefault();
        const {onPageChange} = this.props;
        if(this.state.page<this.props.maxPage['total_pages']) {
          this.setState({page:this.state.page+1});
          onPageChange(this.state.page);
        }
      }
      previousPage(event) {
        event.preventDefault();
        const {onPageChange} = this.props;
        if(this.state.page > 1) {
          this.setState({page:this.state.page-1});
          onPageChange(this.state.page);
        }
      }
      changePage(event) {
          event.preventDefault();
          const {onPageChange} = this.props; // eslint-disable-next-line
        if(parseInt(event.target.innerText)<this.props.maxPage['total_pages'] && parseInt(event.target.innerText) > 1) { // eslint-disable-next-line
          this.setState({page:parseInt(event.target.innerText)});
            onPageChange(this.state.page);
          }
      }
      createPage() {
          if(!!this.props.maxPage) {
            let paginationContent = [];
            for(let i = this.state.page - 2; i < this.state.page + 3;i++) {
                if(i>0 && i < this.props.maxPage['total_pages']+1) {
                    paginationContent[paginationContent.length]= <span key={i} className={"pagination-page"} onClick={this.changePage}>{i}</span>
                }
            }
            paginationContent[paginationContent.length] = <span key={'dots'}>&nbsp;&nbsp;....&nbsp;&nbsp;</span>
            paginationContent[paginationContent.length] = <span key={this.props.maxPage['total_pages']} className={"pagination-page"} onClick={this.changePage}>{this.props.maxPage['total_pages']}</span>
            return paginationContent;
          }
          else {
              return <span></span>
          }
          
      }
      render() {
        return (
          <div className={"pagination-div"}>             
            <input type="button" onClick={this.previousPage} value="Previous" className={"pagination-button"} />
            {this.createPage()}
            <input type="button" onClick={this.nextPage} value="Next" className={"pagination-button"} />
          </div>
        );
    }
}

export default OpportunitiesPagination;