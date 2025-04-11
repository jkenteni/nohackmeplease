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
      title: "Infiltrar-se no roteador do Setor 3",
      objective: "Executar varredura com 'nmap'",
      requiredCommand: "nmap 192.168.0.1",
      unlocked: true,
      completed: false,
      intro: `
  [ N3XUS-21 / canal seguro estabelecido ]
  
  ROOT-404, bem-vindo ao canal subterrâneo.
  Interceptamos uma brecha nos firewalls do Setor 3.
  Use 'nmap' para escanear a rede alvo (192.168.0.1).
  
  Use: nmap <endereço IP>
  
  Objetivo: mapear portas abertas para invasão via SSH.
  `
    },
    {
      id: 1,
      title: "Acesso via SSH ao servidor vulnerável",
      objective: "Conectar com 'ssh'",
      requiredCommand: "ssh",
      unlocked: false,
      completed: false,
      intro: `
  [ N3XUS-21 / progresso detectado ]
  
  Alvo identificado. Porta 22 está vulnerável.
  Execute 'ssh' para estabelecer conexão remota com o nó comprometido.
  
  Cuidado: a IA AURORAE detecta padrões incomuns.
  Nosso tempo é limitado. Conecte-se agora.
  `
    },
    {
      id: 2,
      title: "Força bruta ao núcleo auxiliar",
      objective: "Descobrir a senha com 'hydra'",
      requiredCommand: "hydra",
      unlocked: false,
      completed: false,
      intro: `
  [ ALERTA / acesso parcial obtido ]
  
  ROOT-404, precisamos de privilégios máximos.
  O nó acessado exige autenticação para subir permissões.
  
  Use 'hydra' para executar ataque de força bruta.
  O alvo: usuário root. Palavra-chave de acesso: oculta.
  
  Protocolo de brute-force ativado.
  Prepare-se para escalada.
  `
    }
  ];
  
  

// Exporta função para script.js
export function startGame() {
  printText(missions[0].intro);
}

// Modifica processCommand para lidar com missões
window.processCommand = function(cmd) {
  const cmdOutput = document.createElement("div");
  cmdOutput.innerHTML = `<span class="prompt">root@N3XUS-21:~#</span> ${cmd}`;
  output.appendChild(cmdOutput);

  const mission = missions[currentMission];
  let response = "";

  // Comandos globais
  if (cmd === "help") {
    response = "Comandos: help, mission, reputation, clear, nmap, ssh, hydra";
  } else if (cmd === "clear") {
    output.innerHTML = "";
    return;
  } else if (cmd === "mission") {
    response = `Missão atual: ${mission.title}\n${mission.objective}`;
  } else if (cmd === "reputation") {
    response = `Reputação: ${getReputationTitle()} (${reputation} XP)`;
  } 
  // Missão correta
  else if (cmd === mission.requiredCommand) {
    response = `> ${cmd} executado com sucesso.\n[✔] Missão concluída: ${mission.title}`;
    mission.completed = true;
    reputation += 20;
    output.innerHTML = ""; // limpa a tela

    // Avança para próxima missão se existir
    if (missions[currentMission + 1]) {
      missions[currentMission + 1].unlocked = true;
      currentMission++;
      setTimeout(() => printText(missions[currentMission].intro), 500);
    } else {
      response += "\n[✔] Todas as missões atuais foram concluídas. Em breve novas tarefas.";
    }
  } 
  // Comando válido fora de hora
  else if (["nmap", "ssh", "hydra"].includes(cmd)) {
    response = `Comando '${cmd}' ainda não autorizado nesta fase. Use 'mission' para checar o objetivo atual.`;
  } 
  // Comando inválido
  else {
    response = "Comando não reconhecido. Digite 'help' para ver opções.";
  }

  const resOutput = document.createElement("div");
  resOutput.textContent = response;
  output.appendChild(resOutput);
  output.scrollTop = output.scrollHeight;
};

function printText(text, delay = 25) {
    let i = 0;
    const lineEl = document.createElement("div");
    output.appendChild(lineEl);
  
    function typeChar() {
      if (i < text.length) {
        lineEl.textContent += text[i];
        i++;
        output.scrollTop = output.scrollHeight;
        setTimeout(typeChar, delay);
      } else {
        // Remove quebra de linha duplicada
        if (lineEl.textContent.trim() !== "") {
          const br = document.createElement("br");
          output.appendChild(br);
        }
      }
    }
  
    typeChar();
  }
  

function getReputationTitle() {
  if (reputation >= 60) return "Operador Avançado";
  if (reputation >= 40) return "Infiltrador Digital";
  return "Recruta da Resistência";
}
