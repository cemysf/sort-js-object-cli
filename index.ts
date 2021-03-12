import * as fs from 'fs';
import * as parser from "@babel/parser";
import generate from "@babel/generator";
import sort from "./sort-js-object/src/sort";


if (process.argv.length !== 3) {
  throw Error("usage: node index.js <filepath>");
}

const filePath = process.argv[process.argv.length - 1];

fs.readFile(filePath, function (err, data) {
  if (err) {
    throw err;
  }

  const fileContents = data.toString();
  const tree = parser.parse(fileContents, {
    sourceType: "module",
    plugins: [
      "jsx",
    ],
  });

  sort(tree, null);

  const out = generate(tree, {}, fileContents);
  console.log(out.code);
});