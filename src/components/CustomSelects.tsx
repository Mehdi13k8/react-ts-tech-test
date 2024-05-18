import React from "react";
import Select from "react-select";
import { AuthorityType } from "../api/types";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',  // Color for the selected option
    backgroundColor: state.isSelected ? 'blue' : 'white',  // Background color for the selected option
    '&:hover': {
      backgroundColor: state.isSelected ? 'darkblue' : 'lightgray',  // Hover effect
    }
  }),
  control: (provided: any) => ({
    ...provided,
    borderColor: 'lightgray',  // Border color of the control
    '&:hover': {
      borderColor: 'gray',  // Hover effect for the control
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'gray',  // Color of the placeholder text
  })
};

const AuthoritiesSelect = ({ authorities, onSelectAuthority, selectedAuthority }) => {
  console.log(authorities);
  const options = authorities?.authorities?.map((authority) => ({
    value: authority.LocalAuthorityId,
    label: authority.Name,
  }));

  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelectAuthority(selectedOption ? selectedOption.value : null)}
      placeholder="Select Authority"
      value={selectedAuthority ? { value: selectedAuthority, label: authorities.authorities.find((authority) => authority.LocalAuthorityId === selectedAuthority)?.Name } : null}
      styles={customStyles}
    />
  );
};

const CountriesSelect = ({ countries, onSelectCountry, countrySelected }) => {
  const options = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelectCountry(selectedOption ? selectedOption.value : null)}
      placeholder="Select Country"
      value={countrySelected ? { value: countrySelected, label: countries.find((country) => country.id === countrySelected)?.name } : null}
      styles={customStyles}
    />
  );
};

export { AuthoritiesSelect, CountriesSelect };
