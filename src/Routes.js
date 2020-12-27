import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//Additional
const Support = lazy(() => import("./components/Additional/Support/Support"));
const SupportSuccess = lazy(() =>
  import("./components/Additional/Support/SupportSuccess")
);
const Users = lazy(() => import("./components/Additional/Users/Users"));

//Posts
const Posts = lazy(() => import("./components/Posts/Posts/Posts"));
const EditPost = lazy(() => import("./components/Posts/EditPost"));
const PostCreate = lazy(() =>
  import("./components/Posts/PostCreate/PostCreate")
);
const PostDetail = lazy(() =>
  import("./components/Posts/PostDetail/PostDetail")
);

//Profile
const MessagesContainer = lazy(() =>
  import("./components/Messages/Messages/MessagesContainer")
);
const Profile = lazy(() => import("./components/Profiles/Profile"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/posts" component={() => <Posts />} />
        <Route exact path="/support" component={() => <Support />} />
        <Route exact path="/users" component={() => <Users />} />
        <Route exact path="/createPost" component={() => <PostCreate />} />
        <Route exact path="/:id" component={() => <PostDetail />} />
        <Route exact path="/editPost/:id" component={() => <EditPost />} />
        <Route exact path="/profile/:user" component={() => <Profile />} />
        <Route
          exact
          path="/support-success"
          component={() => <SupportSuccess />}
        />
        <Route
          exact
          path="/message/:chatUser"
          component={() => <MessagesContainer />}
        />
        <Redirect to="/posts" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
