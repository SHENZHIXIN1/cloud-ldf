import { NextResponse } from 'next/server';

const quads = [
  {
    id: 5634161670881280,
    graph: "http://example.org/graph1",
    subject: "http://example.org/resource1",
    predicate: "http://schema.org/name",
    object: "Alice"
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const graph = searchParams.get('graph');
  const subject = searchParams.get('subject');
  const predicate = searchParams.get('predicate');
  const object = searchParams.get('object');
  const cursor = searchParams.get('cursor');

  const filteredQuads = quads.filter(quad => {
    return (
      (!graph || quad.graph === graph) &&
      (!subject || quad.subject.includes(subject)) &&
      (!predicate || quad.predicate.includes(predicate)) &&
      (!object || quad.object.includes(object))
    );
  });

  const pageSize = 50;
  const nextCursor = filteredQuads.length > pageSize ? 'CiMSHWoIZX5xdWFkczFyEQsSBHF1YWQYgICA6NeHgQoMGAAgAA==' : null;
  const results = filteredQuads.slice(0, pageSize);

  return NextResponse.json({ results, nextCursor });
}

export async function POST(request) {
  const { graph, subject, predicate, object } = await request.json();

  if (!graph || !subject || !predicate || !object) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newQuad = {
    id: Date.now(),
    graph,
    subject,
    predicate,
    object
  };

  return NextResponse.json(newQuad, { status: 201 });
}