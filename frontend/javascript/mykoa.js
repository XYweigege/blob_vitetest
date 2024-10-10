const { createServer } = require("http");

class Koa {
  handlerList = [];
  ctx = {};
  use(handler) {
    if (typeof handler !== "function") {
      return;
    }
    this.handlerList.push(handler);
  }
  _excute() {
    if (this.handlerList.length === 0) {
      return;
    }
    const firstHandler = this.handlerList.shift();

    return firstHandler(this.ctx, () => {
      return this._excute();
    });
  }

  listen(port, callback) {
    const server = createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      this._excute();
      res.write("200");
    });
    server.listen(port, typeof callback === "function" ? callback : null);
  }
}

const app = new Koa();
app.use((ctx, next) => {
  console.log("handler-1", 1);
  next();
  console.log("handler-1", 2);
});
app.use((next) => {
  console.log("handler-2", 1);
  next();
  console.log("handler-2", 2);
});
