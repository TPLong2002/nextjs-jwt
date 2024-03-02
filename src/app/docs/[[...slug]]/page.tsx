function App({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      {params.slug?.length === 2 && (
        <div>
          {params.slug[0]} {params.slug[1]}
        </div>
      )}
      {params.slug?.length === 1 && <div>{params.slug[0]}</div>}
      {params && <div>docs</div>}
    </div>
  );
}

export default App;
