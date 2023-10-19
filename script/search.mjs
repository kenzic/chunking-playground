#!/usr/bin/env zx

import "dotenv/config";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import path from "path";

$.verbose = false;

const collectionName = process.env.COLLECTION_NAME;

function displayEpisodeName(filePath) {
  const basename = path.basename(filePath);
  const filename = basename.split(".").slice(0, -1).join(".");
  return filename;
}

const vectorStore = await Chroma.fromExistingCollection(
  new OpenAIEmbeddings(),
  { collectionName }
);

while (true) {
  const query = await question('Enter a query (or type "exit" to quit): ');
  if (query.toLowerCase() === "exit") {
    break;
  } else {
    echo(
      chalk.green.bgWhite.bold(` Searching for "${query}" `.padEnd(80, " "))
    );
    const response = await vectorStore.similaritySearch(query, 1);

    const transcript = response[0].pageContent
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => `- ${line.trim().replace(/\*\*/g, "")}`)
      .join("\n");

    echo(
      chalk.blue.bgWhite.bold(
        ` Episode: ${displayEpisodeName(response[0].metadata.source)} `.padEnd(
          80,
          " "
        )
      )
    );
    echo(chalk.red.bgWhite.bold(" Script:".padEnd(80, " ")));
    echo(chalk.white.bgBlack(transcript.padEnd(80, " ")));
  }
}
