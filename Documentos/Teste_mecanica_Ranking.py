import numpy as np
import pandas as pd

#Constantes
vida_player = 100
vida_monster = 100
dano_base = 10
possibilidades_respostas_testes = []

def calcula_dano(dano_base:int, resposta:dict, player:int, monster:int):
      """ Calcula o dano que o player e o monster recebem 
      dano_base: Constante que define o dano base
      resposta: Dicionario que define se o player acertou ou nao
      player: Vida do player
      monster: Vida do monster
      Retorna: (Vida do player, Vida do monster)
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

def adicao_erros(erros, vida_player, vida_monster):
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
            auxiliar.append({'player': vida_player, 'monster': vida_monster, 'n': index, 'dificuldade': vetor[index].get('dificuldade')})
            index += 1

      return auxiliar

def qualificacao(vetor, verificador = False):
      if(verificador):
            if(vetor[-1].get('acerto') == False):
                  print("ERRO VETOR[-1] COMO ACERTO FALSE")
                  return
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

def min_len_respostas(dano_base, player, monster):
      auxiliar = []
      vida_player = player
      vida_monster = monster
      dificuldade = 1
      index = 1
      while(vida_player > 0 and vida_monster > 0):
            vida_player, vida_monster = calcula_dano(dano_base, {'acerto': True, 'dificuldade': dificuldade}, vida_player, vida_monster)
            auxiliar.append({'player': vida_player, 'monster': vida_monster, 'n': index, 'dificuldade': dificuldade})
            dificuldade += 1
            index += 1
            if(dificuldade>= 10):
                  dificuldade = 10
      return auxiliar

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

for i in possibilidades_respostas_testes:
      print(len(i))