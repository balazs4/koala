const koa = require('koa');
const socket = require('koa-socket');
const pathmatch = require('koa-path-match')();
const app = new koa();
const io = new socket();

app.use(
  pathmatch('/', ctx => {
    ctx.body = `
      <html>
        <head>
            <title>koa meets websocket</title>
        </head>
        <body>
            <h1>Hello world!</h1>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                var socket = io();
                socket.emit('message', 'Hello from client');
                socket.on('info', function(data){
                  console.log(JSON.stringify(data));
                })
            </script>
        </body>
      </html>
  `;
  })
);

io.attach(app);

io.on('connection', (ctx, data) => {
  console.log(data);
  ctx.socket.emit('info', 'ACK');
});

setInterval(() => {
  io.broadcast('info', Date.now());
}, 2000);

app.listen(process.env.PORT || 3000);
