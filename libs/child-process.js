/**
 * 子进程
 */
function child({ cmd, cwd, cb, end }) {
    try {
        const { spawn } = require('child_process')
        const _child = spawn('cmd', ['/c', cmd], { cwd, shell: false })

        _child.stdout.on('data', (buffer) => {
            const content = buffer.toString().trim()

            cb(content)
        })

        _child.stderr.on('data', (buffer) => {
            const content = buffer.toString().trim()

            cb(content)
        })

        _child.on('close', (code) => {
            end()
        })

        _child.on('error', (err) => {
            end(err)
        })
    } catch (error) {
        end(error)
    }
}

module.exports = { child }
