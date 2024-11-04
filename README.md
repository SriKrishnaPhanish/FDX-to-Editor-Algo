# FDX Parsing Algorithm

This implements an FDX parsing algorithm that uses a graph breadth-first search (BFS) algorithm as its foundation.

## Overview

The main purpose of this algorithm is to parse FDX files, convert them into JSON format, and render the necessary classes in a structured HTML format. This is achieved through a series of steps that include XML parsing and class screening.

## How It Works

1. **Importing FDX Files**: 
   The FDX file is imported in the `MainFDX.ts` file with the following condition:

   ```typescript
   if (file.name.includes("fdx")) {
       const xmlData = e.target.result;
       const parser = new DOMParser();
       const doc = parser.parseFromString(xmlData, 'application/xml');
       mainConvertFdxToJson(doc.documentElement, editor);
       return;
   }
   
2. The "mainConvertFdxToJson" function converts the XML into JSON. This makes it easier to work with the data.

3. The JSON data is processed using a breadth-first search algorithm. The algorithm finds and organizes the necessary classes for the final output.

4. HTML can be styled with CSS. You can apply styles to the classes generated in the output.
   
5. Tiptap editor is used for rendering and editing the parsed content. This editor allows users to modify the HTML output easily.
