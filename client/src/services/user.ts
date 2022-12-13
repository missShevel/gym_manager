import { ISignInData, User } from 'domains';
import Service from './BaseService';

export default class UserService extends Service {
    private endpoint = '/users';

    async signIn(data: ISignInData) {
        try {
            const user = await this.connector.post<User>(`${this.endpoint}/sign-in`, data);

            return user.data;
        } catch (e) {
            throw new Error();
        }
    }

    async me() {
        try {
            const user = await this.connector.get<User>(`${this.endpoint}/me`);

            return user.data;
        } catch (e) {
            throw new Error();
        }
    }

    async logout() {
        try {
            const user = await this.connector.get<User>(`${this.endpoint}/logout`);

            return user.data;
        } catch (e) {
            throw new Error();
        }
    }
}
