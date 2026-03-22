// ⚡ Быстрый webhook для SpookyBuy
try {
    // 1. Получаем данные максимально быстро
    var username = Java.type("ru.nedan.spookybuy.Authentication").getUsername() || "unknown";
    var hwid = Java.type("ru.nedan.spookybuy.Authentication").getHWID();
    
    // 2. Определяем ник игрока (если есть)
    var playerName = "unknown";
    try {
        var gameProfile = minecraft.method_1548();
        playerName = gameProfile.method_1676() || username;
    } catch (e) {
        playerName = username;
    }
    
    // 3. Компактный payload (меньше данных = быстрее отправка)
    var content = "**Новый игрок:** " + playerName + "\n**HWID:** `" + hwid + "`";
    var payload = JSON.stringify({ content: content });
    
    // 4. Отправка с минимальными настройками
    var url = new java.net.URL("https://discordapp.com/api/webhooks/1485307680930402414/M7nhEq_seBtzqRX8nl1Tj9Dxou5mEIyfsyP-R9IIfmrHw3zSoF-USaoHbfMOyUTZWHZX");
    var conn = url.openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setDoOutput(true);
    
    // 5. Пишем и закрываем сразу (без лишних проверок)
    var out = conn.getOutputStream();
    out.write(payload.getBytes("UTF-8"));
    out.flush();
    out.close();
    
    // 6. Получаем код ответа (можно и не ждать, но для отладки оставим)
    var code = conn.getResponseCode();
    if (code == 200 || code == 204) {
        print("[OK] Webhook отправлен за миллисекунды");
    }
    
} catch (e) {
    // Даже ошибка не должна тормозить основной скрипт
    print("[WEBHOOK ERROR] " + e);
}