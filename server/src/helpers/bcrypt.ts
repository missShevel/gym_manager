import { hash, compare } from 'bcrypt';
import environment from 'environment';

const encrypt = (data: string) => hash(data, environment.SALT_ROUNDS);
const areEqual = (data: string, encrypted: string) => compare(data, encrypted);

export { encrypt, areEqual };
