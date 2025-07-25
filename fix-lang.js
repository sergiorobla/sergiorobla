const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "dist", "index.html");

fs.readFile(indexPath, "utf8", (err, data) => {
  if (err) throw err;

  const result = data.replace('<html lang="en">', '<html lang="es">');

  fs.writeFile(indexPath, result, "utf8", (err) => {
    if (err) throw err;
    console.log('index.html actualizado con lang="es"');
  });
});
