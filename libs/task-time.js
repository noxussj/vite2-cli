/**
 * 统计执行时间
 */
class TaskTime {
    static create() {
        return new TaskTime()
    }

    constructor() {
        this.startTime = null
    }

    start() {
        this.startTime = new Date().getTime()
    }

    end() {
        let endTime = new Date().getTime() - this.startTime
        endTime = endTime > 1000 ? Math.round((endTime / 1000) * 100) / 100 + 's' : endTime + 'ms'

        return endTime
    }

    clear() {
        this.startTime = null
    }
}

module.exports = { taskTime: TaskTime.create() }
