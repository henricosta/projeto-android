const BASE_PATH = process.env.API_URL || 'http://localhost:5000';

const API = {
    GET_USUARIO: `${BASE_PATH}/api/user/:id`,
    GET_EVENTO_DETALHES: `${BASE_PATH}/api/eventos/:id/detalhes`,
    CREATE_EVENTO: `${BASE_PATH}/api/eventos/create`,
    DELETE_EVENTO: `${BASE_PATH}/api/eventos/delete`,
    UPDATE_EVENTO: `${BASE_PATH}/api/eventos/update`,
    LISTAR_EVENTOS: `${BASE_PATH}/api/eventos/list`,
    PESQUISAR_EVENTOS: `${BASE_PATH}/api/eventos/pesquisar`,
    LOGIN: `${BASE_PATH}/api/login`,
    LOGOUT: `${BASE_PATH}/api/logout`,
    CADASTRAR_USUARIO: `${BASE_PATH}/api/cadastrar`,
    PARTICIPAR_EVENTO: `${BASE_PATH}/api/participar-evento`
};

export default API;
