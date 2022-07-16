import numpy as np
import pandas as pd
from datetime import datetime

#Constantes
vida_player = 100
vida_monster = 100
dano_base = 20

def calcula_pontuacao(vetor:list):
      """ Calcula a pontuacao do player (Mecanica de ranking)
      Arguments:
            vetor: <List> Vetor que contem perguntas
      Returns:
            <Int> Pontuacao do player
       """
      pontuacao = 0
      for i in vetor:
            if(i.get('acerto')):
                  pontuacao += i.get('dificuldade')
      return int(pontuacao)

def calcula_dano(dano_base:int, resposta:dict, player:int, monster:int):
      """ Calcula o dano que o player e o monster recebem 
      Arguments:
            dano_base: <Int> Constante que define o dano base
            resposta: <Dict> Dicionario que contem as informações das perguntas (se acertou, a dificuldade)
            player: <Int> Vida do player
            monster: <Int> Vida do monster
      Returns:
            <tuple[int, int]> (Vida do player, Vida do monster)
      """
      if(resposta.get('dificuldade') <= 3):##Facil
            if(resposta.get('acerto')):
                  monster -= dano_base * 0.5
            else:
                  player -= dano_base * 1.5
      elif(resposta.get('dificuldade') <= 7 and resposta.get('dificuldade') > 3):##Facil
            if(resposta.get('acerto')):
                  monster -= dano_base
            else:
                  player -= dano_base
      else:##Dificil
            if(resposta.get('acerto')):
                  monster -= dano_base * 1.5
            else:
                  player -= dano_base  * 0.5
      if(player <= 0):
            player = 0
      if(monster <= 0):
            monster = 0

      return player, monster

def adicao_erros(erros:int, vida_player:int, vida_monster:int):
      """ Adiciona erros no conjunto de respostas
      Arguments:
            erros: <Int> Numero de erros
            vida_player: <Int> Vida do player
            vida_monster: <Int> Vida do monster
      Returns:
            Dicionario com as respostas{
                  'player' : <Int> vida do player, 
                  'monster' : <Int> vidado monster, 
                  'n' : <Int> numero da pergunta, 
                  'dificuldade' : <Int> dificuldade da pergunta, 
                  'acerto' : <Bolean> verificador de acerto
                  }
      """
      vetor = []
      player = vida_player
      monster = vida_monster
      auxiliar = []
      for i in range(len(min_len_respostas(dano_base, player, monster))):
            certo = {'acerto': True, 'dificuldade': 0}
            vetor.append(certo)

      for i in range(erros):
            errado = {'acerto': False, 'dificuldade': 0}
            vetor.append(errado)

      np.random.shuffle(vetor)

      if(vetor[-1].get('acerto') == False):
            for i in vetor:
                  if(i.get('acerto') == True):
                        aux = vetor[-1] 
                        vetor[-1] = i
                        i = aux
                        break
      
      qualificacao(vetor)
                  
      index = 0
      while(vida_player > 0 and vida_monster > 0):
            if(index == len(vetor)-1):
                  # print('Adicionando mais acertos para acabar o jogo')
                  qualificacao(vetor, True)
                  # break
            vida_player, vida_monster = calcula_dano(dano_base, vetor[index] , vida_player, vida_monster)
            auxiliar.append({'player': vida_player, 'monster': vida_monster, 'n': index, 'dificuldade': vetor[index].get('dificuldade'), 'acerto': vetor[index].get('acerto')})
            index += 1

      return auxiliar

def qualificacao(vetor, verificador = False):
      """ Adiciona qualificacao ao vetor de perguntas adicionando dificuldade 
            ACERTO dificuldade + 1; 
            ERRO dificuldade - 1;
      Arguments:
            vetor: <List> Vetor que contem perguntas
            verificador: <Bolean> Verificador Para saber se o inicio do vetor já foi ranqueado
      Returns:
            <List> Vetor que contem as informações das perguntas com adição da dificuldade
      """
      if(verificador):
            if(vetor[-1].get('acerto') == False):
                  exit("ERRO VETOR[-1] COMO ACERTO FALSE")
            vetor.append({'acerto': True, 'dificuldade': vetor[-1].get('dificuldade') + 1})
      else:
            vetor[0]['dificuldade'] = 1
            for i in range(len(vetor) - 1):
                  if(vetor[i].get('acerto') == False):
                        if(vetor[i].get('dificuldade') - 1 >= 1):
                              vetor[i+1]['dificuldade'] = vetor[i].get('dificuldade') - 1
                        elif(vetor[i].get('dificuldade') - 1 == 0):
                              vetor[i+1]['dificuldade'] = 1
                  else:
                        if(vetor[i].get('dificuldade') + 1 <= 10):
                              vetor[i+1]['dificuldade'] = vetor[i].get('dificuldade') + 1
                        elif(vetor[i].get('dificuldade') + 1 == 11):
                              vetor[i+1]['dificuldade'] = 10

def min_len_respostas(dano_base:int, player:int, monster:int):
      """ Retorna o numero minimo de respostas que o player e o monster devem responder
      Arguments:
            dano_base: <Int> Constante que define o dano base
            player: <Int> Vida do player
            monster: <Int> Vida do monster
      Returns:
            <List> vetor de respostas
      """
      auxiliar = []
      vida_player = player
      vida_monster = monster
      dificuldade = 1
      index = 1
      while(vida_player > 0 and vida_monster > 0):
            vida_player, vida_monster = calcula_dano(dano_base, {'acerto': True, 'dificuldade': dificuldade}, vida_player, vida_monster)
            auxiliar.append({'player': vida_player, 'monster': vida_monster, 'n': index, 'dificuldade': dificuldade, 'acerto': True})
            dificuldade += 1
            index += 1
            if(dificuldade>= 10):
                  dificuldade = 10
      return auxiliar

data = {'Player': [], 'Monster': [], 'nº pergunta': [], 'nº acerto': [], 'nº erro': [], 'nº erros esperados': [],'Pontuação': [], 'Dsiposição': []}
Tamanho_teste = 100
for index in range(Tamanho_teste):
      possibilidades_respostas_testes = []
      possibilidades_respostas_testes.append(min_len_respostas(dano_base, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(1, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(2, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(3, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(4, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(5, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(6, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(7, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(8, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(9, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(10, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(11, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(12, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(13, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(14, vida_player, vida_monster))
      possibilidades_respostas_testes.append(adicao_erros(15, vida_player, vida_monster))

      for i in range(len(possibilidades_respostas_testes)):
            acerto = 0
            erro = 0
            disposicao_perguntas = []
            for perguntas in possibilidades_respostas_testes[i]:
                  if(perguntas['acerto'] == True):
                        acerto += 1
                  else:
                        erro += 1
            data.get('Player').append(possibilidades_respostas_testes[i][-1]['player'])
            data.get('Monster').append(possibilidades_respostas_testes[i][-1]['monster'])
            data.get('nº acerto').append(acerto)
            data.get('nº erro').append(erro)
            data.get('nº pergunta').append(len(possibilidades_respostas_testes[i]))
            data.get('nº erros esperados').append(i)
            data.get('Pontuação').append(calcula_pontuacao(possibilidades_respostas_testes[i]))
            for perguntas in possibilidades_respostas_testes[i]:
                  if(len(possibilidades_respostas_testes[i]) == len(disposicao_perguntas)):
                        disposicao_perguntas.append('FIM')
                  if(perguntas['acerto']):
                        disposicao_perguntas.append('acerto')
                  else:
                        disposicao_perguntas.append('erro')
            data.get('Dsiposição').append(disposicao_perguntas)

tabela = pd.DataFrame(data)
tabela.to_excel('Documentos/'+str(datetime.today().strftime('%H_%M %d-%m')+'Dano'+str(dano_base)+'.xlsx'), index=False)
# print(tabela)