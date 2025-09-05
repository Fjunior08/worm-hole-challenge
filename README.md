# 🐛 Desafio da Minhoca no Buraco

Uma simulação interativa e animada de uma minhoca tentando sair de um buraco, desenvolvida com **Next.js**, **React**, **TypeScript** e **Clean Architecture**.

## 🎯 Sobre o Projeto

Este projeto resolve um desafio clássico de programação de forma moderna e visual. A minhoca tenta sair de um buraco subindo uma certa distância a cada tentativa, mas sempre cai uma distância menor, criando um problema matemático interessante que é resolvido através de simulação interativa.

### ✨ Funcionalidades

- **🎮 Simulação Interativa**: Visualização em tempo real da minhoca se movendo
- **⚙️ Configuração Personalizada**: Ajuste todos os parâmetros (profundidade, subida, queda, pausa)
- **🎨 Animações Fluidas**: Minhoca animada com transições suaves
- **📊 Alertas Visuais**: Quadro amarelo na metade, verde ao sair
- **📱 Totalmente Responsivo**: Funciona perfeitamente em mobile e desktop
- **📈 Barra de Progresso**: Acompanhamento visual do progresso
- **🔢 Contador de Tentativas**: Cálculo preciso das tentativas necessárias

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, garantindo código limpo, testável e escalável:

```
src/
├── domain/              # Regras de negócio e entidades
│   ├── entities/        # Worm, Hole, SimulationResult
│   └── repositories/    # Interfaces de repositório
├── application/         # Casos de uso
│   └── use-cases/      # SimulateWormMovement
├── infrastructure/      # Implementações concretas
│   └── repositories/   # WormSimulationRepository
├── shared/             # Tipos e utilitários compartilhados
├── components/         # Componentes React reutilizáveis
└── app/               # Páginas Next.js
```

### 🎨 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface com hooks
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS para design responsivo
- **Clean Architecture** - Organização escalável do código

## 🚀 Como Executar

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:3000
```

## 📋 Requisitos Atendidos

### ✅ **Requisito 1**: Simulação Básica
- Minhoca em buraco de 20cm de profundidade
- Sobe 5cm por vez e cai 3cm
- Pausa 1 segundo a cada queda
- Quadro amarelo quando chega na metade
- Quadro verde quando sai do buraco
- Contador de tentativas necessárias

### ✅ **Requisito 2**: Configuração Personalizada
- Interface para configurar profundidade do buraco
- Interface para configurar distância de subida
- Interface para configurar distância de queda
- Interface para configurar tempo de pausa

## 🎮 Como Usar

1. **Configure os parâmetros** na seção "Configurações do Buraco"
2. **Clique em "Iniciar Simulação"** para começar
3. **Acompanhe a animação** da minhoca em tempo real
4. **Veja os alertas** quando ela chegar na metade e sair
5. **Analise os resultados** detalhados da simulação

### 📊 Exemplo de Resultado

**Configuração padrão:** 20cm profundidade, sobe 5cm, cai 3cm, pausa 1s  
**Resultado esperado:** 9 tentativas para sair, chega na metade na 5ª tentativa

## 🎯 Destaques Técnicos

- **Performance Otimizada**: Uso de `useMemo` para evitar recriações desnecessárias
- **Animações Suaves**: Transições CSS com `transition-all duration-1000`
- **Responsividade Completa**: Design mobile-first com Tailwind CSS
- **Código Limpo**: Separação clara de responsabilidades
- **TypeScript**: Tipagem completa para maior segurança
- **Arquitetura Escalável**: Fácil de manter e expandir

---

## 👨‍💻 Sobre o Desenvolvedor

### 💻 **Francisco - Desenvolvedor Full Stack**

Olá! Sou Francisco, um desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência criando soluções robustas e inovadoras. 

#### 🚀 **Especialização Técnica**
- **Node.js & TypeScript** - Minha paixão principal
- **React.js** - Interfaces modernas e responsivas
- **Arquitetura Escalável** - Microsserviços e DDD
- **Cloud & DevOps** - AWS, Docker, CI/CD
- **Clean Architecture** - Código limpo e testável

#### 🏆 **Destaque Profissional**
Liderança no desenvolvimento de um **e-commerce B2B** totalmente customizado e escalável:
- **93+ mil produtos** catalogados
- **R$ 4+ milhões** de faturamento mensal
- Arquitetura robusta para alta demanda

#### 🎯 **Perfil Hands-on**
Sempre focado em resolver problemas complexos e entregar soluções que geram impacto real nos negócios. Adoro aprender e aplicar novas tecnologias para criar produtos excepcionais.

*"A tecnologia é melhor quando une pessoas e resolve problemas reais."* - Francisco