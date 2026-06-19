import {
  processComposite
} from "./composite";

import {
  processStructural
} from "./structural";

import {
  normalizeObjects
} from "./normalizers";

import type {
  ExtractedDocument
} from "@extractor/extractor.types";

import type {
  RawWordNode,
  RawImageNode,
  RawVectorLineNode
} from "@extractor/atomic";

import type {
  AnalyzedDocument
} from "./analyzer.types";

export async function runAnalysis(
  document: ExtractedDocument
): Promise<AnalyzedDocument> {

  const pages =
    await Promise.all(

      document.pages.map(
        async page => {

          const words =
            page.content.filter(
              (
                object
              ): object is RawWordNode =>
                object.kind === "word"
            );

          const images =
            page.content.filter(
              (
                object
              ): object is RawImageNode =>
                object.kind === "image"
            );

          const vectors =
            page.content.filter(
              (
                object
              ): object is RawVectorLineNode =>
                object.kind === "vector"
            );

          const compositeResult =
            await processComposite([
              ...words,
              ...images,
              ...vectors
            ]);

          const structuralResult =
            await processStructural(

              words,

              compositeResult.sentences,

              images,

              compositeResult.intersections
            );

          const standaloneWords =
            words.filter(
              word => !word.consumed
            );

          const standaloneSentences =
            compositeResult.sentences.filter(
              sentence => !sentence.consumed
            );

          const standaloneImages =
            images.filter(
              image => !image.consumed
            );

          const standaloneVectors =
            vectors.filter(
              vector => !vector.consumed
            );

          const analyzedNodes = [

            ...standaloneWords,

            ...standaloneSentences,

            ...structuralResult.cells,

            ...standaloneImages,

            ...standaloneVectors
          ];

          const normalizedAnalyzedObjects =
            normalizeObjects([
              ...standaloneSentences,
              ...structuralResult.cells
            ]);

          return {

            id:
              page.id,

            number:
              page.number,

            width:
              page.width,

            height:
              page.height,

            content: [

              ...standaloneWords,

              ...normalizedAnalyzedObjects,

              ...standaloneImages,

              ...standaloneVectors
            ]
          };
        }
      )
    );

  return {
    pages
  };
}