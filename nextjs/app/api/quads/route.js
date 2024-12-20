import { NextResponse } from 'next/server';

let allQuads = [
  { id: 1, graph: 'exampleGraph', subject: 'exampleSubject1', predicate: 'examplePredicate', object: 'exampleObject1' },
  { id: 2, graph: 'exampleGraph', subject: 'exampleSubject2', predicate: 'examplePredicate', object: 'exampleObject2' },
  { id: 3, graph: 'exampleGraph', subject: 'exampleSubject3', predicate: 'examplePredicate', object: 'exampleObject3' },
  { id: 4, graph: 'exampleGraph', subject: 'exampleSubject4', predicate: 'examplePredicate', object: 'exampleObject4' },
];

export async function POST(request) {
  const { graph, subject, predicate, object, cursor } = await request.json();
  const pageSize = 50;

  let filteredQuads = allQuads.filter((quad) => {
    return (
      (!subject || quad.subject.includes(subject)) &&
      (!predicate || quad.predicate.includes(predicate)) &&
      (!object || quad.object.includes(object)) &&
      (!graph || quad.graph.includes(graph))
    );
  });

  let startIndex = 0;
  if (cursor) {
    startIndex = parseInt(cursor, 10);
  }

  const pageResults = filteredQuads.slice(startIndex, startIndex + pageSize);

  const nextCursor = startIndex + pageSize < filteredQuads.length ? startIndex + pageSize : null;

  return NextResponse.json({
    quads: pageResults,
    nextCursor,
  });
}
