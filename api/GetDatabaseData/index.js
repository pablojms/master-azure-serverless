const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        const connectionString = process.env.COSMOS_CONNECTION_STRING;

        // 1. Control de seguridad por si falta la configuración en Azure
        if (!connectionString) {
            context.res = {
                status: 500,
                headers: { "Content-Type": "application/json" },
                body: { error: "Falta configurar la variable COSMOS_CONNECTION_STRING en Azure." }
            };
            return;
        }

        // 2. Conexión usando tus datos reales comprobados en el Data Explorer
        const client = new CosmosClient(connectionString);
        const database = client.database("SmeMasterDB");
        const container = database.container("Items");

        // 3. Consulta SQL para traer los documentos
        const { resources: items } = await container.items
            .query("SELECT * FROM c")
            .fetchAll();

        // 4. Respuesta exitosa con los datos de tu contenedor
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: items
        };

    } catch (error) {
        context.log.error("Fallo detectado en Cosmos DB:", error.message);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: { 
                error: "Error interno al leer de Cosmos DB",
                detalles: error.message 
            }
        };
    }
};