import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

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
    </Suspense>
  );
};

export default Routes;
