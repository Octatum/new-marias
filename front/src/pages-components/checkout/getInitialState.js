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

const testInitialState = {
  email: 'rroberto.ruiz@gmail.com',
  firstName: 'Roberto',
  lastName: 'Ruiz',
  street: 'Cerro de las mitras 235',
  suburb: 'Las puentes, 1er sector',
  city: 'San Nicolás de los Garza',
  state: 'Nuevo León',
  country: 'México',
  zipCode: '66460',
  phone: '818 499 3753',
};

function getInitialState() {
  return { ...initialState };
}

export default getInitialState;
