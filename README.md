# Chunking Playground

This is a playground for experimenting with different chunking strategies. This playground utilizes:
- [langchain](https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/character_text_splitter)
- [ChromaDB](https://docs.trychroma.com/)
- [Docker](https://www.docker.com/)
- [Transcripts](https://transcripts.foreverdreaming.org/viewforum.php?f=574) of The Office episodes

## Install & Setup

### Clone project repository and install dependencies.

```bash
$ git clone git@github.com:kenzic/chunking-playground.git
$ cd chunking-playground
$ mv .env.example .env
$ // add your Open AI API key and ChromaDB collection name to .env
$ yarn
```

### Download and initialize the ChromaDB

```bash
$ yarn initdb
```

This will download the ChromaDB and initialize it with the default settings.

## Usage

### Seed database with documents

For this playground I downloaded The Office [transcripts](https://transcripts.foreverdreaming.org/viewforum.php?f=574)--Feel free to download other content, it should work just as well. Each file is an episode of the show, with scenes separeted by "* * *". The `addDocuments` script uses [langchain](https://js.langchain.com/docs/) to load the documents, split them, and add them to the ChromaDB.

```bash
$ yarn addDocuments
```

### Search

```bash
$ yarn search
```

This will start the search process in your terminal. This is a simple interface where you can see how your queries perform against the chunking strategy and distance function you have chosen.

### Test

```bash
$ yarn test
```

A simple test script which runs the queries defined as keys in `TEST_QUERIES` and sees the results product the correct episode (defined as the value in `TEST_QUERIES`).
