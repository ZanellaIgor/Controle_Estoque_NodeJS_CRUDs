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
        INSERT INTO documentos (IDPESSOA, VALORTOTAL, TIPO)
        VALUES ($1, $2, $3)
        RETURNING id;`;

        const valuesDocumento = [dadosPedido.idPessoa, dadosPedido.valorPedido, dadosPedido.tipo];

        const { rows } = await pool.query(insertQuery, valuesDocumento);
        console.log('aqui')
        const novoPedidoId = rows[0].id;

        // Inserir lista de produtos associada ao documento
        for (const produto of listaDeProdutos) {
            const produtoInsertQuery = `
          INSERT INTO produtos (CODIGO, NOME, REFERENCIA, QUANTIDADE, VALORUNITARIO, VALORTOTAL, DOCUMENTOID)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;
            const produtoValues = [
                produto.codigo,
                produto.nome,
                produto.quantidade,
                produto.valorUnitario,
                produto.valorTotal,
                novoDocumentoId,
            ];
            await client.query(produtoInsertQuery, produtoValues);
        }

        await client.query('COMMIT'); // Confirmar a transação


        res.status(201).json({
            statusCode: 201,
            message: "Pedido criado com Sucesso!",
            novoPedidoId,
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