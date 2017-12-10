const gpio = require('rpi-gpio');
const express = require('express');
const app = express();

gpio.setup(7, gpio.DIR_OUT, write);

app.get('/', (req, res) => {
  res.send(`<button onclick="fetch('/on')">on</button> <button onclick="fetch('/off')">off</button>`)
});

app.get('/on', (req,res) => {
  res.send('on<script>window.close()</script>');
  console.log('pin on');
  gpio.write(7, 1, write);
});

app.get('/off', (req,res) => {
  res.send('on<script>window.close()</script>');
  console.log('pin off');
  gpio.write(7, 0, write);
});


app.listen(80, () => console.log('serving on port 80'));

function write(err) {
  if(err)
    throw err;
}