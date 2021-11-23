import { sanityClient , urlFor} from "../sanity"
const Home = ({ properties }) => {
  console.log(properties)
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property) => (
                // <Link href={`property/${property.slug.current}`}>
                  <div key={property._id} className="card">
                  <img className="image-dec" src={urlFor(property.mainImage)} />
                    <p>
                      {property.reviews.length} review
                      {
                        property.reviews.map(review=><>
                          <p>{review.reviewDescription}</p>
                          <p>{review.rating}</p>
                        </>)
                      }
                    </p>
                    
                    <h3>{property.title}</h3>
                    <h3>
                      <b>{property.price}/per Night</b>
                    </h3>
                  </div>
                // </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default Home
