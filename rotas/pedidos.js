const express = require('express');
const routerDocumentos = express.Router();
const { pool } = require('../conexao/db');
const { format } = require('date-fns');

routerDocumentos.get('/', async (req, res) => {
  try {
    const query = `SELECT DOC.*, PES.NOME as cliente, PES.CIDADE,PES.ESTADO FROM DOCUMENTOS DOC 
        INNER JOIN PESSOAS PES ON PES.ID=DOC.ID_PESSOA`;
    const resultadoBanco = await pool.query(query);
    if (resultadoBanco.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Nenhum Cliente encontrado.',
      });
    }
    const dadosFormatados = resultadoBanco.rows.map((row) => ({
      ...row,
      data_emissao: format(new Date(row.data_emissao), 'dd/MM/yyyy'),
    }));
    res.status(200).json({
      statusCode: 200,
      message: 'Lista de Pedidos',
      data: dadosFormatados,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Erro ao realizar a consulta.',
    });
  }
});

routerDocumentos.get('/search?', async (req, res) => {
  try {
    const { cliente = '', dataIni, dataFin } = req.query;
    let query = `
        SELECT DOC.*, PES.NOME as cliente, PES.CIDADE,PES.ESTADO FROM DOCUMENTOS DOC 
        INNER JOIN PESSOAS PES ON PES.ID=DOC.ID_PESSOA WHERE PES.NOME ilike '%'|| $1 || '%'`;
    let values = [cliente];
    if (dataIni && dataFin) {
      query += ` AND DOC.DATA_EMISSAO between $2 and $3`;
      values = [cliente, dataIni, dataFin];
    }
    console.log(values);
    console.log(query);
    const resultadoBanco = await pool.query(query, values);
    if (resultadoBanco.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Nenhum Pedido encontrado.',
      });
    }
    const dadosFormatados = resultadoBanco.rows.map((row) => ({
      ...row,
      data_emissao: format(new Date(row.data_emissao), 'dd/MM/yyyy'),
    }));

    res.status(200).json({
      statusCode: 200,
      message: 'Pedidos encontrados',
      data: dadosFormatados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Erro ao realizar a consulta.',
    });
  }
});

routerDocumentos.post('/', async (req, res) => {
  const { listaDeProdutos, dadosPedido } = req.body;
  const dataAtual = new Date();
  const dataFormatada = format(dataAtual, 'yyyy-MM-dd');
  if (!dadosPedido.idPessoa || !dadosPedido.valorPedido || !dadosPedido.tipo) {
    return res.status(500).json({
      error: 'Favor verificar os dados inseridos.',
    });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insertQuery = `
        INSERT INTO documentos (ID_PESSOA, VALOR_TOTAL, TIPO, DATA_EMISSAO)
        VALUES ($1, $2, $3, $4)
        RETURNING id;`;

    const valuesDocumento = [
      dadosPedido.idPessoa,
      dadosPedido.valorPedido,
      dadosPedido.tipo,
      dataFormatada,
    ];

    const { rows } = await pool.query(insertQuery, valuesDocumento);

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

    for (const produto of listaDeProdutos) {
      let updateQuery = [];
      let updateValues = [produto.codigo, produto.quantidade];
      if (dadosPedido.tipo == 'S') {
        updateQuery = `UPDATE PRODUTOS SET estoque = estoque - $2
                WHERE id = $1;`;
      }
      if (dadosPedido.tipo == 'E') {
        updateQuery = `UPDATE PRODUTOS SET estoque = estoque + $2
                WHERE id = $1;`;
      }
      await client.query(updateQuery, updateValues);
    }
    await client.query('COMMIT'); // Confirmar a transação

    res.status(201).json({
      statusCode: 201,
      message: 'Pedido criado com Sucesso!',
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
