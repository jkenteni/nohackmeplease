// missions.js
const output = document.getElementById("output");
const input = document.getElementById("input");

let currentMission = 0;
let reputation = 0;
let gameStarted = false;

document.addEventListener("click", () => {
  if (gameStarted) input.focus();
});

const missions = [
  {
    id: 0,
    title: "Infiltração no Roteador do Setor 3",
    objective: "Mapear alvos com 'nmap'",
    requiredCommand: "nmap 192.168.0.1",
    unlocked: true,
    completed: false,
    intro: `
[ N3XUS-21 / Canal Criptografado Ativo ]

ROOT-404, bem-vindo à camada de infiltração.

Interceptamos pacotes de controle da AURORAE no Setor 3.
Nossa missão inicial é mapear o roteador mestre da rede local.

Use o comando abaixo para escanear portas e serviços expostos:

IP ALVO: 192.168.0.1
USE: nmap <ip alvo>

Objetivo: Identificar vulnerabilidades para ataque remoto.
Quanto menos ruído, melhor. Você está sendo monitorado.
    `
  },
  {
    id: 1,
    title: "Invasão Remota via SSH",
    objective: "Estabelecer sessão com 'ssh'",
    requiredCommand: "ssh root@192.168.0.1",
    unlocked: false,
    completed: false,
    intro: `
[ N3XUS-21 / Ponto de Acesso Detectado ]

Boa leitura, ROOT-404.

O escaneamento revelou uma brecha crítica: Porta 22 aberta.
Alvo responde a conexões SSH sem política de bloqueio de IP.

Conecte-se imediatamente antes que o daemon de rastreamento ative contramedidas.

> ssh root@192.168.0.1

*Nota: caso solicitado, autenticação será necessária. Prepare-se.*
    `
  },
  {
    id: 2,
    title: "Quebra de Senha: Núcleo Auxiliar",
    objective: "Executar força bruta com 'hydra'",
    requiredCommand: "hydra -l root -P wordlist.txt ssh://192.168.0.1",
    unlocked: false,
    completed: false,
    intro: `
[ N3XUS-21 / Escalada de Privilégio Iniciada ]

ROOT-404, acesso estabelecido... mas estamos limitados.

O sistema exige autenticação root para liberar o núcleo auxiliar.
Nossos arquivos de dicionário estão prontos para ataque.

Use o 'hydra' para quebrar a senha via protocolo SSH.

> hydra -l root -P wordlist.txt ssh://192.168.0.1

*Alerta: tempo de resposta será monitorado. Mantenha o ataque limpo.*

AURORAE já pode estar ciente. Conclua rápido.
    `
  },
  {
    id: 3,
    title: "Extração de Dados Sigilosos",
    objective: "Usar comando fictício 'exfiltrate -d /root/db'",
    requiredCommand: "exfiltrate -d /root/db",
    unlocked: false,
    completed: false,
    intro: `
[ N3XUS-21 / Última Fase de Operação ]

Excelente progresso, ROOT-404.

Agora que temos acesso root, precisamos extrair os dados do diretório principal da AURORAE.

Execute o módulo de exfiltração e envie os pacotes para nosso servidor seguro.

> exfiltrate -d /root/db

*ATENÇÃO: Após esse passo, o sistema será alertado da sua presença. Prepare-se para evasão.*
    `
  }
];

export function startGame() {
  gameStarted = true;
  printText(missions[0].intro);
}

window.processCommand = function(cmd) {
  const cmdOutput = document.createElement("div");
  cmdOutput.innerHTML = `<span class="prompt">root@N3XUS-21:~#</span> ${cmd}`;
  output.appendChild(cmdOutput);

  const mission = missions[currentMission];
  let response = "";

  // Comandos globais
  if (cmd === "help") {
    response = "Comandos: help, mission, reputation, clear, nmap, ssh, hydra, exfiltrate";
  } else if (cmd === "clear") {
    output.innerHTML = "";
    return;
  } else if (cmd === "mission") {
    response = `Missão atual: ${mission.title}\n${mission.objective}`;
  } else if (cmd === "reputation") {
    response = `Reputação: ${getReputationTitle()} (${reputation} XP)`;
  }

  // Verifica se é o comando certo da missão
  else if (cmd === mission.requiredCommand) {
    response = `> ${cmd} executado com sucesso.\n[✔] Missão concluída: ${mission.title}`;
    mission.completed = true;
    reputation += 20;
    output.innerHTML = "";

    if (missions[currentMission + 1]) {
      missions[currentMission + 1].unlocked = true;
      currentMission++;
      setTimeout(() => printText(missions[currentMission].intro), 500);
    } else {
      response += `\n[✔] Todas as missões foram completadas. Em breve: novos alvos da AURORAE.`;
    }

  // Comando relacionado mas incompleto
  } else if (["nmap", "ssh", "hydra", "exfiltrate"].some(c => cmd.startsWith(c))) {
    response = `O comando '${cmd}' não está correto nesta etapa. Use 'mission' para revisar o objetivo atual.`;
  }

  // Comando inválido
  else {
    response = "Comando não reconhecido. Digite 'help' para ver os comandos disponíveis.";
  }

  const resOutput = document.createElement("div");
  resOutput.textContent = response;
  output.appendChild(resOutput);
  output.scrollTop = output.scrollHeight;
};

function printText(text, delay = 25) {
    const lines = text.trim().split("\n");
    let lineIndex = 0;
  
    function typeLine() {
      if (lineIndex >= lines.length) return;
  
      const lineEl = document.createElement("div");
      lineEl.style.whiteSpace = "pre"; // Mantém espaçamento dos textos
      output.appendChild(lineEl);
  
      let charIndex = 0;
      const line = lines[lineIndex];
  
      function typeChar() {
        if (charIndex < line.length) {
          lineEl.textContent += line[charIndex];
          charIndex++;
          output.scrollTop = output.scrollHeight;
          setTimeout(typeChar, delay);
        } else {
          lineIndex++;
          setTimeout(typeLine, delay); // Delay entre linhas
        }
      }
  
      typeChar();
    }
  
    typeLine();
  }
  

function getReputationTitle() {
  if (reputation >= 80) return "Veterano da Resistência";
  if (reputation >= 60) return "Operador Avançado";
  if (reputation >= 40) return "Infiltrador Digital";
  return "Recruta da Resistência";
}
