interface Card {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const cards: Card[] = [
  {
    title: 'NYC neighborhood guides',
    description: 'Like it busy? Quiet? Close to the park? Find the right corner of NYC for you.',
    image: '/view-1.png',
    alt: 'NYC neighborhood guides'
  },
  {
    title: 'Home Buying Tips',
    description: 'Learn essential strategies to make informed decisions and find your perfect home.',
    image: '/view-2.png',
    alt: 'Home buying tips'
  },
  {
    title: 'Market Insights',
    description: 'Stay updated with current market trends and property valuations in your area.',
    image: '/view-3.png',
    alt: 'Market insights'
  }
];

export function Master() {
  return (
    <>
      <div className="container my-5 section-master">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Master the market with helpful content</h1>
          </div>
        </div>
        <div className="row mt-4">
          {cards.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="badge div-ig mb-2">
                    <img src={card.image} className="rounded" alt={card.alt} />
                  </div>
                  <h4 className="card-title fw-bold text-dark mb-3">{card.title}</h4>
                  <p className="card-text fs-5 text-muted lh-lg">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}