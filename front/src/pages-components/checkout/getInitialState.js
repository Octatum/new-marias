const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  street: '',
  suburb: '',
  city: '',
  country: 'México',
  state: 'Nuevo León',
  zipCode: '',
  phone: '',
};

function getInitialState() {
  return { ...initialState };
}

export default getInitialState;
