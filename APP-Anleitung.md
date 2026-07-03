# Sturm Energie App (PWA) – Anleitung

Ihre Website ist jetzt eine installierbare App. Kunden können sie mit dem Sturm-Energie-Icon auf ihren Startbildschirm legen – auf **iPhone und Android**.

## Was Sie hochladen müssen (zu GitHub, wie gewohnt)

Laden Sie diese **7 Dateien** in Ihr Repository (alle in den Hauptordner, dorthin wo schon die index.html liegt):

1. `index.html` (ersetzt die bisherige – enthält jetzt die App-Funktion)
2. `manifest.json` (die App-Konfiguration)
3. `sw.js` (macht die App offline-fähig)
4. `icon-192.png`
5. `icon-512.png`
6. `icon-maskable-512.png`
7. `apple-touch-icon.png`

Am einfachsten: „Add files" → „Upload files" → alle 7 Dateien per Drag & Drop → „Commit changes". Vercel veröffentlicht automatisch.

**Wichtig:** Alle Dateien müssen im **Hauptordner** liegen (nicht in einem Unterordner), sonst findet die App ihre Icons und Konfiguration nicht.

## So installieren Ihre Kunden die App

**Android (Chrome):** Beim Besuch von sturm-energie.de erscheint nach kurzer Zeit unten automatisch ein Banner „App installieren". Ein Tipp – fertig. (Alternativ: Browser-Menü ⋮ → „App installieren".)

**iPhone (Safari):** Es erscheint ein dezenter Hinweis. Der Weg: unten auf das **Teilen-Symbol** tippen → **„Zum Home-Bildschirm"**. (Apple erlaubt keine automatische Installation – das ist bei allen Web-Apps so.)

Danach liegt das ⚡-Icon auf dem Startbildschirm und öffnet die Seite im Vollbild, ganz ohne Browser-Leiste – wie eine echte App.

## Testen

1. Nach dem Hochladen `https://www.sturm-energie.de` auf dem Handy öffnen.
2. Kurz warten – das Install-Banner sollte erscheinen.
3. Installieren, Icon auf dem Startbildschirm prüfen, App öffnen.

Tipp: Falls Sie beim Testen kein Banner sehen, weil Sie es schon einmal weggeklickt haben – einfach in den Browser-Einstellungen die Website-Daten löschen oder im Browser-Menü direkt „App installieren" wählen.

## Updates

Läuft völlig automatisch: Wenn Sie künftig die `index.html` in GitHub aktualisieren, sehen auch alle, die die App installiert haben, beim nächsten Öffnen die neue Version. Sie müssen nichts weiter tun.

*Hinweis: Wenn Sie später größere Änderungen an den zwischengespeicherten Dateien machen, können Sie in `sw.js` die Zeile `const CACHE = 'sturm-energie-v1'` auf `v2` erhöhen – dann wird der alte Zwischenspeicher garantiert erneuert. Für normale Inhaltsänderungen ist das aber nicht nötig.*
