class Updater {
  constructor() {
    this.state = { number: 0, name: 'hcc' }
    this.queue = []
  }

  setState(newStart) {
    this.queue.push(newStart)
  }

  flush() {
    for (let i = 0; i < this.queue.length; i++) {
      let update = this.queue[i]
      if (typeof update === 'function') {
        update(this.state)
      }
      this.state = {...this.state, ...update}
    }
  }
}
