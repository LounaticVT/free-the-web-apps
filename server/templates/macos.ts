import userChromeCss from "./files/userChrome.css";
import userJs from "./files/user.js.txt";
import type { TargetInfos, VerifiedWebsiteType, WebsiteType } from "~~/types";

// Thanks to:
// https://apple.stackexchange.com/a/402653
// https://xuk.ai/blog/mac-apps-for-terminal.html

// https://support.mozilla.org/en-US/questions/1097623
function firefoxSetup(target: TargetInfos) {
  if (target.bw !== "firefox") return "# Firefox setup skipped";

  return `echo "\nSetting up Firefox...";
# create FTWA profile
${escapePath(target.path)} -CreateProfile FTWA;

# locate the profile folder
profile_folder=$(find ~/Library/Application\\ Support/Firefox/Profiles -name "*.FTWA");

# create userChrome.css
mkdir -p "$profile_folder/chrome"
cat <<EOF > "$profile_folder/chrome/userChrome.css"
${userChromeCss}
EOF

# create user.js
cat <<EOF > "$profile_folder/user.js"
${userJs}
EOF

echo "Firefox setup done.";`;
}

export function macos({
  website,
  target,
}: {
  website: WebsiteType | VerifiedWebsiteType;
  target: TargetInfos;
}) {
  const formattedName = website?.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const pascalCaseName = formattedName.replace(/-?(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  const safeLogo = (website?.macLogo || website.logo).replace(/'/g, "%27");

  if (website?.logoSize < 1024 && !website?.macLogo) {
    return `echo 'This logo is too small for macOS. Please provide a 1024x1024px logo.';`;
  }

  let commandOpts = "";

  if (target.bw === "firefox") {
    commandOpts = `--name='${website.name}' --no-remote -P "FTWA" '${website.url}'`;
  }
  else if (["chrome", "opera", "brave", "edge"].includes(target.bw)) {
    commandOpts = `--app='${website.url}'`;
  }

  return `#!/usr/bin/env bash
# This script is generated by FTWA
# /u/ links are only available for 24h
# Check the gallery to find more apps: https://ftwa.mathix.dev/#gallery

# Exit on error
set -e;

# Setup Firefox if needed
${firefoxSetup(target)}

echo "\nCreating desktop entry...";

# Creating a temporary directory
tmpdir="$(mktemp -d)";

# Downloading the icon
icon_path="$tmpdir/${pascalCaseName}.png";
curl -fsSLo $icon_path '${safeLogo}';

# Creating the icon file
mkdir "$tmpdir/${pascalCaseName}.iconset"
sips -z 16 16     $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_16x16.png";
sips -z 32 32     $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_16x16@2x.png";
sips -z 32 32     $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_32x32.png";
sips -z 64 64     $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_32x32@2x.png";
sips -z 128 128   $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_128x128.png";
sips -z 256 256   $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_128x128@2x.png";
sips -z 256 256   $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_256x256.png";
sips -z 512 512   $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_256x256@2x.png";
sips -z 512 512   $icon_path --out "$tmpdir/${pascalCaseName}.iconset/icon_512x512.png";
cp $icon_path "$tmpdir/${pascalCaseName}.iconset/icon_512x512@2x.png";
iconutil -c icns "$tmpdir/${pascalCaseName}.iconset";

# Creating the .app folder
mkdir -p '/Applications/${pascalCaseName}.app/Contents/MacOS' '/Applications/${pascalCaseName}.app/Contents/Resources';

# Creating the Info.plist file
cat > '/Applications/${pascalCaseName}.app/Contents/Info.plist' << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<!-- Created by FTWA (https://ftwa.mathix.dev) -->
<plist version="1.0">
  <dict>
      <key>CFBundleDisplayName</key>
      <string>${website.name}</string>
      <key>CFBundleExecutable</key>
      <string>${pascalCaseName}.sh</string>
      <key>CFBundleIconFile</key>
      <string>${pascalCaseName}</string>
      <key>CFBundleIdentifier</key>
      <string>dev.mathix.ftwa.${formattedName}</string>
  </dict>
</plist>
EOF

# Creating the executable file
cat > '/Applications/${pascalCaseName}.app/Contents/MacOS/${pascalCaseName}.sh' << EOF
#!/usr/bin/env bash
# This file was generated using FTWA (https://ftwa.mathix.dev)
${escapePath(target.path)} ${commandOpts}
EOF

# Making the file executable
chmod +x '/Applications/${pascalCaseName}.app/Contents/MacOS/${pascalCaseName}.sh';

# Moving the icon
mv "$tmpdir/${pascalCaseName}.icns" '/Applications/${pascalCaseName}.app/Contents/Resources/';

# Cleaning up
rm -r "$tmpdir";

echo 'Desktop entry created. Search for "${website.name}" in Spotlight.';`;
};