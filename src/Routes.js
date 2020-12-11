import React from "react";
import { Route } from "react-router-dom";
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

const Routes = ({ currentUser }) => {
  return (
    <>
      <Route path="/posts" component={() => <Posts />} />
      <Route path="/users" component={() => <Users />} />
      <Route path="/support" component={() => <Support />} />
      <Route path="/support-success" component={() => <SupportSuccess />} />
      <Route
        path="/message/:chatUser"
        component={() => <MessagesContainer currentUser={currentUser} />}
      />
      <Route
        path="/profile/:user"
        component={() => <Profile currentUser={currentUser} />}
      />
      <Route
        path="/editPost/:id"
        component={() => <EditPost currentUser={currentUser} />}
      />
      <Route
        path="/createPost"
        component={() => <PostCreate currentUser={currentUser} />}
      />
      <Route
        path="/:id"
        component={() => <PostDetail currentUser={currentUser} />}
      />
    </>
  );
};

export default Routes;
