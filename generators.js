// Traduções para Python
Blockly.Python.forBlock['maps_create_with'] = function(block, generator) {
    var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = `{${key}: ${value}}`;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['maps_create_empty'] = function(block, generator) {
    return ['{}', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['maps_get'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var code = `${map}[${key}]`;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['maps_set'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = `${map}[${key}] = ${value}\n`;
    return code;
};

Blockly.Python.forBlock['maps_keys'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    return [`list(${map}.keys())`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.forBlock['maps_values'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    return [`list(${map}.values())`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.forBlock['maps_is_empty'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    return [`len(${map}) == 0`, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.forBlock['maps_length'] = function(block, generator) {
    var map = Blockly.Python.valueToCode(block, 'MAP', Blockly.Python.ORDER_ATOMIC);
    return [`len(${map})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

// Traduções para JavaScript
Blockly.JavaScript.forBlock['maps_create_with'] = function(block, generator) {
    var key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_ATOMIC);
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `{${key}: ${value}}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['maps_create_empty'] = function(block, generator) {
    return ['{}', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['maps_get'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `${map}[${key}]`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['maps_set'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_ATOMIC);
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `${map}[${key}] = ${value};\n`;
    return code;
};

Blockly.JavaScript.forBlock['maps_keys'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    return [`Object.keys(${map})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['maps_values'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    return [`Object.values(${map})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['maps_is_empty'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    return [`Object.keys(${map}).length === 0`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['maps_length'] = function(block, generator) {
    var map = Blockly.JavaScript.valueToCode(block, 'MAP', Blockly.JavaScript.ORDER_ATOMIC);
    return [`Object.keys(${map}).length`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Traduções para PHP
Blockly.PHP.forBlock['maps_create_with'] = function(block, generator) {
    var key = Blockly.PHP.valueToCode(block, 'KEY', Blockly.PHP.ORDER_ATOMIC);
    var value = Blockly.PHP.valueToCode(block, 'VALUE', Blockly.PHP.ORDER_ATOMIC);
    var code = "array(" + key + " => " + value + ")";
    return [code, Blockly.PHP.ORDER_ATOMIC];
};

Blockly.PHP.forBlock['maps_create_empty'] = function(block, generator) {
    return ['array()', Blockly.PHP.ORDER_ATOMIC];
};

Blockly.PHP.forBlock['maps_get'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    var key = Blockly.PHP.valueToCode(block, 'KEY', Blockly.PHP.ORDER_ATOMIC);
    var code = map + "[" + key + "]";
    return [code, Blockly.PHP.ORDER_ATOMIC];
};

Blockly.PHP.forBlock['maps_set'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    var key = Blockly.PHP.valueToCode(block, 'KEY', Blockly.PHP.ORDER_ATOMIC);
    var value = Blockly.PHP.valueToCode(block, 'VALUE', Blockly.PHP.ORDER_ATOMIC);
    var code = map + "[" + key + "] = " + value + ";\n";
    return code;
};

Blockly.PHP.forBlock['maps_keys'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    return ["array_keys(" + map + ")", Blockly.PHP.ORDER_FUNCTION_CALL];
};

Blockly.PHP.forBlock['maps_values'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    return ["array_values(" + map + ")", Blockly.PHP.ORDER_FUNCTION_CALL];
};

Blockly.PHP.forBlock['maps_is_empty'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    return ["empty(" + map + ")", Blockly.PHP.ORDER_FUNCTION_CALL];
};

Blockly.PHP.forBlock['maps_length'] = function(block, generator) {
    var map = Blockly.PHP.valueToCode(block, 'MAP', Blockly.PHP.ORDER_ATOMIC);
    return ["count(" + map + ")", Blockly.PHP.ORDER_FUNCTION_CALL];
};

// Traduções para Lua
Blockly.Lua.forBlock['maps_create_with'] = function(block, generator) {
    var key = Blockly.Lua.valueToCode(block, 'KEY', Blockly.Lua.ORDER_ATOMIC);
    var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = "{[" + key + "] = " + value + "}";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua.forBlock['maps_create_empty'] = function(block, generator) {
    return ['{}', Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua.forBlock['maps_get'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    var key = Blockly.Lua.valueToCode(block, 'KEY', Blockly.Lua.ORDER_ATOMIC);
    var code = map + "[" + key + "]";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua.forBlock['maps_set'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    var key = Blockly.Lua.valueToCode(block, 'KEY', Blockly.Lua.ORDER_ATOMIC);
    var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = map + "[" + key + "] = " + value + "\n";
    return code;
};

Blockly.Lua.forBlock['maps_keys'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    var functionName = Blockly.Lua.provideFunction_(
        'table_keys',
        ['function ' + Blockly.Lua.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
         '  local keys = {}',
         '  for k, _ in pairs(t) do',
         '    table.insert(keys, k)',
         '  end',
         '  return keys',
         'end']);
    var code = functionName + '(' + map + ')';
    return [code, Blockly.Lua.ORDER_HIGH];
};

Blockly.Lua.forBlock['maps_values'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    var functionName = Blockly.Lua.provideFunction_(
        'table_values',
        ['function ' + Blockly.Lua.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
         '  local values = {}',
         '  for _, v in pairs(t) do',
         '    table.insert(values, v)',
         '  end',
         '  return values',
         'end']);
    var code = functionName + '(' + map + ')';
    return [code, Blockly.Lua.ORDER_HIGH];
};

Blockly.Lua.forBlock['maps_is_empty'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    return ['next(' + map + ') == nil', Blockly.Lua.ORDER_RELATIONAL];
};

Blockly.Lua.forBlock['maps_length'] = function(block, generator) {
    var map = Blockly.Lua.valueToCode(block, 'MAP', Blockly.Lua.ORDER_ATOMIC);
    var functionName = Blockly.Lua.provideFunction_(
        'table_length',
        ['function ' + Blockly.Lua.FUNCTION_NAME_PLACEHOLDER_ + '(t)',
         '  local count = 0',
         '  for _ in pairs(t) do',
         '    count = count + 1',
         '  end',
         '  return count',
         'end']);
    var code = functionName + '(' + map + ')';
    return [code, Blockly.Lua.ORDER_HIGH];
};

// Traduções para Dart
Blockly.Dart.forBlock['maps_create_with'] = function(block, generator) {
    var key = Blockly.Dart.valueToCode(block, 'KEY', Blockly.Dart.ORDER_ATOMIC);
    var value = Blockly.Dart.valueToCode(block, 'VALUE', Blockly.Dart.ORDER_ATOMIC);
    var code = "{" + key + ": " + value + "}";
    return [code, Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.forBlock['maps_create_empty'] = function(block, generator) {
    return ['{}', Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.forBlock['maps_get'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    var key = Blockly.Dart.valueToCode(block, 'KEY', Blockly.Dart.ORDER_ATOMIC);
    var code = map + "[" + key + "]";
    return [code, Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.forBlock['maps_set'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    var key = Blockly.Dart.valueToCode(block, 'KEY', Blockly.Dart.ORDER_ATOMIC);
    var value = Blockly.Dart.valueToCode(block, 'VALUE', Blockly.Dart.ORDER_ATOMIC);
    var code = map + "[" + key + "] = " + value + ";\n";
    return code;
};

Blockly.Dart.forBlock['maps_keys'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    return [map + ".keys.toList()", Blockly.Dart.ORDER_FUNCTION_CALL];
};

Blockly.Dart.forBlock['maps_values'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    return [map + ".values.toList()", Blockly.Dart.ORDER_FUNCTION_CALL];
};

Blockly.Dart.forBlock['maps_is_empty'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    return [map + ".isEmpty", Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.forBlock['maps_length'] = function(block, generator) {
    var map = Blockly.Dart.valueToCode(block, 'MAP', Blockly.Dart.ORDER_ATOMIC);
    return [map + ".length", Blockly.Dart.ORDER_ATOMIC];
};

