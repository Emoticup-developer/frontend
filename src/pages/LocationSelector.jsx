import React, { useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const LocationSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  return (
    <div className="space-y-4">
      <Select
        options={Country.getAllCountries().map((country) => ({
          label: country.name,
          value: country.isoCode,
        }))}
        onChange={handleCountryChange}
        placeholder="Select Country"
      />

      {selectedCountry && (
        <Select
          options={State.getStatesOfCountry(selectedCountry.value).map(
            (state) => ({
              label: state.name,
              value: state.isoCode,
            })
          )}
          onChange={handleStateChange}
          placeholder="Select State"
        />
      )}

      {selectedState && (
        <Select
          options={City.getCitiesOfState(
            selectedCountry.value,
            selectedState.value
          ).map((city) => ({
            label: city.name,
            value: city.name,
          }))}
          onChange={(city) => setSelectedCity(city)}
          placeholder="Select City"
        />
      )}
    </div>
  );
};

export default LocationSelector;
