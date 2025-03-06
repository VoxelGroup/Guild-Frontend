# Translations PoC token extractor

Script to extract tokens from Voxel.GlobalizationEditor.Tool to a JSON file to be consumed by our
web applications.

Output JSON file is structured by culture, and then by token ID.

## Usage

```
node main.js [path to globalization editor repository] [optional: comma separated list of tokens to extract]
```

Example usage:

```
node main.js \
  "C:\Users\cgonzalezsegura\github\Voxel.GlobalizationEditor.Tool" \
  Digital_Archive_,Web_
```