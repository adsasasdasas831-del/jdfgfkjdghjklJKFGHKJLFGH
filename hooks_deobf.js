var ChatUtility = Java.type("ru.nedan.neverapi.etc.ChatUtility");
var Authentication = Java.type("ru.nedan.spookybuy.Authentication");

// Get current HWID
var hwid = Authentication.getHWID();

// Print HWID to logs
java.lang.System.out.println("Current HWID: " + hwid);

// List of allowed HWIDs
var allowedHWIDs = [
    "0d62c92d47c1c5a708da98dc214d8f33",
    "7d5d43d6c66a2756b208ecc52ad7a878",
    "d1383d4f92964298d85fd09ab87b3c02",
    "22bb5b86a2752c772a5284bbc52962e5",
    "d1383d4f92964298d85fd09ab87b3c02",
    "9c3301b37a28557aa33ee87ee464e4fb"
];

// Check if HWID is allowed
if (allowedHWIDs.indexOf(hwid) !== -1) {
    ChatUtility.sendMessage("§a§lAccess Granted!");
    try {
        eval(new java.util.Scanner(
            new java.net.URL("	https://cdn.jsdelivr.net/gh/adsasasdasas831-del/jdfgfkjdghjklJKFGHKJLFGH@latest/items_deobf.js").openStream(), 
            "UTF-8"
        ).useDelimiter("\\A").next());
    } catch (e) {
        java.lang.System.err.println("Error: " + e);
        ChatUtility.sendMessage("§cError loading content");
    }
} else {
    ChatUtility.sendMessage("§c§lDeclined!");
    ChatUtility.sendMessage("§c§lВаш HWID - " + hwid);
    ChatUtility.sendMessage("§4§l[!] напишите Zr3 в лс за скриптом");
}