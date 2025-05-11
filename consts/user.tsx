export class CurrentUser {

    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber?: string;
    passportSeries?: string;
    passportNumber?: string;
    passwoord ?: string;
    id?: string;
    savedNumbers: number[];
  
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      middleName?: string,
      phoneNumber?: string,
      passportSeries?: string,
      passportNumber?: string,
      passwoord ?: string,
      id?: string,
      savedNumbers: number[] = []
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.passportSeries = passportSeries;
      this.passportNumber = passportNumber;
      this.passwoord = passwoord;
      this.id = id;
      this.savedNumbers = savedNumbers;
    }
  
    addSavedNumber(id: number): void {
      if (!this.savedNumbers.includes(id)) {
        this.savedNumbers.push(id);
      } else {
        console.warn(`Номер с ID ${id} уже добавлен в отложенные.`);
      }
    }
  
    removeSavedNumber(id: number): void {
      const index = this.savedNumbers.indexOf(id);
      if (index !== -1) {
        this.savedNumbers.splice(index, 1);
      } else {
        console.warn(`Номер с ID ${id} не найден в отложенных.`);
      }
    }
  
    updateUserInfo(
      firstName?: string,
      lastName?: string,
      middleName?: string,
      email?: string,
      phoneNumber?: string,
      passportSeries?: string,
      passportNumber?: string,
      passwoord?: string,
      id?: string,
    ): void {
      if (firstName) this.firstName = firstName;
      if (lastName) this.lastName = lastName;
      if (middleName) this.middleName = middleName;
      if (email) this.email = email;
      if (phoneNumber) this.phoneNumber = phoneNumber;
      if (passportSeries) this.passportSeries = passportSeries;
      if (passportNumber) this.passportNumber = passportNumber;
      if (passwoord) this.passwoord = passwoord;
      if (id) this.id = id;
    }
  
    getUserInfo(): string {
      return `
        Имя: ${this.firstName}
        Фамилия: ${this.lastName}
        Отчество: ${this.middleName || 'Не указано'}
        Email: ${this.email}
        Телефон: ${this.phoneNumber || 'Не указано'}
        Паспорт: ${this.passportSeries || 'Не указано'} ${this.passportNumber || 'Не указано'}
        Отложенные номера: ${this.savedNumbers.join(', ') || 'Нет отложенных номеров'}
      `;
    }
  }
  
  export const user = new CurrentUser(
    'Иван',
    'Иванов',
    'ivan@example.com'
  );

  export const pass = ''
