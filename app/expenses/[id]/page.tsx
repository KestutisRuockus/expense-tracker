const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  console.log(id);

  return <p>{id}</p>;
};

export default page;
