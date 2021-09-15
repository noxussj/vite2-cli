/**
 * 子进程
 */
function execa({ cmd, cwd, cb, end }) {
    try {
        const _execa = require('execa')
        const [_cmd, ...param] = cmd.split(' ')
        const child = _execa(_cmd, param, { cwd })

        child.stdout.on('data', (buffer) => {
            const content = buffer.toString().trim()

            cb(content)
        })

        child.stdout.on('close', (code) => {
            end()
        })
    } catch (error) {
        end(error)
    }
}

module.exports = { execa }
