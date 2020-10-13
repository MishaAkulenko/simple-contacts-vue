export const ERRORS = {
  emptyField: 'Поле не должно быть пустым'
};
export const ROUTER_PATHS = {
  contact: '/contact'
};
export const CONTACT_FIELDS = [{
  model: 'contactName',
  name: 'Имя',
  placeholder: 'Введите имя',
  required: true,
  type: 'text',
},{
  model: 'contactPhone',
  name: 'Телефон',
  placeholder: 'Введите телефон',
  required: true,
  type: 'number',
},{
  model: 'contactSurname',
  name: 'Фамилия',
  placeholder: 'Введите фамилию',
  required: false,
  type: 'text',
},{
  model: 'contactPatronymic',
  name: 'Отчество',
  placeholder: 'Введите отчество',
  required: false,
  type: 'text',
},{
  model: 'contactEmail',
  name: 'Email',
  placeholder: 'Введите email',
  required: false,
  type: 'email',
},{
  model: 'contactPost',
  name: 'Должность',
  placeholder: 'Введите должность',
  required: false,
  type: 'text',
}];
export const MESSAGES = {
  removeWarn: 'Точно хотите удалить?',
  undoChangesWarning: 'Точно хотите отменить изменения?',
};
