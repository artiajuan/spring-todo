import { apiClient } from "./ApiClient";

export function retrieveHelloWorldBean() {
    return apiClient.get('/hello-world-bean');
}

export function retrieveHelloWorldBeanWithPathVariable(name, token) {
    return apiClient.get(`/hello-world/path-variable/${name}`,
        {
            headers: {
                Authorization: token
            }
        });
}
