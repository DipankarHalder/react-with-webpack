async function start(){
  return await Promise.resolve('async is working');
}

start()
  .then(() => console.log("Conasole from then"))
  .catch(() => console.log("Conasole from catch"));