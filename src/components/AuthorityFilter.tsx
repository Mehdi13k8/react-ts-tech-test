import React from "react";

const AuthorityFilter = ({ authorities, onSelectAuthority }) => {
  return (
    <div>
      <label htmlFor="authority">Filter by Authority: </label>
      <select id="authority" onChange={(e) => onSelectAuthority(e.target.value)}>
        <option value="">All Authorities</option>
        {authorities.map((authority) => (
          <option key={authority.id} value={authority.name}>
            {authority.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthorityFilter;
