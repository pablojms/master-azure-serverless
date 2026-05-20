const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        const connectionString = process.env.COSMOS_CONNECTION_STRING;

        // Validamos si la variable de entorno realmente existe
        if (!connectionString) {
            context.log.error("FALTA CONFIGURAR LA VARIABLE: COSMOS_CONNECTION_STRING está vacía en Environment Variables.");
            context.res = {
                status: 500,
                body: { error: "Falta la cadena de conexión en la configuración de la Function App." }
            };
            return;
        }

        // Inicializamos el cliente de forma segura dentro del flujo
        const client = new CosmosClient(connectionString);
        const database = client.database("SmeMasterDB");
        const container = database.container("Items");

        // Consultamos los elementos
        const { resources: items } = await container.items
            .query("SELECT * FROM c")
            .fetchAll();

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: items
        };

    } catch (error) {
        context.log.error("Error crítico capturado en la ejecución:", error.message);
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};