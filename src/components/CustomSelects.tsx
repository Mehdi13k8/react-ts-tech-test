import React from "react";
import Select from "react-select";
import { Authority, AuthorityType, AuthorityFilterProps, CountriesType } from "../api/types";

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

const AuthoritiesSelect = ({ authorities, onSelectAuthority, selectedAuthority }: any) => {
  console.log(authorities);
  const options = authorities?.authorities?.map((authority: AuthorityType) => ({
    value: authority.LocalAuthorityId,
    label: authority.Name,
  }));

  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelectAuthority(selectedOption ? selectedOption.value : null)}
      placeholder="Select Authority"
      value={selectedAuthority ? { value: selectedAuthority, label: authorities.authorities.find((authority: AuthorityType) => authority.LocalAuthorityId === selectedAuthority)?.Name } : null}
      isClearable
      styles={customStyles}
    />
  );
};

const CountriesSelect = ({ countries, onSelectCountry, countrySelected }: any) => {
  const options = countries.map((country: CountriesType) => ({
    value: country.id,
    label: country.name,
  }));

  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelectCountry(selectedOption ? selectedOption.value : null)}
      placeholder="Select Country"
      value={countrySelected ? { value: countrySelected, label: countries.find((country: CountriesType) => country.id === countrySelected)?.name } : null}
      isClearable
      styles={customStyles}
    />
  );
};

export { AuthoritiesSelect, CountriesSelect };
