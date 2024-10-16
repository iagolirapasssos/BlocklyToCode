// Definindo blocos de dicionários (Dictionaries)
Blockly.Blocks['maps_create_with'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("criar mapa com");
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("chave");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("valor");
        this.setInputsInline(true);
        this.setOutput(true, 'Map');
        this.setColour(230);
        this.setTooltip("Cria um mapa com uma chave e um valor.");
        this.setHelpUrl("");
    }
};



Blockly.Blocks['maps_create_empty'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Criar Dicionário Vazio");
        this.setOutput(true, "Map");
        this.setColour(210);
        this.setTooltip("Cria um dicionário vazio.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_get'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Obter valor de dicionário");
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("para chave");
        this.setOutput(true);
        this.setColour(210);
        this.setTooltip("Obtém o valor associado à chave no dicionário.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_set'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Definir valor de dicionário");
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("para chave");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("como");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip("Define um valor para a chave no dicionário.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_keys'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Chaves do dicionário");
        this.setOutput(true, "Array");
        this.setColour(210);
        this.setTooltip("Retorna todas as chaves do dicionário.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_values'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Valores do dicionário");
        this.setOutput(true, "Array");
        this.setColour(210);
        this.setTooltip("Retorna todos os valores do dicionário.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_is_empty'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Dicionário está vazio?");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip("Retorna verdadeiro se o dicionário estiver vazio.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['maps_length'] = {
    init: function() {
        this.appendValueInput("MAP")
            .setCheck("Map")
            .appendField("Tamanho do dicionário");
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip("Retorna o número de chaves no dicionário.");
        this.setHelpUrl("");
    }
};


// Definindo o bloco 'console'
Blockly.Blocks['println'] = {
    init: function() {
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField('console.log');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160); // Escolha uma cor
        this.setTooltip('Exibe uma mensagem no console.');
        this.setHelpUrl('');
    }
};
