import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link'

function HomePage(props) {
  const { products } = props;
  console.log('hi index')
  return (
    <ul>
      {products.map(product=>{
        return(<li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)
      })}
    </ul>
  );
}

export async function getStaticProps(context){
  console.log('Re-Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // redirect object
  if(!data){
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }
// notFound Object
  if(data.products.length === 0){
    return { notFound: true}
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };
}

export default HomePage;