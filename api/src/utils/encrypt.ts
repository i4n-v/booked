import bcrypt from 'bcrypt';
class Encrypt {
  async hash(value: string) {
    const saltRounds = 10;

    const encryptedValues: string = await new Promise((resolve) => {
      bcrypt.genSalt(saltRounds as unknown as number).then((salt) => {
        bcrypt.hash(value, salt).then((hash) => {
          resolve(hash);
        });
      });
    });

    return encryptedValues;
  }

  async compare(hash: string, plain: string) {
    const isValid = await new Promise((resolve) => {
      bcrypt.compare(plain, hash).then((result) => {
        resolve(result);
      });
    });

    return isValid;
  }
}

const encrypt = new Encrypt();

export default encrypt;
