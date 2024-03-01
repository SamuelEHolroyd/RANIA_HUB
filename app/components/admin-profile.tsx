'use client';
import { useState } from 'react';
import NavBar from './admin-navbar';

const states = [
  'Select State',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const UserInfoField = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  pattern,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
}) => {
  const [valid, setValid] = useState(true);

  const handleValidation = (input: string, pattern: string | undefined) => {
    if (!pattern) return true; // If no pattern is provided, consider it valid
    const regex = new RegExp(pattern);
    return regex.test(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = handleValidation(value, pattern);
    setValid(isValid);
    onChange(e);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-bold text-black" htmlFor={id}>
        {label}
      </label>
      <input
        className={`w-full appearance-none rounded border bg-white px-3 py-2 text-black placeholder-gray-400 shadow${
          valid ? '' : ' border-red-500'
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {!valid && <p className="mt-1 text-xs text-red-500">Invalid format</p>}
    </div>
  );
};

const UserInfoDisplay = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetName: '',
    poBox: '',
    city: '',
    state: 'Select State',
    zipCode: '',
    speciality: '',
  });

  const [dataSaved, setDataSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    setDataSaved(false);
  };

  const handleSave = () => {
    const allFieldsValid = Object.values(formData).every(
      (value) => value.trim() !== '', // Ensure no field is empty
    );
    if (allFieldsValid) {
      // Save form data if all fields are valid
      setDataSaved(true);
      alert('Data saved successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Prompt user if they try to navigate away without saving
  window.onbeforeunload = function () {
    if (!dataSaved) {
      return 'Changes you made may not be saved.';
    }
  };

  return (
    <div className="flex flex-col items-center py-14">
      <div className="w-full max-w-screen-md">
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
          <UserInfoField
            label="First Name"
            id="firstName"
            placeholder="Type here"
            value={formData.firstName || ''}
            onChange={handleChange}
          />
          <UserInfoField
            label="Last Name"
            id="lastName"
            placeholder="Type here"
            value={formData.lastName || ''}
            onChange={handleChange}
          />
          <UserInfoField
            label="Email Address"
            id="email"
            type="email"
            placeholder="Type here"
            value={formData.email || ''}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <UserInfoField
            label="Phone Number"
            id="phoneNumber"
            type="tel"
            placeholder="Type here"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
          />
          <UserInfoField
            label="Street Name"
            id="streetName"
            placeholder="Type here"
            value={formData.streetName || ''}
            onChange={handleChange}
          />
          <UserInfoField
            label="P.O. Box / Apt No."
            id="poBox"
            placeholder="Type here"
            value={formData.poBox || ''}
            onChange={handleChange}
          />
          <UserInfoField
            label="City"
            id="city"
            placeholder="Type here"
            value={formData.city || ''}
            onChange={handleChange}
          />
          <div>
            <label
              className="mb-2 block text-sm font-bold text-black"
              htmlFor="state"
            >
              State
            </label>
            <select
              id="state"
              className="block w-72 rounded border bg-white px-3 py-2 text-black placeholder-gray-400 shadow focus:outline-none focus:ring"
              value={formData.state || ''}
              onChange={handleChange}
            >
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <UserInfoField
            label="Zip Code"
            id="zipCode"
            placeholder="Type here"
            value={formData.zipCode || ''}
            onChange={handleChange}
            pattern="^\d{5}(-\d{4})?$"
            type="text"
          />
          <UserInfoField
            label="Speciality"
            id="speciality"
            placeholder="Type here"
            value={formData.speciality || ''}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="btn btn-ghost my-2 border-2 border-white bg-wvu-primary-blue text-white hover:border-white hover:bg-wvu-primary-gold hover:text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  return (
    <div className="flex h-screen flex-col bg-wvu-off-white">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-64 flex-col bg-wvu-primary-blue">
          {/* Sidebar buttons */}
          <button className="btn btn-ghost mx-3 my-2 border-2 border-white text-white hover:border-white hover:bg-wvu-primary-gold hover:text-white">
            Personal Info
          </button>
          <button className="btn btn-ghost mx-3 my-2 border-2 border-white text-white hover:border-white hover:bg-wvu-primary-gold hover:text-white">
            Email
          </button>
          <div className="flex-grow"></div>
          <button className="btn btn-ghost mx-3 my-4 border-2 border-white text-white hover:border-white hover:bg-wvu-primary-gold hover:text-white">
            Log Out
          </button>
        </div>
        <div className="flex flex-1 justify-center overflow-auto">
          <UserInfoDisplay />
        </div>
      </div>
    </div>
  );
}
