<p align="center"><img alt="Directus Logo" src="website/public/og.png"></p>

# Free The Web Apps

**[FTWA](https://ftwa.mathix.dev)** is an utility to free your web apps from their browser's frame.
So you don't need to wait for Arc Browser on Linux to have great looking webapps!

- **Native Feel.** Don't wait for native desktop apps, most frontend developpers already did an amazing job.
- **Quick Access.** Find your apps in the App Launcher, Rofi, Wofi, dmenu, Spotlight and more.
- **Support Extentions.** Apps keep browser data: cookies, storage, extentions, ...
- **App Gallery.** Discover dozen of web apps that work especially well in a frameless browser.

**[FTWA Website](https://ftwa.mathix.dev)** • **[How it works](#how-it-works)** • **[Suggest an app][suggest-app]**


## How it works

### Chromium browsers

FTWA uses the `--app='https://app.example'` parameter with Chromium-based browsers to launch a website in "app mode". Similar to kiosk-mode, this mode launches the website without the typical browser interface, such as tabs, the address bar, or navigation buttons, making the website look and feel more like a standalone application.

### Firefox

TODO: Not implemented yet. Previously `--ssb` parameter (Site Specific Browser) was available in firefox, but was discontinued in 2021. Will need to find alternatives.

### On linux

When choosing linux as target OS, FTWA generate a shell script that will create a [`.desktop` file](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) and it's icons.

### On Windows

TODO: Not implemented yet. But will use shortcuts.

### On Macos

TODO: Not implemented yet.

[Check the gallery!](#gallery)

> [!NOTE]
> Feel free to contribute and [suggest apps][suggest-app] you find useful!

## How to install an app

1. Make sure to select your environment options.

    ![settings](.github/assets/settings.png)
2. Either create your own app or click the copy icon on any app from the gallery.
3. Paste the code in your terminal of choice.
    - It's good practice to check a script content before running it.
    - **Example:**
      ```bash
      sh -c "$(curl -fsSL 'https://ftwa.mathix.dev/v/excalidraw?os=linux&bw=chrome&path=%2Fusr%2Fbin%2Fgoogle-chrome-stable')"
      ```
      Just curl the link or open it in a browser to see the script content.
      ```bash
      curl -fsSL 'https://ftwa.mathix.dev/v/excalidraw?os=linux&bw=chrome&path=%2Fusr%2Fbin%2Fgoogle-chrome-stable'
      ```

Currently this will only work if you have a chromium browser installed. If you're not using `google-chrome` make sure to either edit the `.desktop` file to point to your executable, or make `/usr/bin/google-chrome` an alias to your chromium browser.

## What to expect using swayfx

Using [swayfx](https://github.com/WillPower3309/swayfx) as window manager (corner_radius: 12, blur_radius: 5)

- Chrome, Todo Mate, YT Music (My current every-day setup)
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/a286d765-7bda-4a06-8c20-4d3aec129d0a)

- YouTube Music, Todo Mate, Notion
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/65fd1f2c-beb8-4e8f-a133-6acd5feae10f)

- YouTube Music
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/376aa8a6-577e-47be-a94e-471230b1706a)

- Notion, ~~Cron~~ *Notion* Calendar
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/d04f03fb-254b-4216-8ee0-66574e75abc8)


[suggest-app]: https://github.com/mathix420/free-the-web-apps/issues/new?assignees=&labels=app-suggestion&projects=&template=APP_SUGGESTION.yaml&title=%5BAPP%5D+-+