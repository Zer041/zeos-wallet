
import { SessionStorage } from "./session-storage";

type SessionStorageKeys = "wallet" | "user";
type SessionStorageValues =
    | any
    | null;

export class UserApi extends SessionStorage{
    public user: any;

    public get(key: SessionStorageKeys) {
        return super.getStorage(key);
    }
    
    public set(key: SessionStorageKeys, value: SessionStorageValues) {
        super.setStorage(key, value);
    }
}