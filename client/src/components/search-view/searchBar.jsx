import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export default function SearchBar({ setPos, name, placeholder }) {
  //Autocomplete variables
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  //Handle select
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPos({ lat, lng });
  };

  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Autocomplete
        freeSolo
        id="search-bar"
        value={value}
        onInputChange={(e, newValue) => {
          setInputValue(newValue);
          setValue(newValue);
        }}
        onChange={(event, newValue) => {
          setAddress(newValue);
          handleSelect(newValue);
        }}
        disableClearable
        options={data.map(({ description }) => description)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={name}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
}
