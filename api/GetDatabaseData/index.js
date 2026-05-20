const { CosmosClient } = require("@azure/cosmos");

// Revisa que el nombre de la variable coincida con el que pusiste en Azure
const endpoint = process.env.COSMOS_CONNECTION_STRING; 
const client = new CosmosClient(endpoint);

module.exports = async function (context, req) {
    try {
        // Pon aquí el nombre exacto de tu Base de Datos y Contenedor de Cosmos DB
        const database = client.database("SmeMasterDB");
        const container = database.container("Items");

        // Lanzamos una consulta SQL para traer todos los registros
        const { resources: items } = await container.items
            .query("SELECT * FROM c")
            .fetchAll();

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: items
        };
    } catch (error) {
        context.log.error("Error en Cosmos DB:", error);
        context.res = {
            status: 500,
            body: { error: "No se pudieron recuperar los datos de Cosmos DB." }
        };
    }
};