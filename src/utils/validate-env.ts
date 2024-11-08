import { cleanEnv } from "envalid";
import {str, port} from 'envalid/dist/validators'

export default cleanEnv(process.env, {
    MONGODB_CONN_STRING: str(),
    PORT:port(),
    ACCESS_TOKEN_SECRET: str(),
    REFRESH_TOKEN_SECRET: str()
})