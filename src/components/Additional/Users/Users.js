import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { PROFILE_LIST_QUERY } from "../../Api/profile/profile";
import MapUsers from "./MapUsers";

const Users = () => {
  const { data: users } = useQuery(PROFILE_LIST_QUERY);

  return (
    <div className="users-paginator-container">
      {users ? <MapUsers users={users} /> : null}
    </div>
  );
};

export default Users;
