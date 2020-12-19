import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  EditPost,
  MessagesContainer,
  PostCreate,
  PostDetail,
  Posts,
  Profile,
  Support,
  SupportSuccess,
  Users,
} from "./components";

const Routes = () => {
  return (
    <Switch>
      <Route path="/posts" component={() => <Posts />} />
      <Route path="/users" component={() => <Users />} />
      <Route path="/support" component={() => <Support />} />
      <Route path="/support-success" component={() => <SupportSuccess />} />
      <Route
        path="/message/:chatUser"
        component={() => <MessagesContainer />}
      />
      <Route path="/profile/:user" component={() => <Profile />} />
      <Route path="/editPost/:id" component={() => <EditPost />} />
      <Route path="/createPost" component={() => <PostCreate />} />
      <Route path="/:id" component={() => <PostDetail />} />
    </Switch>
  );
};

export default Routes;
