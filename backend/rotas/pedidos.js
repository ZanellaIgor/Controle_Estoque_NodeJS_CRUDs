const express =require('express');
const routerDocumentos = express.Router();
const {pool}= require('../conexao/db');

const dbPedidos = [
    {"id":1, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":2530.55},
    {"id":2, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":1580},
    {"id":3, "idPessoa":5, "tipo":"S", "Pedro":"Roberval", "valorTotal":800}
]

routerDocumentos.get('/', (req, res) =>{
    console.log('get');
    res.json(dbPedidos);
});

routerDocumentos.post('/', async (req, res) => {
    const { listaDeProdutos, dadosPedido } = req.body
    console.log(req.body)
    if (!dadosPedido.idPessoa || !dadosPedido.valorPedido || !dadosPedido.tipo) {
        return res.status(500).json({
            error: "Favor verificar os dados inseridos.",
        });
    }
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const insertQuery = `
        INSERT INTO documentos (ID_PESSOA, VALOR_TOTAL, TIPO)
        VALUES ($1, $2, $3)
        RETURNING id;`;

        const valuesDocumento = [dadosPedido.idPessoa, dadosPedido.valorPedido, dadosPedido.tipo];

        const { rows } = await pool.query(insertQuery, valuesDocumento);
        console.log('aqui')
       
        const novoDocumentoId = rows[0].id;

        for (const produto of listaDeProdutos) {
            const produtoInsertQuery = `
          INSERT INTO movimentacao (ID_PRODUTO, QUANTIDADE, VALOR_UNITARIO, VALOR_TOTAL, ID_DOC)
          VALUES ($1, $2, $3, $4, $5);`;
            const produtoValues = [
                produto.codigo,
                produto.quantidade,
                produto.valorUnitario,
                produto.valorTotal,
                novoDocumentoId,
            ];
            await client.query(produtoInsertQuery, produtoValues);
        }

        for (const produto of listaDeProdutos){
            let updateQuery=[];
            let updateValues=[produto.codigo, produto.quantidade];
            if(dadosPedido.tipo=='s'){
                updateQuery = `UPDATE PRODUTOS SET estoque = estoque - $2
                WHERE id = $1;`
            }
            if(dadosPedido.tipo=='e'){
                updateQuery = `UPDATE PRODUTOS SET estoque = estoque + $2
                WHERE id = $1;`
            }
            await client.query(updateQuery, updateValues);
        }
        await client.query('COMMIT'); // Confirmar a transação

        res.status(201).json({
            statusCode: 201,
            message: "Pedido criado com Sucesso!",
            novoDocumentoId,
        });


    } catch (error) {
        await client.query('ROLLBACK'); // Em caso de erro, desfazer a transação
        console.error('Erro ao cadastrar o pedido no banco de dados:', error);
        res.status(500).json({
          statusCode: 500,
          message: 'Erro ao criar o pedido.',
        });
      } finally {
        client.release(); // Liberar a conexão do pool
      }
});

module.exports = routerDocumentos;