/**
 * 打印执行结果信息
 */
function printResults({ taskTime, templatesData }) {
    const chalk = require('chalk')

    console.log(chalk.green(`is download success as ${taskTime.end()}`))

    console.log('\n')

    if (templatesData.npm) {
        console.log('Please enter ' + chalk.cyan(`cd ${templatesData.appName}`))
        console.log('Please enter ' + chalk.cyan(`npm run dev`))
    } else {
        console.log('Please enter ' + chalk.cyan(`cd ${templatesData.appName}`))
        console.log('Please enter ' + chalk.cyan(`npm install`))
        console.log('Please enter ' + chalk.cyan(`npm run dev`))
    }
}

module.exports = { printResults }
