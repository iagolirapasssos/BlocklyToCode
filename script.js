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

// Função para gerar o código JavaScript
function generateCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code-output').textContent = code;
}

// Adicionar evento de clique ao botão de gerar código
document.getElementById('generate-code').addEventListener('click', generateCode);

// Personalização da aparência dos blocos para se parecer mais com o MIT App Inventor
Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

// Você pode adicionar mais personalizações de aparência aqui
