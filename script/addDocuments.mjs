import "dotenv/config";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "langchain/vectorstores/chroma";

const collectionName = process.env.COLLECTION_NAME;

const splitter = new RecursiveCharacterTextSplitter({
  separators: ["* * *"],
  // chunkOverlap: 10,
  // chunkSize: 7148,
  // chunkSize: 300,
});

const loader = new DirectoryLoader("./documents", {
  ".md": (path) => new TextLoader(path),
});

const docs = await loader.loadAndSplit(splitter);

// Create vector store and index the docs
const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
  collectionName,
  collectionMetadata: {
    // Change the distance function
    // https://docs.trychroma.com/usage-guide#changing-the-distance-function
    "hnsw:space": "ip",
  },
});

// Search for the most similar document
const response = await vectorStore.similaritySearch("hello", 1);
console.log(response);
