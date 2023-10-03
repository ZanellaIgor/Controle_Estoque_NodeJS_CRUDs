const express = require('express');
const routerProdutos = express.Router();
const {pool}= require('../conexao/db');


routerProdutos.get('/', async function (req, res) {
    try {
        const query = 'SELECT * FROM PRODUTOS';
        const resultadoBanco = await pool.query(query);
       
        if (resultadoBanco.rows.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Nenhum produto encontrado.',
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'Lista de Produtos',
            data: resultadoBanco.rows,
        });
    } catch (error) {
        console.error('Erro ao realizar a consulta:', error);
        res.status(500).json({
            statusCode: 500,
            message: 'Erro ao realizar a consulta.',
        });
    }
});

routerProdutos.post('/', async function(req, res) {
    const { nome, referencia, valor, estoque, imagem} = req.body;
    try {
        const insertQuery = `INSERT INTO produtos (nome, referencia, valor, estoque, imagem)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;`;

        const values = [nome, referencia, valor, estoque, imagem];
        const {rows} = await pool.query(insertQuery, values);
        const novoProdutoId = rows[0].id;

        res.status(201).json({
            statusCode: 201,
            message:"Produto criado com Sucesso",
            novoProdutoId,
        })

    } catch (error) {
        console.error('Erro ao cadastrar o produto no banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o produto.",
        });
    }
});

routerProdutos.delete('/:id', async (req, res) =>{
    const {id} = req.params;
    console.log(id)
    const query = 'DELETE FROM PRODUTOS WHERE ID= $1';
    try {
        await pool.query(query , [id]) ;
        res.status(200).json({
            statusCode: 200,
            message: "Erro ao criar o produto.",
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao excluir o produto.",
        });
    }
});

// routerProdutos.get('/search', (req,res)=>{
//     console.log(`${req.query.codigo}`);
//     const filtro = req.query.codigo
//     const searchProduto = filterProdutos(filtro);
//     res.json(searchProduto);
// });

routerProdutos.get('/search', async (req, res) => {
    const { codigo, nome, referencia} = req.query;
    let query = `SELECT * FROM produtos WHERE`;
    let filtros = {id:codigo, nome, referencia}
    let values = []
    
    if (codigo == '') {
        query += `(lower(nome) LIKE '%' || $1 || '%') AND (lower(referencia) LIKE '%' || $2 || '%')`;
        values = [nome.toLocaleLowerCase(), referencia.toLocaleLowerCase()];
    }
    else {
        query += `(id = $1::int) AND (lower(nome) LIKE '%' || $2 || '%') AND (lower(referencia) LIKE '%' || $3 || '%')`;
        values = [codigo, nome.toLocaleLowerCase(), referencia.toLocaleLowerCase()];
    }
    console.log('Consulta SQL:', query);
    try {
        const result = await pool.query(query, values);
        console.log(result.rows)
        res.status(200).json({
            statusCode: 200,
            message: "Consulta realizada",
            data: result.rows
        });

    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao realizar a consulta no banco de dados",
        });
    }
});

function filterProdutos(filtro) {
    return dbProdutos.filter((produto) => {
      return produto.nome.toLowerCase().includes(filtro.toLowerCase());
    });
  }


module.exports = routerProdutos;
