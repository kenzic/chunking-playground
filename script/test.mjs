#!/usr/bin/env zx

import "dotenv/config";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";

$.verbose = false;

const collectionName = process.env.COLLECTION_NAME;

const vectorStore = await Chroma.fromExistingCollection(
  new OpenAIEmbeddings(),
  { collectionName }
);

const NUM_OF_RESULTS = 1;

const TEST_QUERIES = {
  "Jim proposes to Pam": "Weight Loss",
  "Jim and Pam get married": "Niagara",
  "Mike drives into lake": "Dunder Mifflin Infinity",
  "Jim hides andy's cell phone": "The Return",
  "Andy punches wall": "The Return",
  "The office goes to the beach": "Beach Games",
  "The office goes to Gettysburg": "Gettysburg",
  "Dwight and michael spy on a compeditor": "Prince Family Paper",
  "Michael starts his own paper company": "Two Weeks",
  "Michael and Jan host a dinner party": "Dinner Party",
  "Diwali party": "Diwali",
  "Erin breaks up with Gabe": "Michael's Last Dundies",
  "The office makes a commercial": "Local Ad",
  "Jim and Pam stay at dwights house": "Money",
  "Andy hits dwight with car": "The Duel",
  "Toby's exit interview": "Goodbye, Toby",
  "Jim let's michael fall in koi pond": "Koi Pond",
};

echo(`Collection Name: ${collectionName}`);

const queryMultiple = async ([query, episode]) => {
  let isMatch = false;
  const response = await vectorStore.similaritySearch(query, NUM_OF_RESULTS);
  const correctEpisode = episode.toLowerCase();
  response.forEach((result, index) => {
    const queriedEpisode = result.metadata.source.split(" - ")[1].toLowerCase();
    if (!isMatch && queriedEpisode.includes(correctEpisode)) {
      isMatch = index + 1;
    }
  });

  return isMatch;
};

for (const [query, episode] of Object.entries(TEST_QUERIES)) {
  const isMatch = await queryMultiple([query, episode]);

  const icon = isMatch ? "✅" : "❌";

  echo(`${icon}: ${isMatch} ${query}`);
}
