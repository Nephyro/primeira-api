/* *******************************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto Estados e Cidades
* Data: 01/04/206  
* Autor: Anderson
* Versão: 1.0
* 
* Instalação do EXPRESS - npm install express --save
*       Dependencia responsável pela utilização do protocolo HTTP para
*       criar uma API
* 
* Instalação do CORS    - npm install cors --save
*       Dependencia responsável pelas configurações a serem realizadas
*       para a permissão de acesso da API
* 
* ********************************************************************************/

// Import das depedencias para criar a API
const express = require('express')
const cors = require('cors')

// Criando um objeto para manipular o express
const app = express()

// Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], //A origem da requisição, podendo um IP ou *(Todos)
    methods: 'GET', //São os verbos que serão liberados na API (GET, POST, PUT e DELET)
    allowedHeaders: ['Content-type', 'Autorization'] //São permissões de cabeçalho do CORS
}

// Configura as permissões da API atráves do CORS
app.use(cors(corsOptions))

// Response -> Retornos da API
// Request  -> São chegadas de dados na API

// Import do arquivo de funções
const estadosCidades = require('./modulo/funcoes.js')

// Criando EndPoints para a API

// Retorna dados dos estados filtrando pelo uf
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)

    if(estado){
        response.status(200)
        response.json(estado)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado!"})
    }
})

// Retorna dados da capital de cada estado filtrando pelo uf
app.get('/v1/senai/capital/estado/:uf', function (request, response){
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstado(sigla)

    if(capital){
        response.status(200)
        response.json(capital)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi reconhecido!"})
    }
})

// Retorna dados dos estados que forma capitais do Brasil
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    let capital = estadosCidades.getCapitalPais()

    response.status(200)
    response.json(capital)

})

// Retorna dados dos estados filtrando pela região
app.get('/v1/senai/estados/regiao/:regiao', function(request, response){
    let nomeRegiao = request.params.regiao
    let regiao = estadosCidades.getEstadosRegiao(nomeRegiao)

    if(regiao){
        response.status(200)
        response.json(regiao)
    }else{
        response.status(404)
        response.json({"message": "A região informada não foi encontrada"})
    }
})

// Retorna dados das cidades filtrando pelo uf
app.get('/v1/senai/cidades/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)

    if(cidades){
        response.status(200)
        response.json(cidades)
    }else{
        response.status(404)
        response.json({"message": "Cidades não encontradas desse estado!"})
    }
})

// Retorna dados dos estados
app.get('/v1/senai/estados', function(request, response){

    // Chama a função que retorna a lita de estados
    let estados = estadosCidades.getListaDeEstados()

    response.status(200)
    response.json(estados)
})

app.get('/v1/senai/help', function(request, response){
    let docAPI = {
        "API-description": "API para manipular dados de Estados e Cidades",
        "Date": "2026-04-02",
        "Developer": "Anderson",
        "Version": "1.0",
        "Endpoints": [
            {   "id": 1,
                "Rota 1": "/v1/senai/estados",
                "obs": "Retorna a lista de todos os estado"
            },
            {   "id": 2,
                "Rota 2": "/v1/senai/dados/estado/sp",
                "obs": "Retorna os dados do estado filtrando pela sigla do estado"
            },
            {   "id": 3,
                "Rota 3": "/v1/senai/capital/estado/sp",
                "obs": "Retorna os dados da capital filtrando pela sigla do estado"
            },
            {   "id": 4,
                "Rota 4": "/v1/senai/estados/capital/brasil",
                "obs": "Retorna todos os estados que formaram capital do Brasil"
            },
            {   "id": 5,
                "Rota 5": "/v1/senai/estados/regiao/sul",
                "obs": "Retorna todos os estados referentes a uma região"
            },
            {   "id": 6,
                "Rota 6": "/v1/senai/cidades/estado/sp",
                "obs": "Retorna todos as cidades filtrando pela sigla do estado"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

// Serve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições...')
})