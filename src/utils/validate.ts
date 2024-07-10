export class Validate {
  static Email(mail: string) {
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(mail)) {
      return true;
    } else {
      return false;
    }
  }

  static Password = (value: string) => {
    return value.length >= 6;
  };

  static ConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
}
