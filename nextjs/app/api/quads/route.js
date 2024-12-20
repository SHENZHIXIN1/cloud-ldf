export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const predicate = searchParams.get('predicate');
  const object = searchParams.get('object');
  const graph = searchParams.get('graph'); 
  
  const quads = [
    { subject: 'Q42', predicate: 'P31', object: 'Q5', graph: 'wikidata' },
    { subject: 'Q42', predicate: 'P106', object: 'Q36180', graph: 'wikidata' },
    { subject: 'Q42', predicate: 'P735', object: 'Q5582', graph: 'dbpedia' },
  ];

  const filteredQuads = quads.filter(quad => {
    return (
      (!subject || quad.subject.includes(subject)) &&
      (!predicate || quad.predicate.includes(predicate)) &&
      (!object || quad.object.includes(object)) &&
      (!graph || quad.graph === graph)
    );
  });

  return new Response(JSON.stringify({ quads: filteredQuads }), {
    headers: { 'Content-Type': 'application/json' },
  });
}