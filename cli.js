#!/usr/bin/env node

console.log('cli working')

const inquirer = require('inquirer')
const join = require('path').join
const ejs = require('ejs')
const { readdirSync, writeFileSync } = require('./libs/readdir-sync.js')

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'create a app',
            default: 'my-vue-app'
        }
    ])
    .then((anwsers) => {
        const tmpDir = join(__dirname, 'templates/demo')
        const destDir = process.cwd()
        const filesPath = readdirSync(tmpDir)

        filesPath.forEach((file) => {
            ejs.renderFile(join(tmpDir, file), anwsers, (err, res) => {
                if (err) throw err

                writeFileSync(join(destDir, file), res)
            })
        })
    })
