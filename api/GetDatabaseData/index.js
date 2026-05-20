module.exports = async function (context, req) {
    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { mensaje: "Hola desde el backend Serverless de Azure", timestamp: new Date() }
    };
};