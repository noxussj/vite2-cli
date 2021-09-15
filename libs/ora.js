/**
 * 命令行输出
 */
class _spinner {
    static create() {
        return new _spinner()
    }

    constructor() {
        const ora = require('ora')

        const spinner = ora({
            text: '',
            spinner: {
                interval: 80,
                frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
            }
        })

        return spinner
    }
}

module.exports = { spinner: _spinner.create() }
