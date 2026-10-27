require ('dotenv').config({quiet:true})

const DATABASE_URL = process.env.DATABASE_URL

const host = new URL (DATABASE_URL).host

const neonHttpEndpoint = `https//${host}/sql`

async function executarQueryNeon(querySQL, parametros) {
    try{
        const resposta = await fetch(neonHttpEndpoint,{
            method: 'POST',
            headers: {
                'Neon-Connection-String': DATABASE_URL,
                'Context-Type': 'application/json'
            },
            body:JSON.stringify({
                query: querySQL,
                params: parametros
            })
        })

        if (!resposta.ok){
            const erroTexto = await resposta.text()
            throw new Error (`Error HTTP ${resposta.status}: ${erroTexto}`)
        }
        
        const dados = await resposta.json()
        return dados.rows


    } catch(error){
        console.error("Falha ao se comunicar com o banco de dados")
        return null
    }
}

module.exports = {executarQueryNeon}