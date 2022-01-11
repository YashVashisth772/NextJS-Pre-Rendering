function USerIdPage(props){
    return <h1>{props.id}</h1>
}

export default USerIdPage;

export async function getServerSideProps(context) {
    const { params } = context;

    console.log('params.uid', params.uid);
    const userId = params.uid;
    return{
        props: {
            id: 'userid-' + userId,
        },
    }
}