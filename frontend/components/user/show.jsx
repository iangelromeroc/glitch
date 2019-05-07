import React from "react";
import LogoIcon from "../nav/logo_icon";
import {Link, Route} from "react-router-dom";
import VideoIndex from "./videoindex";
import UserBar from "./userbar";
import Description from "./description";

class UserShow extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchUser();
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.username !== prevProps.match.params.username){
      this.props.fetchUser();
    }
  }
  render(){
    if(this.props.notFound) return (
      <div className="not-found">
        <LogoIcon className="not-found-icon" />
        <div>
          Sorry. Unless you’ve got a time machine, that content is unavailable.
          <Link to="/directory">Browse channels</Link>
        </div>
      </div>
    )
    if(!this.props.user) return (
      <div className="loading"></div>
    );
    return (<div className="user-show">
              <UserBar user={this.props.user} currentUser={this.props.currentUser} />
              <Route path="/:username/videos" component={VideoIndex} />
              <Route exact path="/:username" render={ (props)=><Description {...props} user={this.props.user} />} />
            </div>);
  }
}
export default UserShow;