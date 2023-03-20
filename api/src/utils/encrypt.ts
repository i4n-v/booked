import bcrypt from 'bcrypt';

class Encrypt {
  async hash(value: string, saltRounds = 10) {
    const encryptedValues: string[] = await new Promise((resolve) => {
      bcrypt.genSalt(saltRounds).then((salt) => {
        bcrypt.hash(value, salt).then((hash) => {
          resolve([hash, salt]);
        });
      });
    });

    return encryptedValues;
  }
}

const encrypt = new Encrypt();

export default encrypt;
