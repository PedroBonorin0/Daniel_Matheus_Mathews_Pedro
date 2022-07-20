/* eslint-disable max-len */
/*
conteudo: [{id: 1, nome: 'Variáveis, Constantes e Atribuições.'},],
conteudo: [{id: 2, nome: 'Entrada e Saída de Dados.'},],
conteudo: [{id: 3, nome: 'Operadores aritméticos.'},],
conteudo: [{id: 4, nome: 'Operadores Lógicos e Comandos Condicionais.'},],
conteudo: [{id: 5, nome: 'Comandos de Repetição.'},],
conteudo: [{id: 6, nome: 'Funções.'},],
conteudo: [{id: 7, nome: 'Vetores.'},],
conteudo: [{id: 8, nome: 'Algoritmos de Ordenação.'},],
conteudo: [{id: 9, nome: 'Algoritmos de Busca.'},],
conteudo: [{id: 10, nome: 'Matrizes.'},],
conteudo: [{id: 11, nome: 'Ponteiros e Alocação Dinâmica de Memória.'},],
conteudo: [{id: 12, nome: 'Recursão.'},],
conteudo: [{id: 13, nome: 'Estruturas.'},],
conteudo: [{id: 14, nome: 'Noções de algoritmos.'},],
*/

import axios from 'axios';

export default {
  state() {
    return {
      desafios: [],
      desafiosLoaded: false,
    };
  },
  mutations: {
    armazenaDesafios(state, payload) {
      state.desafios = payload;
      state.desafiosLoaded = true;
    },
  },
  actions: {
    async setDesafios(context) {
      try {
        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/desafios.json');

        context.commit('armazenaDesafios', Object.values(res.data));
      } catch (err) {
        throw new Error(err.message || 'Failed to fetch Desafio');
      }
    },
    async createNewDesafio(context, payload) {
      try {
        const res = await axios.post('https://coding-fight-default-rtdb.firebaseio.com/desafios.json', payload);

        const newDesafio = {
          ...payload,
          id: res.data.name,
        };

        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/desafios/${res.data.name}.json`, newDesafio);

        context.dispatch('setDesafios');
      } catch (err) {
        throw new Error(err.message || 'Failed to create Desafio');
      }
    },
    async updateDesafio(context, payload) {
      try {
        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/desafios/${payload.id}.json`, payload);
        context.dispatch('setDesafios');
      } catch (err) {
        throw new Error(err.message || 'Failed to update Desafios');
      }
    },
    async deleteDesafio(context, payload) {
      console.log(payload);
      try {
        await axios.delete(`https://coding-fight-default-rtdb.firebaseio.com/desafios/${payload}.json`);
        context.dispatch('setDesafios');
      } catch (err) {
        throw new Error(err.message || 'Failed to delete Desafios');
      }
    },
  },
  getters: {
    desafios(state) {
      return state.desafios;
    },
    desafiosLoaded(state) {
      return state.desafiosLoaded;
    },
  },
};

// {
// id: 1,
// dificuldade: 1,
// conteudo: [{ id: 7, nome: 'Vetores.' }],
// pergunta: `Precisamos criar um vetor (array unidimensional) para armazenar 15 valores numéricos relativos aos salários de funcionários de uma empresa.
// Qual das seguintes instruções deve ser empregada para esse fim em um algoritmo?`,
// opcoesResposta: [
//   { id: 1, resposta: 'salarios : vetor [0..15] de real' },
//   { id: 2, resposta: 'salarios : vetor [1..15] de numeros' },
//   { id: 3, resposta: 'salarios : vetor [0..14] de inteiro' },
//   { id: 4, resposta: 'salarios : vetor [0..14] de real' }],
// respostaCorreta: 1,
// dica: [
//   { id: 1, dica: 'Lembre-se que a posição de um item no vetor começa a ser contada pelo número 0.' },
//   { id: 2, dica: 'Atente-se ao fato de que o salário de um funcionário pode ter casas decimais.' }],
// },
// {
// id: 2,
// dificuldade: 1,
// conteudo: [{ id: 1, nome: 'Variáveis, Constantes e Atribuições.' }],
// pergunta: 'Qual dos itens a seguir apresenta apenas nomes de variáveis que são válidos?',
// opcoesResposta: [
//   { id: 1, resposta: 'nome Aluno, nota2, CEP, RuaNumero' },
//   { id: 2, resposta: 'nomeAluno, 2nota, CEP, RuAnUmErO' },
//   { id: 3, resposta: 'nomeAluno, nota2, CEP, RuAnUmErO' },
//   { id: 4, resposta: 'nomeAluno, nota2, CEP, Rua&Número' }],
// respostaCorreta: 3,
// dica: [
//   { id: 1, dica: 'Lembre-se que nomes de variáveis não devem começar com número.' },
//   { id: 2, dica: 'Lembre-se que nomes de variáveis não devem ser separados por espaço.' },
//   { id: 3, dica: 'Lembre-se que nomes de variáveis não devem conter símbolos especiais e acentos.' }],
// },
// {
// id: 3,
// dificuldade: 1,
// conteudo: [{ id: 4, nome: 'Operadores Lógicos e Comandos Condicionais.' }],
// pergunta: 'Qual a diferença entre os operadores lógicos E (AND) e OU (OR)?',
// opcoesResposta: [
//   {
//     id: 1, resposta: `O operador AND retorna verdadeiro somente se todas as expressões de entrada forem verdadeiras,
//   ao passo que o operador OR retorna verdadeiro se pelo menos uma das expressões de entrada for verdadeira`,
//   },
//   {
//     id: 2, resposta: `O operador AND retorna falso somente se todas as expressões de entrada forem verdadeiras,
//   ao passo que o operador OR retorna falso se pelo menos uma das expressões de entrada for verdadeira`,
//   },
//   {
//     id: 3, resposta: `O operador OR retorna verdadeiro somente se todas as expressões de entrada forem verdadeiras,
//   ao passo que o operador AND retorna verdadeiro se pelo menos uma das expressões de entrada for verdadeira`,
//   },
//   {
//     id: 4, resposta: `O operador OR retorna verdadeiro somente se todas as expressões de entrada forem falsas,
//   ao passo que o operador AND retorna verdadeiro se pelo menos uma das expressões de entrada for verdadeira`,
//   }],
// respostaCorreta: 1,
// dica: [
//   { id: 1, dica: 'Se a expressão X é verdadeira e a expressão Y é verdadeira, então X AND Y retorna verdadeiro.' },
//   { id: 2, dica: 'Se a expressão X é verdadeira e a expressão Y é falsa (ou vice-versa), então X AND Y retorna falso.' },
//   { id: 3, dica: 'Se a expressão X é falsa e a expressão Y é falsa, então X AND Y retorna falso.' },
//   { id: 4, dica: 'Se a expressão X é verdadeira e a expressão Y é verdadeira, então X OR Y retorna verdadeiro.' },
//   { id: 5, dica: 'Se a expressão X é verdadeira e a expressão Y é falsa (ou vice-versa), então X AND Y retorna verdadeiro.' },
//   { id: 6, dica: 'Se a expressão X é falsa e a expressão Y é falsa, então X OR Y retorna falso.' }],
// },
// {
// id: 4,
// dificuldade: 1,
// conteudo: [{ id: 7, nome: 'Vetores.' }],
// pergunta: 'Qual das seguintes afirmações sobre arrays (vetores) é verdadeira?',
// opcoesResposta: [
//   { id: 1, resposta: 'Um array é uma estrutura que pode armazenar uma série de elementos de dados de mesmo tipo.' },
//   { id: 2, resposta: 'Podemos acessar os elementos individuais de uma array por meio de uma posição de índice, começando em A.' },
//   { id: 3, resposta: 'Um array é uma estrutura que pode armazenar uma série de elementos de dados de tipos diferentes.' },
//   { id: 4, resposta: 'Podemos acessar todos os elementos individuais de uma array por meio de uma posição de índice, começando em 1.' }],
// respostaCorreta: 1,
// dica: [
//   { id: 1, dica: 'Em arrays, posições são numeradas a partir de 0.' },
//   { id: 2, dica: 'Em algoritmos, arrays só podem armazenar elementos do mesmo tipo.' }],
// },
// {
// id: 5,
// dificuldade: 1,
// conteudo: [{ id: 5, nome: 'Comandos de Repetição.' }],
// pergunta: 'Como funciona um laço while?',
// opcoesResposta: [
//   { id: 1, resposta: 'Um laço while repete o bloco de código associado enquanto um teste lógico realizado retornar falso.' },
//   { id: 2, resposta: 'Um laço while repete o bloco de código associado um número de vezes específico, determinado em sua declaração.' },
//   { id: 3, resposta: 'Um laço while não repete o bloco de código associado enquanto um teste lógico realizado retornar verdadeiro.' },
//   { id: 4, resposta: 'Um laço while repete o bloco de código associado enquanto um teste lógico realizado retornar verdadeiro.' }],
// respostaCorreta: 4,
// dica: [
//   { id: 1, dica: 'O laço while só é executado enquanto a condição se manter verdadeira.' },
//   { id: 2, dica: 'Lembre-se que o laço while e o laço for funcionamentos diferentes, não os confunda!' }],
// },
// {
// id: 6,
// dificuldade: 1,
// conteudo: [{ id: 3, nome: 'Operadores aritméticos.' }],
// pergunta: 'Qual dos seguintes é um operador de concatenação de strings válido?',
// opcoesResposta: [
//   { id: 1, resposta: '+' },
//   { id: 2, resposta: '*' },
//   { id: 3, resposta: '->' },
//   { id: 4, resposta: ';' }],
// respostaCorreta: 1,
// dica: [{ id: 1, dica: 'Concatenação é a operação que união duas ou mais strings. Por fim, tem-se uma string seguida da outra. ' }],
// },
// {
// id: 7,
// dificuldade: 1,
// conteudo: [{ id: 4, nome: 'Operadores Lógicos e Comandos Condicionais.' }],
// pergunta: 'Qual dos seguintes itens possui apenas tipos válidos usados em lógica de programação (tipos primitivos)?',
// opcoesResposta: [
//   { id: 1, resposta: 'Inteiro, Temporal, Caractere, Double' },
//   { id: 2, resposta: 'Inteiro, Booleano, Tipografia, Double' },
//   { id: 3, resposta: 'Inteiro, Booleano, Caractere, Double' },
//   { id: 4, resposta: 'Temporal, Triple, Caractere, Double' }],
// respostaCorreta: 3,
// dica: [{ id: 1, dica: 'Lembre-se dos nomes dos tipos de variáveis em inglês.' }],
// },
// {
// id: 8,
// dificuldade: 1,
// conteudo: [{ id: 4, nome: 'Operadores Lógicos e Comandos Condicionais.' }],
// pergunta: 'Quais são os estados possíveis que um tipo lógico pode assumir?',
// opcoesResposta: [
//   { id: 1, resposta: 'Verdadeiro, Duvidoso' },
//   { id: 2, resposta: 'Falso, Duvidoso, Verdadeiro' },
//   { id: 3, resposta: 'Incerto, Certo' },
//   { id: 4, resposta: 'Verdadeiro, Falso' }],
// respostaCorreta: 4,
// dica: [{ id: 1, dica: 'Associando com condicionais, que tipo de valores uma condição "IF" pode retornar?' }],
// },
// {
// id: 9,
// dificuldade: 2,
// conteudo: [{ id: 14, nome: 'Noções de algoritmos.' }],
// pergunta: 'Como podemos definir um Algoritmo?',
// opcoesResposta: [
//   { id: 1, resposta: 'Sequência de comandos ordenados, infinitos e ambíguos que são empregados para executar uma tarefa.' },
//   { id: 2, resposta: 'Sequência de instruções ordenadas, finitas e não-ambíguas que são empregadas para executar uma tarefa.' },
//   { id: 3, resposta: 'Sequência de instruções ordenadas, infinitas e não-ambíguas que são empregadas para executar uma tarefa.' },
//   { id: 4, resposta: 'Sequência de comandos ordenados, infinitos e não-ambíguos que são empregados para executar uma tarefa.' }],
// respostaCorreta: 2,
// dica: [
//   { id: 1, dica: 'Algorítmos não podem ser ambíguos.' },
//   {
//     id: 2, dica: `Os algorítmos funcionam como uma "receita de bolo" para o problema que se deseja resolver.
//   Dessa forma, assim como em receitas culinárias, os algorítmos também se comportam como uma lista ordenada de instruções.`,
//   }],
// },
// {
// id: 10,
// dificuldade: 2,
// conteudo: [{ id: 5, nome: 'Comandos de Repetição.' }],
// pergunta: `Um trecho de código dentro de um algoritmo precisa ser repetido exatamente 62 vezes em sequência.
// Qual das estruturas a seguir é a mais indicada para realizar essa tarefa?`,
// opcoesResposta: [
//   { id: 1, resposta: 'enquanto' },
//   { id: 2, resposta: 'para' },
//   { id: 3, resposta: 'array' },
//   { id: 4, resposta: 'se / então' }],
// respostaCorreta: 2,
// dica: [{
//   id: 1, dica: `Em programação, códigos que precisam ser repetidos geralmente são executados em laços de repetição.
//   Por exemplo, PARA encontrar x^n, multiplicaremos x por x n vezes.`,
// }],
// },
// {
// id: 11,
// dificuldade: 2,
// conteudo: [{ id: 7, nome: 'Vetores.' }],
// pergunta: 'Quais são os tipos de arrays que podemos empregar na criação de algoritmos?',
// opcoesResposta: [
//   { id: 1, resposta: 'Unidimensional (vetor), Bidimensional (matriz), Tridimensional (cubo)' },
//   { id: 2, resposta: 'Unidimensional (linha), Bidimensional (vetor), Tridimensional (cubo)' },
//   { id: 3, resposta: 'Unidimensional (vetor), Bidimensional (quadrado), Tridimensional (esfera)' },
//   { id: 4, resposta: 'Unidimensional (ponto), Bidimensional (matriz), Tridimensional (campo)' }],
// respostaCorreta: 1,
// dica: [{ id: 1, dica: 'Um array tridimensional é um array composto de matrizes que são compostas de matrizes.' }],
// },
// {
// id: 12,
// dificuldade: 2,
// conteudo: [{ id: 3, nome: 'Operadores aritméticos.' }],
// pergunta: 'Para que serve o operador aritmético de módulo %?',
// opcoesResposta: [
//   { id: 1, resposta: 'Calcular porcentagens' },
//   { id: 2, resposta: 'Realizar cálculos aritméticos de investimentos' },
//   { id: 3, resposta: 'Retornar o módulo matemático (valor absoluto)' },
//   { id: 4, resposta: 'Calcular o resto de uma divisão inteira' }],
// respostaCorreta: 4,
// dica: [{ id: 1, dica: 'Um exemplo de operação com esse operador é: 13 % 2 = 1.' }],
// },
// {
// id: 13,
// dificuldade: 3,
// conteudo: [{ id: 1, nome: 'Variáveis, Constantes e Atribuições.' }],
// pergunta: 'Qual dos itens a seguir pode ser representado por um valor constante?',
// opcoesResposta: [
//   { id: 1, resposta: 'Salário de um Funcionário' },
//   { id: 2, resposta: 'Valor da Temperatura no Verão' },
//   { id: 3, resposta: 'Distância da Terra ao Sol' },
//   { id: 4, resposta: 'Valor de Pi' }],
// respostaCorreta: 4,
// dica: [{
//   id: 1, dica: `Não confunda valor constante com valor real.
//   Considere como valor constante os valores que não podem ser alterados durante a execução do programa.`,
// }],
// },
// {
// id: 14,
// dificuldade: 3,
// conteudo: [{ id: 1, nome: 'Variáveis, Constantes e Atribuições.' }],
// pergunta: 'O que é uma Variável?',
// opcoesResposta: [
//   { id: 1, resposta: 'Local na memória CMOS do computador empregado para armazenar de forma temporária os dados que são utilizados pelo programa.' },
//   { id: 2, resposta: 'Valor que varia conforme passa o tempo, sendo sempre modificado conforme o programa vai sendo executado.' },
//   { id: 3, resposta: 'Local na memória RAM do computador utilizado para armazenar temporariamente dados que são utilizados pelo programa.' },
//   { id: 4, resposta: 'Valor armazenado em locais variáveis no computador, como HD, RAM ou Memória Cache.' }],
// respostaCorreta: 3,
// dica: [{ id: 1, dica: 'Em C, as variáveis declaradas só existem durante a execução do programa.' }],
// },
// {
// id: 15,
// dificuldade: 3,
// conteudo: [{ id: 8, nome: 'Algoritmos de Ordenação.' }],
// pergunta: 'É possível ordenar valores numéricos já armazenados em um vetor de números decimais?',
// opcoesResposta: [
//   { id: 1, resposta: 'Não, somente é possível ter valores em ordem se os valores forem inseridos em ordem' },
//   { id: 2, resposta: 'Sim, mas para isso é necessário usar um algoritmo para ordenação de vetores' },
//   { id: 3, resposta: 'Sim, mas somente se os números forem inteiros. Números decimais não podem ser ordenados' },
//   { id: 4, resposta: 'Não, não é possível ordenar valores já armazenados em um vetor em nenhuma hipótese' }],
// respostaCorreta: 2,
// dica: [
//   {
//     id: 1, dica: `Pode-se ordenar os valores armazenados em um vetor (array), em ordem alfabética ou numérica.
//   A ordenação de um array é muito importante em vários contextos dentro de programação, como por exemplo para
//   permitir a realização de pesquisa de valores com eficiência dentro de um vetor de tamanho grande.`,
//   }],
// },
// {
// id: 16,
// dificuldade: 3,
// conteudo: [{ id: 14, nome: 'Noções de algoritmos.' }],
// pergunta: 'O que é Compilação?',
// opcoesResposta: [
//   { id: 1, resposta: 'Comandos contidos no código-fonte são executados à medida em que são traduzidos, sendo necessária a interpretação toda vez que se quiser rodar o programa.' },
//   { id: 2, resposta: 'Tradução do código-fonte em um ou mais arquivos que podem ser armazenados e executados quantas vezes se desejar, sem necessitar de nova compilação.' },
//   { id: 3, resposta: 'Junção de comandos do código-fonte em um arquivo empacotado para distribuição por um meio específico para instalação do programa.' },
//   { id: 4, resposta: 'Execução das instruções contidas em um script contendo o código-fonte, de forma sequencial.' }],
// respostaCorreta: 2,
// dica: [
//   {
//     id: 1, dica: `Um compilador é um programa de computador que, a partir de um código fonte escrito em uma linguagem compilada,
//   cria um programa semanticamente equivalente, porém escrito em outra linguagem, código objeto.
//   Classicamente, um compilador interpreta um programa de uma linguagem textual`,
//   }],
// },
// {
// id: 17,
// dificuldade: 3,
// conteudo: [{ id: 3, nome: 'Operadores aritméticos.' }],
// pergunta: 'Qual a ordem correta de precedência em um algoritmo?',
// opcoesResposta: [
//   { id: 1, resposta: '1º Multiplicação/Divisão, 2º Parêntesis, 3º Adição/Subtração, 4º Expoente' },
//   { id: 2, resposta: '1º Parêntesis, 2ºExpoente, 3º Multiplicação/Divisão, 4º Adição/Subtração' },
//   { id: 3, resposta: '1º Expoente, 2º Parêntesis, 3º Adição/Subtração, 4º Multiplicação/Divisão' },
//   { id: 4, resposta: '1º Expoente, 2º Multiplicação/Divisão, 3º Parêntesis, 4º Adição/Subração' }],
// respostaCorreta: 2,
// dica: [
//   { id: 1, dica: 'Tente se lembrar da ordem que você já conhece de precedência em operações matemáticas.' }],
// },
