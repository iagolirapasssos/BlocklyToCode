// Configuração do workspace Blockly
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
    trashcan: true,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
    }
});

// Função para gerar e formatar o código
function generateCode() {
    var language = document.getElementById('language-select').value;
    var code;

    // Gera o código com base na linguagem selecionada
    switch (language) {
        case 'javascript':
            code = Blockly.JavaScript.workspaceToCode(workspace);
            break;
        case 'python':
            code = Blockly.Python.workspaceToCode(workspace);
            break;
        case 'php':
            code = Blockly.PHP.workspaceToCode(workspace);
            break;
        case 'lua':
            code = Blockly.Lua.workspaceToCode(workspace);
            break;
        case 'dart':
            code = Blockly.Dart.workspaceToCode(workspace);
            break;
        default:
            code = Blockly.JavaScript.workspaceToCode(workspace);
            break;
    }

    // Formatar o código gerado para destacar a sintaxe
    var formattedCode = `<pre><code class="${language}">` + escapeHtml(code) + '</code></pre>';
    
    // Inserir o código formatado na div
    document.getElementById('code-output').innerHTML = formattedCode;

    // Destacar a sintaxe
    const codeElement = document.getElementById('code-output').querySelector('code');
    hljs.highlightElement(codeElement);

    // Adicionar numeração de linha
    addLineNumbers(codeElement);
}

// Função para escapar caracteres HTML
function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// Função para adicionar numeração de linha
function addLineNumbers(codeElement) {
    var lines = codeElement.innerText.split('\n');
    var numberedLines = lines.map((line, index) => {
        return `<span class="line-number">${index + 1}</span> ${line}`;
    }).join('\n');
    codeElement.innerHTML = numberedLines; // Modificado para manter a formatação
}

// Adicionar evento de clique ao botão de gerar código
document.getElementById('generate-code').addEventListener('click', generateCode);

// Personalização da aparência dos blocos
Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

// Função para mudar o tema
function changeTheme() {
    const themeSelect = document.getElementById('theme-select');
    const selectedTheme = themeSelect.value;

    // Remove temas existentes
    document.body.classList.remove('dark-theme');

    // Adiciona tema selecionado
    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Adicionar evento de alteração ao seletor de tema
document.getElementById('theme-select').addEventListener('change', changeTheme);

