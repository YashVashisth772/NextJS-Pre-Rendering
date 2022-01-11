import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;
  console.log('hi')
  //   if we fgive "fallback: true", then we need to provide this if block to display a fallback value.
    if(!loadedProduct){
            return <p>Loading...</p>
        }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  console.log('getData');
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log('hetstaticprops',params)

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if(!product){
    return { notFound: true}
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product)=> product.id);
    const pathsWithParams = ids.map((id) => ({ params : { pid: id }}));
    console.log('ids',ids);
    console.log('pathswithparms',pathsWithParams);
  return {
   paths: pathsWithParams,
    // paths: [
    //   { params: { pid: "p1" } },
      //   { params: { pid: 'p2' } },
      //   { params: { pid: 'p3' } },
    // ],
    // fallback: "blocking", // can provide 'true' also..but then we need to write if block (line no. 9 )
    fallback: true,
  };
}

export default ProductDetailPage;
