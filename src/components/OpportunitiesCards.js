import React, { Component } from 'react';
import SideBar from './SideBar' 

class OpportunitiesCards extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            viewSidebarActive:false,
            opprid:null
        }
        this.viewShowSideBar = this.viewShowSideBar.bind(this);
        this.viewHideSideBarCancel = this.viewHideSideBarCancel.bind(this);
        this.viewHideSideBar = this.viewHideSideBar.bind(this);
      }
      viewShowSideBar(event) {// eslint-disable-next-line
        this.setState({viewSidebarActive:true,opprid: parseInt(event.target.getAttribute('id'))})
      }
      viewHideSideBarCancel(){
        this.setState({viewSidebarActive:false});
      }
      viewHideSideBar(){
        this.setState({viewSidebarActive:false});
      }
      createCards() {
          if(!!this.props.data) {
            let cardsContent = [];
            for(let obj in this.props.data) {
                cardsContent[cardsContent.length]= <span key={this.props.data[obj].id} className={"pagination-cards"}>
                <div className="card horizontal">
                <div className="card-stacked">
                  <div className="card-content">
                    <b>{this.props.data[obj].title}</b><div className="edit-icon"><i id={this.props.data[obj].id} className="material-icons" onClick={this.viewShowSideBar}>mode_edit</i></div><br/>
                    <span><i>{this.props.data[obj].description}</i><br/></span>
                    <span>Application Close Date  <b>{this.props.data[obj].applications_close_date}</b><br/></span>
                    <span>Earliest Start Date  <b>{this.props.data[obj].earliest_start_date}</b><br/></span>
                    <span>Latest End Date  <b>{this.props.data[obj].latest_end_date}</b><br/></span>
                    <span>Background  <b>{this.props.data[obj].backgrounds}</b><br/></span>
                    <span>Skills  <b>{this.props.data[obj].skills}</b><br/></span>
                    <span>Selection Process  <b>{this.props.data[obj].selection_process}</b><br/></span>
                    <span>Salary  <b>{this.props.data[obj].salary}</b><br/></span>
                    <span>City  <b>{this.props.data[obj].role_info}</b><br/></span>
                  </div>
                </div>
              </div>
                </span>
                
            }
            return cardsContent;
          }
          else {
              return <span></span>
          }
          
      }
      render() {
        let pageCards = this.createCards(this.props.data);
        return (
          <div className={"cards-div"}>             
            {pageCards}
            <SideBar isActive={this.state.viewSidebarActive} opprId={this.state.opprid} onCreate={this.viewHideSideBar} onDismiss={this.viewHideSideBarCancel} />
          </div>
        );
    }
}

export default OpportunitiesCards;