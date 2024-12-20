export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const predicate = searchParams.get('predicate');
    const object = searchParams.get('object');
  
    const triples = [
      { subject: 'Q42', predicate: 'P31', object: 'Q5' },
      { subject: 'Q42', predicate: 'P106', object: 'Q36180' },
      { subject: 'Q42', predicate: 'P735', object: 'Q5582' },
    ];
  
    const filteredTriples = triples.filter(triple => {
      return (
        (!subject || triple.subject.includes(subject)) &&
        (!predicate || triple.predicate.includes(predicate)) &&
        (!object || triple.object.includes(object))
      );
    });
  
    return new Response(JSON.stringify({ triples: filteredTriples }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  