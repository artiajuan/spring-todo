import { createContext, useState , useContext} from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");


    async function login(username, password) {
        try{
            const response = await executeJwtAuthenticationService(username, password);
    
            if (response.status === 200) {
                const jwtToken = `Bearer ${response.data.token}`
                setIsAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use(
                    config => {
                        config.headers.Authorization = jwtToken;
                        return config;
                    }
                )
                return true;
            } else {
                logout()  
                return false;
            }

        } catch (error) {
            console.log(error)
            logout()
            return false;
        }
    }

    function logout(){
        setIsAuthenticated(false);
        setUsername("");
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    );
}