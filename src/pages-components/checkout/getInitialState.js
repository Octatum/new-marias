const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  street: '',
  suburb: '',
  city: '',
  country: '',
  state: '',
  zipCode: '',
  phone: '',
};

function getInitialState() {
  return { ...initialState };
}

export default getInitialState;
