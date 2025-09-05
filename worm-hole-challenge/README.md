# 🐛 Desafio da Minhoca no Buraco

Simulação interativa de uma minhoca tentando sair de um buraco, desenvolvido com **Next.js**, **React**, **TypeScript** e **Clean Architecture**.

## 🎯 Funcionalidades

- Simulação da minhoca com configuração personalizada
- Alertas visuais: 🟡 na metade do caminho, 🟢 ao sair
- Contador de tentativas necessárias

## 🚀 Como Executar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## 🏗️ Arquitetura

```
src/
├── domain/              # Entidades e regras de negócio
├── application/         # Casos de uso
├── infrastructure/      # Implementações concretas
├── shared/             # Tipos compartilhados
├── components/         # Componentes React
└── app/               # Páginas Next.js
```

## 📋 Requisitos Atendidos

✅ Minhoca em buraco de 20cm, sobe 5cm, cai 3cm, pausa 1s  
✅ Quadro amarelo na metade, verde ao sair  
✅ Contador de tentativas  
✅ Configuração personalizada de parâmetros  
✅ React + Next.js + TypeScript + Clean Architecture  

## 🎮 Como Usar

1. Configure os parâmetros do buraco
2. Clique em "Iniciar Simulação"
3. Aguarde os alertas e veja os resultados

**Configuração padrão:** 20cm profundidade, sobe 5cm, cai 3cm, pausa 1s  
**Resultado esperado:** 17 tentativas para sair, chega na metade na 3ª tentativa