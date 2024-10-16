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

// Função para carregar e adicionar blocos personalizados
// Função para mostrar o botão de upload e ocultar os blocos carregados
function onCategoryClick(event) {
    const loadedExtensionsDiv = document.getElementById('loaded-extensions');
    const uploadButton = document.getElementById('upload-user-extensions');

    // Mostra o botão de upload
    uploadButton.style.display = 'block';
    loadedExtensionsDiv.innerHTML = ''; // Limpa blocos carregados ao clicar na categoria
}

// Adiciona evento de clique à categoria User Extensions
const extensionInput = document.getElementById('extensionInput');

Blockly.getMainWorkspace().registerButtonCallback('sendExtension', function() {
    extensionInput.click();
});

function getBlocksFromScript(scriptContent) {
    const blockTypes = [];
    const blockDefRegex = /Blockly\.Blocks\['(.*?)'\]/g;
    let match;
    while ((match = blockDefRegex.exec(scriptContent)) !== null) {
        blockTypes.push(match[1]);
    }
    return blockTypes;
}

function registerExtension(scriptContent) {
    const extensionRegex = /Blockly\.Extensions\.register\('(.*?)',\s*function\s*\(\)\s*{([\s\S]*?)}\);/g;
    let match;
    while ((match = extensionRegex.exec(scriptContent)) !== null) {
        const extensionName = match[1];
        const extensionCode = match[2];
        try {
            eval(`Blockly.Extensions.register('${extensionName}', function() {${extensionCode}});`);
        } catch (error) {
            console.error(`Error registering extension ${extensionName}:`, error);
        }
    }
}

function registerGenerators(scriptContent) {
    function createAndRegisterGenerator(language, blockType, generatorCode) {
        if (!Blockly[language]) {
            Blockly[language] = {};
        }
        try {
            eval(`Blockly.${language}['${blockType}'] = function(block) {${generatorCode}};`);
        } catch (error) {
            console.error(`Error registering ${language} generator for block: ${blockType}`, error);
        }
    }

    const generatorRegex = /Blockly\.(\w+)\['(.*?)'\]\s*=\*\s*function\s*\(block\)\s*{([\s\S]*?)};/g;
    let match;
    while ((match = generatorRegex.exec(scriptContent)) !== null) {
        const language = match[1];
        createAndRegisterGenerator(language, match[2], match[3]);
    }

    // Removido o suporte para a linguagem Arduino
    const languages = ['Python', 'JavaScript', 'Lua', 'PHP', 'Dart']; // Apenas linguagens nativas do Blockly
    languages.forEach(language => {
        const generatorRegex = new RegExp(`Blockly\\.${language}\\['(.*?)'\\]\\s*=\\s*function\\s*\\(block\\)\\s*{([\\s\\S]*?)};`, 'g');
        let match;
        while ((match = generatorRegex.exec(scriptContent)) !== null) {
            createAndRegisterGenerator(language, match[1], match[2]);
        }
    });
}

extensionInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const scriptContent = e.target.result;
            
            try {
                (new Function(scriptContent))();

                registerExtension(scriptContent);
                registerGenerators(scriptContent);

                const scriptName = file.name.split('.')[0];
                const newCategory = document.createElement('category');
                newCategory.setAttribute('name', scriptName);
                newCategory.setAttribute('colour', '160');

                const blocks = getBlocksFromScript(scriptContent);
                blocks.forEach(block => {
                    const blockNode = document.createElement('block');
                    blockNode.setAttribute('type', block);
                    newCategory.appendChild(blockNode);
                });

                const extensionsCategory = document.getElementById('extensionsCategory');
                const sendExtensionButton = extensionsCategory.querySelector('button');
                extensionsCategory.insertBefore(newCategory, sendExtensionButton.nextSibling);

                workspace.updateToolbox(document.getElementById('toolbox'));

                alert("Extension loaded and registered successfully!");
            } catch (error) {
                console.error("Error loading extension:", error);
                alert("Error loading extension:", error);
            }
        };
        reader.readAsText(file);
    }
});

function refreshVariables(workspace) {
    const variables = Blockly.Variables.allUsedVarModels(workspace);
    variables.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar as variáveis alfabeticamente

    workspace.getAllBlocks().forEach(block => {
        if (typeof block.updateVariableFieldDropdown === 'function') {
            block.updateVariableFieldDropdown();
        }
    });

    if (workspace.toolbox_) {
        workspace.toolbox_.refreshSelection();
    }
}

async function executeCode() {
    const language = document.getElementById('language-select').value;

    // Gerar o código baseado na linguagem selecionada
    let code;
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
            code = Blockly.JavaScript.workspaceToCode(workspace); // Fallback para JavaScript
            break;
    }

    const languageVersions = {
        javascript: '18.15.0',
        python: '3.10.0',
        php: '8.2.3',
        lua: '5.4.4',
        dart: '2.19.6'
    };
    const selectedVersion = languageVersions[language] || '*';

    const outputDiv = document.getElementById('code-output');
    outputDiv.innerHTML = '<p>Executing code...</p>';

    const requestBody = {
        language: language,
        version: selectedVersion,
        files: [{ name: 'main', content: code }],
        stdin: '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
    };

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Execution failed');
        }

        const output = result.run ? result.run.output : 'No output';
        outputDiv.innerHTML = `<pre><code class="execution-result">${escapeHtml(output)}</code></pre>`;
        hljs.highlightElement(outputDiv.querySelector('code'));
    } catch (error) {
        console.error('Error executing code:', error);
        outputDiv.innerHTML = `<p class="error">Error: ${escapeHtml(error.message)}</p>`;
    }
}

// Função para salvar blocos em XML
function saveBlocks() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'blocks.xml';
    a.click();

    URL.revokeObjectURL(url); // Limpar o URL criado
}

// Função para carregar blocos a partir de XML
function loadBlocks(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const xmlText = e.target.result;
        const xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, workspace);
    };
    reader.readAsText(file);
}

// Permitir arrastar e soltar arquivos XML para a tela
function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const xmlText = e.target.result;

        try {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");

            if (xml.documentElement.nodeName === "parsererror") {
                throw new Error("Erro ao analisar o XML.");
            }

            Blockly.Xml.clearWorkspaceAndLoadFromXml(xml.documentElement, workspace);
        } catch (error) {
            console.error("Erro ao carregar o XML:", error);
            alert("O arquivo XML não é válido.");
        }
    };
    reader.readAsText(file);
}


// Prevenir comportamento padrão de arrastar e soltar
document.body.addEventListener('dragover', (event) => event.preventDefault());
document.body.addEventListener('drop', handleFileDrop);

// Adicionar eventos para os botões
document.getElementById('save-blocks').addEventListener('click', saveBlocks);
document.getElementById('load-blocks').addEventListener('click', () => {
    document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', loadBlocks);

document.body.addEventListener('dragenter', () => {
    document.getElementById('blocklyDiv').classList.add('dragging');
});

document.body.addEventListener('dragleave', () => {
    document.getElementById('blocklyDiv').classList.remove('dragging');
});

// Add event listener for the Execute Code button
document.getElementById('execute-code').addEventListener('click', executeCode);
