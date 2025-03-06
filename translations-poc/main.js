const fs = require('fs')
const xml2js = require('xml2js')

const parseFiles = async (files) => {
    const output = {}

    files.forEach(async ({file, fullPath}) => {
        const text = fs.readFileSync(fullPath)
        const xml = await xml2js.parseStringPromise(text)
        const tokens = xml.Token.Translations[0].Translation
        
        if (!tokens) return;

        tokens.forEach((token) => {
            const cultureCode = token.CultureCode[0]
            const text = token.Text[0]

            if (!output[cultureCode]) output[cultureCode] = {}
            output[cultureCode][file] = text
        })
    })

    return output
}

const main = async () => {
    const process = require("process")
    const args = process.argv;
    
    if (args.length != 4) {
        console.log("usage: node main.js [path to Voxel.GlobalizationEditor.Tool] [tokens to extract]")
        process.exit(1)
    }
    
    const [_, __, pathToGlobalizationTool, rawTokens] = args
    const desiredTokens = rawTokens.split(",")
    
    const tokensPath = `${pathToGlobalizationTool}\\db\\tokens`
    const files = fs.readdirSync(tokensPath)
        .map(f => ({file: f, fullPath:`${tokensPath}\\${f}`}))
        .filter(({file}) => desiredTokens.some(t => file.includes(t)))
    
    const parsedFile = await parseFiles(files)
    
    console.log(`Parsed ${Object.keys(parsedFile).length} cultures to tokens.json`)

    fs.writeFileSync("tokens.json", JSON.stringify(parsedFile, null, 2))
}

main()
