import {
  processComposite
} from "./composite";

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

          const normalizedAnalyzedObjects =
            normalizeObjects([
              ...standaloneSentences,
              ...compositeResult.boxes
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